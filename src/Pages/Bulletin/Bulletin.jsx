import { useEffect, useRef, useState } from "react";
import {
  FiArrowUpRight,
  FiBriefcase,
  FiClock,
  FiFileText,
  FiBell,
  FiBookOpen,
  FiExternalLink,
  FiMapPin,
  FiSearch,
  FiRefreshCw,
  FiChevronRight,
} from "react-icons/fi";

import { supabase } from "../../supabase/supabaseClient";
import Internship from "./Internship/Internship";
import "./Bulletin.css";

const Bulletin = () => {
  const [notices, setNotices] = useState([]);
  const [internships, setInternships] = useState([]);
  const [updates, setUpdates] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeSection, setActiveSection] = useState(null);

  /*
   * =====================================================
   * HIDDEN FIRST NOTICE
   * =====================================================
   */

  const hiddenFirstNoticeRef = useRef(null);

  /*
   * =====================================================
   * HIDDEN LC2 NON-NOTICE RECORDS
   * =====================================================
   */

  const HIDDEN_NOTICE_URLS = new Set([
    "https://lc2.du.ac.in/DATA/2023/notice%20LAS%20test_241009_170105.pdf",
  ]);

  /*
   * =====================================================
   * NORMALIZE URL
   * =====================================================
   */

  const normalizeNoticeUrl = (value) => {
    if (!value) {
      return "";
    }

    try {
      const url = new URL(String(value).trim());

      return url.href.toLowerCase().replace(/\/+$/, "");
    } catch {
      return String(value).trim().toLowerCase().replace(/\/+$/, "");
    }
  };

  /*
   * =====================================================
   * GET NOTICE IDENTITY
   * =====================================================
   */

  const getNoticeIdentity = (notice) => {
    const normalizedLink = normalizeNoticeUrl(
      notice?._link || notice?.source_url || notice?.url || "",
    );

    if (normalizedLink) {
      return `url:${normalizedLink}`;
    }

    return `${notice?._source || ""}:id:${notice?.id || ""}`;
  };

  /*
   * =====================================================
   * CHECK WHETHER A NOTICE SHOULD BE HIDDEN
   * =====================================================
   */

  const isHiddenNotice = (notice) => {
    const rawUrl = notice?.source_id || notice?.url || notice?._link || "";

    const normalizedUrl = normalizeNoticeUrl(rawUrl);

    const title = String(notice?.title || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");

    /*
     * 1. Hide specific old LAS notice
     */

    if (HIDDEN_NOTICE_URLS.has(normalizedUrl)) {
      return true;
    }

    /*
     * 2. Hide LC2 homepage/hash placeholder
     */

    if (
      normalizedUrl === "https://lc2.du.ac.in/#" ||
      normalizedUrl === "https://lc2.du.ac.in"
    ) {
      return true;
    }

    /*
     * 3. Hide social-media records
     */

    const socialDomains = [
      "facebook.com",
      "www.facebook.com",
      "twitter.com",
      "www.twitter.com",
      "x.com",
      "www.x.com",
      "youtube.com",
      "www.youtube.com",
      "yahoo.com",
      "www.yahoo.com",
    ];

    const isSocialUrl = socialDomains.some(
      (domain) =>
        normalizedUrl.includes(`://${domain}/`) ||
        normalizedUrl.includes(`://${domain}`),
    );

    if (isSocialUrl) {
      return true;
    }

    /*
     * 4. Extra protection using title
     */

    const socialTitles = ["facebook", "twitter", "youtube", "yahoo"];

    if (
      socialTitles.some((social) => title === social || title.includes(social))
    ) {
      return true;
    }

    return false;
  };

  /*
   * =====================================================
   * FETCH BULLETIN DATA
   * =====================================================
   */

  const fetchBulletinData = async () => {
    setLoading(true);
    setError("");

    try {
      const [
        { data: collegeNoticeData, error: collegeNoticeError },
        { data: oldNoticeData, error: oldNoticeError },
        { data: internshipData, error: internshipError },
        { data: updateData, error: updateError },
      ] = await Promise.all([
        /*
         * Automatically synced LC2 notices.
         */

        supabase.from("college_notices").select("*").order("source_order", {
          ascending: true,
          nullsFirst: false,
        }),

        /*
         * Existing manually added notices.
         */

        supabase
          .from("bulletins")
          .select("*")
          .or("category.eq.notice,category.is.null")
          .order("date", {
            ascending: false,
            nullsFirst: false,
          })
          .order("created_at", {
            ascending: false,
          }),

        /*
         * Internship opportunities.
         *
         * IMPORTANT:
         * Data now comes from the dedicated internships table.
         */

        supabase
          .from("internships")
          .select("*")
          .order("deadline", {
            ascending: true,
            nullsFirst: false,
          })
          .order("created_at", {
            ascending: false,
          }),

        /*
         * Useful information.
         */

        supabase
          .from("bulletins")
          .select("*")
          .eq("category", "useful_info")
          .order("date", {
            ascending: false,
            nullsFirst: false,
          })
          .order("created_at", {
            ascending: false,
          }),
      ]);

      if (collegeNoticeError) {
        throw collegeNoticeError;
      }

      if (oldNoticeError) {
        throw oldNoticeError;
      }

      if (internshipError) {
        throw internshipError;
      }

      if (updateError) {
        throw updateError;
      }

      /*
       * ===================================================
       * MERGE NOTICES
       * ===================================================
       */

      const mergedNotices = [
        ...(collegeNoticeData || []).map((notice) => ({
          ...notice,
          _source: "college_notices",
          _date: notice.published_at || notice.date || notice.created_at,
          _link: notice.url || "",
        })),

        ...(oldNoticeData || []).map((notice) => ({
          ...notice,
          _source: "bulletins",
          _date: notice.date || notice.created_at,
          _link: notice.source_url || notice.url || "",
        })),
      ];

      /*
       * ===================================================
       * HIDE ONLY KNOWN UNWANTED RECORDS
       * ===================================================
       */

      const filteredNotices = mergedNotices.filter(
        (notice) => !isHiddenNotice(notice),
      );

      /*
       * ===================================================
       * REMOVE DUPLICATES
       * ===================================================
       */

      const seenNotices = new Set();

      const uniqueNotices = filteredNotices.filter((notice) => {
        const normalizedLink = normalizeNoticeUrl(notice._link);

        const normalizedTitle = notice.title
          ?.trim()
          .toLowerCase()
          .replace(/\s+/g, " ");

        const duplicateKey = normalizedLink
          ? `url:${normalizedLink}`
          : `${notice._source}:title:${normalizedTitle}`;

        if (seenNotices.has(duplicateKey)) {
          return false;
        }

        seenNotices.add(duplicateKey);

        return true;
      });

      /*
       * ===================================================
       * PRESERVE LC2 SOURCE ORDER
       * ===================================================
       */

      uniqueNotices.sort((a, b) => {
        if (
          a._source === "college_notices" &&
          b._source === "college_notices"
        ) {
          const orderA = Number.isFinite(Number(a.source_order))
            ? Number(a.source_order)
            : Number.MAX_SAFE_INTEGER;

          const orderB = Number.isFinite(Number(b.source_order))
            ? Number(b.source_order)
            : Number.MAX_SAFE_INTEGER;

          return orderA - orderB;
        }

        /*
         * Automatically synced LC2 notices
         * stay above manually added notices.
         */

        if (a._source === "college_notices") {
          return -1;
        }

        if (b._source === "college_notices") {
          return 1;
        }

        /*
         * Manually added notices use date.
         */

        const dateA = new Date(a._date || 0).getTime();
        const dateB = new Date(b._date || 0).getTime();

        return dateB - dateA;
      });

      /*
       * ===================================================
       * HIDE CURRENT FIRST NOTICE ONLY ONCE
       * ===================================================
       */

      if (hiddenFirstNoticeRef.current === null && uniqueNotices.length > 0) {
        hiddenFirstNoticeRef.current = getNoticeIdentity(uniqueNotices[0]);
      }

      const visibleNotices = uniqueNotices.filter(
        (notice) => getNoticeIdentity(notice) !== hiddenFirstNoticeRef.current,
      );

      /*
       * ===================================================
       * MAXIMUM 100 VISIBLE NOTICES
       * ===================================================
       */

      setNotices(visibleNotices.slice(0, 100));

      /*
       * ===================================================
       * INTERNSHIPS
       * ===================================================
       */

      setInternships(internshipData || []);

      /*
       * ===================================================
       * USEFUL INFORMATION
       * ===================================================
       */

      setUpdates(updateData || []);
    } catch (fetchError) {
      console.error("Failed to fetch bulletin data:", fetchError);

      setError("Unable to load bulletin updates right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBulletinData();
  }, []);

  /*
   * =====================================================
   * OPEN SELECTED SECTION
   * =====================================================
   */

  const openSection = (section) => {
    setActiveSection(section);

    setTimeout(() => {
      const sectionIds = {
        notices: "latest-notices",
        internships: "internships",
        updates: "other-updates",
      };

      const target = document.getElementById(sectionIds[section]);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 50);
  };

  /*
   * =====================================================
   * CLOSE SELECTED SECTION
   * =====================================================
   */

  const closeSection = () => {
    setActiveSection(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
   * =====================================================
   * NOTICE HELPERS
   * =====================================================
   */

  const getNoticeType = (notice) => {
    if (notice.type) {
      return notice.type;
    }

    return "NOTICE";
  };

  const getNoticeDescription = (notice) => {
    return (
      notice.description ||
      notice.content ||
      "Click below to view the complete notice."
    );
  };

  const getNoticeLink = (notice) => {
    return notice._link || notice.source_url || notice.url || "";
  };

  /*
   * =====================================================
   * USEFUL INFORMATION HELPERS
   * =====================================================
   */

  const getUpdateDescription = (update) => {
    return (
      update.description ||
      update.content ||
      "Useful information and resources for students."
    );
  };

  const getUpdateLink = (update) => {
    return update.source_url || update.url || "";
  };

  /*
   * =====================================================
   * OPEN NOTICE
   * =====================================================
   */

  const openNotice = (notice) => {
    const noticeLink = getNoticeLink(notice);

    if (!noticeLink) {
      return;
    }

    window.open(noticeLink, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="bulletin">
      <div className="bulletin-container">
        {/* ================= HERO ================= */}

        <section className="bulletin-hero">
          <div className="bulletin-eyebrow">
            <span className="bulletin-eyebrow-icon">
              <FiBell />
            </span>
            BULLETIN
          </div>

          <h1>
            Everything important.
            <br />
            <span>In one place.</span>
          </h1>

          <p>
            Stay updated with official college notices, internship opportunities
            and useful information curated for students of the Faculty of Law.
          </p>

          <div className="bulletin-hero-actions">
            {/* ================= NOTICES ================= */}

            <button
              type="button"
              className="bulletin-primary-btn"
              onClick={() => openSection("notices")}
            >
              <span>Explore Notices</span>
              <FiBell />
            </button>

            {/* ================= INTERNSHIPS ================= */}

            <button
              type="button"
              className="bulletin-secondary-btn"
              onClick={() => openSection("internships")}
            >
              <span>Internship Opportunities</span>
              <FiBriefcase />
            </button>

            {/* ================= USEFUL INFORMATION ================= */}

            <button
              type="button"
              className="bulletin-secondary-btn"
              onClick={() => openSection("updates")}
            >
              <span>Useful Information</span>
              <FiBookOpen />
            </button>
          </div>

          <div className="bulletin-hero-meta">
            <span>
              <FiClock />
              Updated regularly
            </span>

            <span className="bulletin-meta-divider" />

            <span>
              <FiFileText />
              Official & curated information
            </span>
          </div>
        </section>

        {/* ================= QUICK STATS ================= */}

        <section className="bulletin-stats" aria-label="Bulletin categories">
          <button
            type="button"
            className={`bulletin-stat ${
              activeSection === "notices" ? "bulletin-stat-active" : ""
            }`}
            onClick={() => openSection("notices")}
          >
            <span className="bulletin-stat-icon">
              <FiBell />
            </span>

            <span>
              <strong>Notices</strong>
              <small>College announcements</small>
            </span>

            <span className="bulletin-stat-count">{notices.length}</span>

            <FiChevronRight className="bulletin-stat-arrow" />
          </button>

          <button
            type="button"
            className={`bulletin-stat ${
              activeSection === "internships" ? "bulletin-stat-active" : ""
            }`}
            onClick={() => openSection("internships")}
          >
            <span className="bulletin-stat-icon">
              <FiBriefcase />
            </span>

            <span>
              <strong>Internships</strong>
              <small>Career opportunities</small>
            </span>

            <span className="bulletin-stat-count">{internships.length}</span>

            <FiChevronRight className="bulletin-stat-arrow" />
          </button>

          <button
            type="button"
            className={`bulletin-stat ${
              activeSection === "updates" ? "bulletin-stat-active" : ""
            }`}
            onClick={() => openSection("updates")}
          >
            <span className="bulletin-stat-icon">
              <FiBookOpen />
            </span>

            <span>
              <strong>Useful Information</strong>
              <small>Curated for students</small>
            </span>

            <span className="bulletin-stat-count">{updates.length}</span>

            <FiChevronRight className="bulletin-stat-arrow" />
          </button>
        </section>

        {/* ================= ERROR ================= */}

        {error && (
          <section className="bulletin-error">
            <div className="bulletin-error-icon">
              <FiRefreshCw />
            </div>

            <div>
              <h3>Couldn't load the bulletin</h3>

              <p>{error}</p>
            </div>

            <button type="button" onClick={fetchBulletinData}>
              Try again
              <FiRefreshCw />
            </button>
          </section>
        )}

        {/* ================= LOADING ================= */}

        {loading && (
          <div className="bulletin-loading">
            <div className="bulletin-loading-spinner" />

            <span>Loading bulletin...</span>
          </div>
        )}

        {/* =====================================================
           LATEST NOTICES
        ===================================================== */}

        {!loading && activeSection === "notices" && (
          <section className="bulletin-section" id="latest-notices">
            <div className="bulletin-section-heading">
              <div>
                <span className="bulletin-section-kicker">STAY INFORMED</span>

                <h2>Latest College Notices</h2>

                <p>
                  Official notices and announcements from the Faculty of Law.
                </p>
              </div>

              <span className="bulletin-section-limit">
                Latest {Math.min(notices.length, 100)}
              </span>
            </div>

            {notices.length === 0 ? (
              <div className="bulletin-empty">
                <div className="bulletin-empty-icon">
                  <FiBell />
                </div>

                <h3>No notices available</h3>

                <p>New college notices will appear here automatically.</p>
              </div>
            ) : (
              <div className="bulletin-notice-grid">
                {notices.map((notice) => {
                  const noticeLink = getNoticeLink(notice);

                  return (
                    <article
                      className="bulletin-notice-card"
                      key={`${notice._source}-${notice.id}`}
                      onClick={() => openNotice(notice)}
                      role={noticeLink ? "link" : undefined}
                      tabIndex={noticeLink ? 0 : undefined}
                      onKeyDown={(event) => {
                        if (
                          noticeLink &&
                          (event.key === "Enter" || event.key === " ")
                        ) {
                          event.preventDefault();

                          openNotice(notice);
                        }
                      }}
                    >
                      <div className="bulletin-card-top">
                        <span className="bulletin-tag">
                          {getNoticeType(notice)}
                        </span>

                        <span className="bulletin-card-date">
                          <FiBookOpen />
                          OFFICIAL
                        </span>
                      </div>

                      <div className="bulletin-notice-content">
                        <h3>{notice.title || "College Notice"}</h3>

                        <p>{getNoticeDescription(notice)}</p>
                      </div>

                      {noticeLink ? (
                        <a
                          href={noticeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bulletin-card-link"
                          onClick={(event) => {
                            event.stopPropagation();
                          }}
                        >
                          View original notice
                          <FiExternalLink />
                        </a>
                      ) : (
                        <span className="bulletin-card-link bulletin-card-link-disabled">
                          Notice details
                          <FiFileText />
                        </span>
                      )}
                    </article>
                  );
                })}
              </div>
            )}

            <button
              type="button"
              className="bulletin-bottom-btn"
              onClick={closeSection}
            >
              Back to categories
              <FiArrowUpRight />
            </button>
          </section>
        )}

        {/* =====================================================
           INTERNSHIPS
        ===================================================== */}

        {!loading && activeSection === "internships" && (
          <section className="bulletin-section" id="internships">
            <div className="bulletin-section-heading">
              <div>
                <span className="bulletin-section-kicker">
                  BUILD YOUR CAREER
                </span>

                <h2>Internship Opportunities</h2>

                <p>
                  Relevant internship opportunities curated for law students.
                </p>
              </div>

              <span className="bulletin-section-limit">
                {internships.length}{" "}
                {internships.length === 1 ? "opportunity" : "opportunities"}
              </span>
            </div>

            <Internship internships={internships} />

            <button
              type="button"
              className="bulletin-bottom-btn"
              onClick={closeSection}
            >
              Back to categories
              <FiArrowUpRight />
            </button>
          </section>
        )}

        {/* =====================================================
           OTHER USEFUL INFORMATION
        ===================================================== */}

        {!loading && activeSection === "updates" && (
          <section className="bulletin-section" id="other-updates">
            <div className="bulletin-section-heading">
              <div>
                <span className="bulletin-section-kicker">
                  MORE FOR STUDENTS
                </span>

                <h2>Useful Information</h2>

                <p>
                  Useful opportunities, resources and information personally
                  curated for students.
                </p>
              </div>

              <span className="bulletin-section-limit">
                {updates.length} updates
              </span>
            </div>

            {updates.length === 0 ? (
              <div className="bulletin-empty">
                <div className="bulletin-empty-icon">
                  <FiBookOpen />
                </div>

                <h3>No useful information yet</h3>

                <p>Helpful student resources and updates will be added here.</p>
              </div>
            ) : (
              <div className="bulletin-update-grid">
                {updates.map((update) => {
                  const updateLink = getUpdateLink(update);

                  return (
                    <article className="bulletin-update-card" key={update.id}>
                      <div className="bulletin-update-icon">
                        <FiBookOpen />
                      </div>

                      <div className="bulletin-update-content">
                        <span className="bulletin-update-label">
                          USEFUL INFORMATION
                        </span>

                        <h3>{update.title || "Useful Student Information"}</h3>

                        <p>{getUpdateDescription(update)}</p>

                        {updateLink && (
                          <a
                            href={updateLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bulletin-update-link"
                          >
                            Explore information
                            <FiArrowUpRight />
                          </a>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            <button
              type="button"
              className="bulletin-bottom-btn"
              onClick={closeSection}
            >
              Back to categories
              <FiArrowUpRight />
            </button>
          </section>
        )}

        {/* ================= BOTTOM CTA ================= */}

        <section className="bulletin-bottom">
          <div className="bulletin-bottom-icon">
            <FiSearch />
          </div>

          <div>
            <span>BULLETIN</span>

            <h2>Everything worth knowing, together.</h2>

            <p>
              Official college notices, career opportunities and useful student
              information — all in one place.
            </p>
          </div>

          <button
            type="button"
            className="bulletin-bottom-btn"
            onClick={fetchBulletinData}
          >
            Refresh bulletin
            <FiRefreshCw />
          </button>
        </section>
      </div>
    </main>
  );
};

export default Bulletin;
