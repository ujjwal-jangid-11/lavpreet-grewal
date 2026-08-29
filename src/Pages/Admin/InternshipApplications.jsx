import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBriefcase,
  FaCheck,
  FaChevronDown,
  FaChevronRight,
  FaClock,
  FaDownload,
  FaEnvelope,
  FaExclamationCircle,
  FaFileAlt,
  FaIdCard,
  FaInfoCircle,
  FaLock,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRedo,
  FaSearch,
  FaTimes,
  FaTrash,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import "./InternshipApplications.css";

const STORAGE_BUCKET = "internship-applications";

const STATUS_OPTIONS = ["Pending", "Under Review", "Selected", "Rejected"];

const COURTS = [
  "Tis Hazari",
  "Saket",
  "Karkardooma",
  "Dwarka",
  "Rohini",
  "Patiala House",
];

function InternshipApplications() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");
  const [courtFilter, setCourtFilter] = useState("All Courts");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [selectedIds, setSelectedIds] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  const [signedUrls, setSignedUrls] = useState({});
  const [loadingDocument, setLoadingDocument] = useState("");

  const [updatingStatus, setUpdatingStatus] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [bulkDeleting, setBulkDeleting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* =========================================================
     FETCH APPLICATIONS
  ========================================================= */

  const fetchApplications = useCallback(async (showRefreshState = false) => {
    if (showRefreshState) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");
    setSuccess("");

    try {
      const { data, error: fetchError } = await supabase
        .from("internship_applications")
        .select(
          `
            id,
            name,
            current_year,
            semester,
            section,
            class_roll_number,
            local_address,
            contact_number,
            email,
            court_preference,
            internship_year,
            internship_month,
            cv_path,
            cv_original_name,
            id_card_receipt_path,
            id_card_receipt_original_name,
            created_at,
            status
          `,
        )
        .order("created_at", { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setApplications(data || []);
      setSelectedIds([]);
    } catch (fetchError) {
      console.error("Failed to fetch internship applications:", fetchError);

      setError(
        fetchError?.message || "Unable to load internship applications.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  /* =========================================================
     CLEAR MESSAGES
  ========================================================= */

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      setSuccess("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [success]);

  /* =========================================================
     FILTERED APPLICATIONS
  ========================================================= */

  const filteredApplications = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return applications.filter((application) => {
      const matchesSearch =
        !normalizedSearch ||
        application.name?.toLowerCase().includes(normalizedSearch) ||
        application.email?.toLowerCase().includes(normalizedSearch) ||
        application.class_roll_number
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        application.contact_number?.toLowerCase().includes(normalizedSearch) ||
        application.court_preference?.toLowerCase().includes(normalizedSearch);

      const matchesCourt =
        courtFilter === "All Courts" ||
        application.court_preference === courtFilter;

      const matchesStatus =
        statusFilter === "All Status" || application.status === statusFilter;

      return matchesSearch && matchesCourt && matchesStatus;
    });
  }, [applications, search, courtFilter, statusFilter]);

  /* =========================================================
     STATISTICS
  ========================================================= */

  const statistics = useMemo(() => {
    return {
      total: applications.length,

      pending: applications.filter(
        (application) => application.status === "Pending",
      ).length,

      review: applications.filter(
        (application) => application.status === "Under Review",
      ).length,

      selected: applications.filter(
        (application) => application.status === "Selected",
      ).length,

      rejected: applications.filter(
        (application) => application.status === "Rejected",
      ).length,
    };
  }, [applications]);

  /* =========================================================
     DATE FORMAT
  ========================================================= */

  const formatDateTime = (dateValue) => {
    if (!dateValue) return "—";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /* =========================================================
     STATUS CLASS
  ========================================================= */

  const getStatusClass = (status) => {
    switch (status) {
      case "Selected":
        return "status-selected";

      case "Under Review":
        return "status-review";

      case "Rejected":
        return "status-rejected";

      case "Pending":
      default:
        return "status-pending";
    }
  };

  /* =========================================================
     SELECT / DESELECT
  ========================================================= */

  const toggleSelected = (id) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id],
    );
  };

  const toggleSelectAll = () => {
    const visibleIds = filteredApplications.map(
      (application) => application.id,
    );

    const allVisibleSelected =
      visibleIds.length > 0 &&
      visibleIds.every((id) => selectedIds.includes(id));

    if (allVisibleSelected) {
      setSelectedIds((current) =>
        current.filter((id) => !visibleIds.includes(id)),
      );
    } else {
      setSelectedIds((current) => [...new Set([...current, ...visibleIds])]);
    }
  };

  /* =========================================================
     UPDATE STATUS
  ========================================================= */

  const handleStatusChange = async (applicationId, nextStatus) => {
    if (!applicationId || !nextStatus) return;

    setUpdatingStatus(applicationId);
    setError("");
    setSuccess("");

    try {
      const { error: updateError } = await supabase
        .from("internship_applications")
        .update({
          status: nextStatus,
        })
        .eq("id", applicationId);

      if (updateError) {
        throw updateError;
      }

      setApplications((current) =>
        current.map((application) =>
          application.id === applicationId
            ? {
                ...application,
                status: nextStatus,
              }
            : application,
        ),
      );

      setSuccess("Application status updated successfully.");
    } catch (updateError) {
      console.error("Failed to update application status:", updateError);

      setError(
        updateError?.message || "Unable to update the application status.",
      );
    } finally {
      setUpdatingStatus("");
    }
  };

  /* =========================================================
     STORAGE PATH NORMALIZER
  ========================================================= */

  const normalizeStoragePath = (path) => {
    if (!path) return "";

    let normalizedPath = String(path).trim();

    /*
      Handles cases where the database contains:
      1. Normal object path:
         applications/file.pdf

      2. Bucket-prefixed path:
         internship-applications/applications/file.pdf

      3. Full Supabase Storage URL.
    */

    if (normalizedPath.startsWith("http")) {
      try {
        const url = new URL(normalizedPath);

        const marker = "/storage/v1/object/";
        const markerIndex = url.pathname.indexOf(marker);

        if (markerIndex !== -1) {
          let objectPath = url.pathname.substring(markerIndex + marker.length);

          objectPath = objectPath.replace(/^public\//, "");
          objectPath = objectPath.replace(/^authenticated\//, "");
          objectPath = objectPath.replace(/^sign\//, "");

          const bucketPrefix = `${STORAGE_BUCKET}/`;

          if (objectPath.startsWith(bucketPrefix)) {
            objectPath = objectPath.substring(bucketPrefix.length);
          }

          return decodeURIComponent(objectPath);
        }
      } catch (urlError) {
        console.warn("Could not parse stored Supabase Storage URL:", urlError);
      }
    }

    normalizedPath = normalizedPath.replace(/^\/+/, "");

    const bucketPrefix = `${STORAGE_BUCKET}/`;

    if (normalizedPath.startsWith(bucketPrefix)) {
      normalizedPath = normalizedPath.substring(bucketPrefix.length);
    }

    return normalizedPath;
  };

  /* =========================================================
     REMOVE APPLICATION FILES
  ========================================================= */

  const removeApplicationFiles = async (applicationsToDelete) => {
    const filesToRemove = [];

    applicationsToDelete.forEach((application) => {
      const cvPath = normalizeStoragePath(application.cv_path);

      const idCardPath = normalizeStoragePath(application.id_card_receipt_path);

      if (cvPath) {
        filesToRemove.push(cvPath);
      }

      if (idCardPath) {
        filesToRemove.push(idCardPath);
      }
    });

    const uniqueFiles = [...new Set(filesToRemove)];

    if (uniqueFiles.length === 0) {
      return;
    }

    console.log("Deleting Storage files:", uniqueFiles);

    const { error: storageError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove(uniqueFiles);

    if (storageError) {
      throw storageError;
    }
  };

  /* =========================================================
     DELETE SINGLE APPLICATION
  ========================================================= */

  const handleDelete = async (application) => {
    if (!application?.id || deletingId) return;

    const confirmed = window.confirm(
      `Delete the application submitted by ${application.name}?\n\nThis will also permanently delete the uploaded CV and ID / Fee Receipt files.\n\nThis action cannot be undone.`,
    );

    if (!confirmed) return;

    setDeletingId(application.id);
    setError("");
    setSuccess("");

    try {
      /*
        Delete uploaded Storage files first.
        If Storage deletion fails, the database record
        will NOT be deleted.
      */
      await removeApplicationFiles([application]);

      const { error: deleteError } = await supabase
        .from("internship_applications")
        .delete()
        .eq("id", application.id);

      if (deleteError) {
        throw deleteError;
      }

      setApplications((current) =>
        current.filter((item) => item.id !== application.id),
      );

      setSelectedIds((current) =>
        current.filter((id) => id !== application.id),
      );

      setSignedUrls((current) => {
        const next = { ...current };

        delete next[`${application.id}-cv`];
        delete next[`${application.id}-idCard`];

        return next;
      });

      if (expandedId === application.id) {
        setExpandedId(null);
      }

      setSuccess("Application and associated documents deleted successfully.");
    } catch (deleteError) {
      console.error(
        "Failed to delete internship application and documents:",
        deleteError,
      );

      setError(
        deleteError?.message ||
          "Unable to delete the application and its uploaded documents.",
      );
    } finally {
      setDeletingId("");
    }
  };

  /* =========================================================
     BULK DELETE
  ========================================================= */

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0 || bulkDeleting) return;

    const selectedApplications = applications.filter((application) =>
      selectedIds.includes(application.id),
    );

    const confirmed = window.confirm(
      `Delete ${selectedApplications.length} selected application${
        selectedApplications.length > 1 ? "s" : ""
      }?\n\nThis will also permanently delete all uploaded CV and ID / Fee Receipt files belonging to these applications.\n\nThis action cannot be undone.`,
    );

    if (!confirmed) return;

    setBulkDeleting(true);
    setError("");
    setSuccess("");

    try {
      /*
        Delete all associated Storage files first.
        If Storage deletion fails, database records
        will remain untouched.
      */
      await removeApplicationFiles(selectedApplications);

      const { error: deleteError } = await supabase
        .from("internship_applications")
        .delete()
        .in("id", selectedIds);

      if (deleteError) {
        throw deleteError;
      }

      setApplications((current) =>
        current.filter((application) => !selectedIds.includes(application.id)),
      );

      setSelectedIds([]);
      setExpandedId(null);

      setSignedUrls((current) => {
        const next = { ...current };

        selectedApplications.forEach((application) => {
          delete next[`${application.id}-cv`];
          delete next[`${application.id}-idCard`];
        });

        return next;
      });

      setSuccess(
        `${selectedApplications.length} application${
          selectedApplications.length > 1 ? "s" : ""
        } and all uploaded documents were deleted successfully.`,
      );
    } catch (deleteError) {
      console.error(
        "Failed to bulk delete applications and documents:",
        deleteError,
      );

      setError(
        deleteError?.message ||
          "Unable to delete the selected applications and their documents.",
      );
    } finally {
      setBulkDeleting(false);
    }
  };

  /* =========================================================
     SIGNED DOCUMENT URL
  ========================================================= */

  const getDocumentUrl = async (application, type) => {
    if (!application) return;

    const isCv = type === "cv";

    const path = isCv ? application.cv_path : application.id_card_receipt_path;

    if (!path) {
      setError("The requested document is not available.");
      return;
    }

    const normalizedPath = normalizeStoragePath(path);

    if (!normalizedPath) {
      setError("The requested document path is not available.");
      return;
    }

    const cacheKey = `${application.id}-${isCv ? "cv" : "idCard"}`;

    if (signedUrls[cacheKey]) {
      window.open(signedUrls[cacheKey], "_blank", "noopener,noreferrer");

      return;
    }

    setLoadingDocument(cacheKey);
    setError("");

    try {
      const { data, error: signedUrlError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .createSignedUrl(normalizedPath, 60 * 10);

      if (signedUrlError) {
        throw signedUrlError;
      }

      if (!data?.signedUrl) {
        throw new Error("Unable to generate the document link.");
      }

      setSignedUrls((current) => ({
        ...current,
        [cacheKey]: data.signedUrl,
      }));

      window.open(data.signedUrl, "_blank", "noopener,noreferrer");
    } catch (documentError) {
      console.error("Failed to open internship document:", documentError);

      setError(
        documentError?.message || "Unable to open the requested document.",
      );
    } finally {
      setLoadingDocument("");
    }
  };

  /* =========================================================
     EXCEL EXPORT
  ========================================================= */

  const escapeExcelHtml = (value) => {
    if (value === null || value === undefined) {
      return "";
    }

    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  };

  const handleExportExcel = () => {
    if (filteredApplications.length === 0) {
      setError("There are no applications available to export.");
      return;
    }

    const rows = filteredApplications
      .map(
        (application) => `
          <tr>
            <td>${escapeExcelHtml(application.name)}</td>
            <td>${escapeExcelHtml(application.current_year)}</td>
            <td>${escapeExcelHtml(application.semester)}</td>
            <td>${escapeExcelHtml(application.section)}</td>
            <td>${escapeExcelHtml(application.class_roll_number)}</td>
            <td>${escapeExcelHtml(application.local_address)}</td>
            <td>${escapeExcelHtml(application.contact_number)}</td>
            <td>${escapeExcelHtml(application.email)}</td>
            <td>${escapeExcelHtml(application.court_preference)}</td>
            <td>${escapeExcelHtml(application.internship_year)}</td>
            <td>${escapeExcelHtml(application.internship_month)}</td>
            <td>${escapeExcelHtml(application.status)}</td>
            <td>${escapeExcelHtml(application.cv_original_name)}</td>
            <td>${escapeExcelHtml(
              application.id_card_receipt_original_name,
            )}</td>
            <td>${escapeExcelHtml(formatDateTime(application.created_at))}</td>
          </tr>
        `,
      )
      .join("");

    const table = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office"
            xmlns:x="urn:schemas-microsoft-com:office:excel"
            xmlns="http://www.w3.org/TR/REC-html40">
        <head>
          <meta charset="UTF-8" />
          <!--[if gte mso 9]>
          <xml>
            <x:ExcelWorkbook>
              <x:ExcelWorksheets>
                <x:ExcelWorksheet>
                  <x:Name>Applications</x:Name>
                  <x:WorksheetOptions>
                    <x:DisplayGridlines/>
                  </x:WorksheetOptions>
                </x:ExcelWorksheet>
              </x:ExcelWorksheets>
            </x:ExcelWorkbook>
          </xml>
          <![endif]-->
        </head>

        <body>
          <table border="1">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Current Year</th>
                <th>Semester</th>
                <th>Section</th>
                <th>Class Roll Number</th>
                <th>Local Address</th>
                <th>Contact Number</th>
                <th>Email</th>
                <th>Court Preference</th>
                <th>Internship Year</th>
                <th>Internship Month</th>
                <th>Status</th>
                <th>CV File</th>
                <th>ID / Fee Receipt File</th>
                <th>Submitted At</th>
              </tr>
            </thead>

            <tbody>
              ${rows}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const blob = new Blob([`\ufeff${table}`], {
      type: "application/vnd.ms-excel;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    const date = new Date().toISOString().slice(0, 10);

    link.download = `internship-applications-${date}.xls`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);

    setSuccess(
      `${filteredApplications.length} application${
        filteredApplications.length > 1 ? "s" : ""
      } exported successfully.`,
    );
  };

  /* =========================================================
     RESET FILTERS
  ========================================================= */

  const clearFilters = () => {
    setSearch("");
    setCourtFilter("All Courts");
    setStatusFilter("All Status");
  };

  /* =========================================================
     RENDER ERROR
  ========================================================= */

  const renderError = () => {
    if (!error) return null;

    return (
      <div className="internship-applications-alert internship-applications-alert-error">
        <FaExclamationCircle />

        <div>
          <strong>Something went wrong</strong>
          <span>{error}</span>
        </div>

        <button
          type="button"
          className="internship-applications-alert-dismiss"
          onClick={() => setError("")}
          aria-label="Dismiss error"
        >
          <FaTimes />
        </button>
      </div>
    );
  };

  /* =========================================================
     RENDER SUCCESS
  ========================================================= */

  const renderSuccess = () => {
    if (!success) return null;

    return (
      <div className="internship-applications-alert internship-applications-alert-success">
        <FaCheck />

        <div>
          <strong>Done</strong>
          <span>{success}</span>
        </div>

        <button
          type="button"
          className="internship-applications-alert-dismiss"
          onClick={() => setSuccess("")}
          aria-label="Dismiss success message"
        >
          <FaTimes />
        </button>
      </div>
    );
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="internship-applications">
        <div className="internship-applications-container">
          <div className="internship-applications-loading">
            <div className="internship-applications-loader" />

            <p>Loading internship applications...</p>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <main className="internship-applications">
      <div className="internship-applications-container">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="internship-applications-header">
          <div className="internship-applications-heading">
            <button
              type="button"
              className="internship-applications-back-button"
              onClick={() => navigate("/admin")}
              aria-label="Back to admin panel"
            >
              <FaArrowLeft />
            </button>

            <div className="internship-applications-heading-copy">
              <span className="internship-applications-eyebrow">
                ADMINISTRATION
              </span>

              <h1>Internship Applications</h1>

              <p>
                Review, manage and export student internship applications from
                one place.
              </p>
            </div>
          </div>

          <div className="internship-applications-header-actions">
            <button
              type="button"
              className="internship-applications-back-button"
              onClick={() => fetchApplications(true)}
              disabled={refreshing}
            >
              <FaRedo
                className={refreshing ? "internship-applications-spin" : ""}
              />

              <span>{refreshing ? "Refreshing..." : "Refresh"}</span>
            </button>

            <button
              type="button"
              className="internship-applications-export-button"
              onClick={handleExportExcel}
              disabled={filteredApplications.length === 0}
            >
              <FaDownload />

              <span>Export Excel</span>
            </button>
          </div>
        </header>

        {renderError()}
        {renderSuccess()}

        {/* =====================================================
            SUMMARY
        ===================================================== */}

        <section className="internship-applications-summary">
          <article className="internship-applications-summary-item">
            <div className="internship-applications-summary-icon">
              <FaUsers />
            </div>

            <div className="internship-applications-summary-copy">
              <span>Total Applications</span>
              <strong>{statistics.total}</strong>
            </div>
          </article>

          <article className="internship-applications-summary-item">
            <div className="internship-applications-summary-icon">
              <FaClock />
            </div>

            <div className="internship-applications-summary-copy">
              <span>Pending</span>
              <strong>{statistics.pending}</strong>
            </div>
          </article>

          <article className="internship-applications-summary-item">
            <div className="internship-applications-summary-icon">
              <FaBriefcase />
            </div>

            <div className="internship-applications-summary-copy">
              <span>Under Review</span>
              <strong>{statistics.review}</strong>
            </div>
          </article>

          <article className="internship-applications-summary-item">
            <div className="internship-applications-summary-icon">
              <FaCheck />
            </div>

            <div className="internship-applications-summary-copy">
              <span>Selected</span>
              <strong>{statistics.selected}</strong>
            </div>
          </article>

          <article className="internship-applications-summary-item">
            <div className="internship-applications-summary-icon">
              <FaExclamationCircle />
            </div>

            <div className="internship-applications-summary-copy">
              <span>Rejected</span>
              <strong>{statistics.rejected}</strong>
            </div>
          </article>
        </section>

        {/* =====================================================
            FILTER TOOLBAR
        ===================================================== */}

        <section className="internship-applications-toolbar">
          <div className="internship-applications-search">
            <FaSearch />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, email, roll number or court..."
              aria-label="Search applications"
            />

            {search && (
              <button
                type="button"
                className="internship-applications-search-clear"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <FaTimes />
              </button>
            )}
          </div>

          <div className="internship-applications-filters-wrap">
            <div className="internship-applications-filter-select">
              <select
                value={courtFilter}
                onChange={(event) => setCourtFilter(event.target.value)}
                aria-label="Filter by court"
              >
                <option value="All Courts">All Courts</option>

                {COURTS.map((court) => (
                  <option key={court} value={court}>
                    {court}
                  </option>
                ))}
              </select>

              <FaChevronDown />
            </div>

            <div className="internship-applications-filter-select">
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                aria-label="Filter by status"
              >
                <option value="All Status">All Status</option>

                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <FaChevronDown />
            </div>

            {(search ||
              courtFilter !== "All Courts" ||
              statusFilter !== "All Status") && (
              <button
                type="button"
                className="internship-applications-clear-filter"
                onClick={clearFilters}
              >
                Clear filters
              </button>
            )}
          </div>
        </section>

        {/* =====================================================
            TABLE TOOLBAR
        ===================================================== */}

        {filteredApplications.length > 0 && (
          <div className="internship-applications-table-toolbar">
            <label className="internship-applications-select-all">
              <input
                type="checkbox"
                checked={
                  filteredApplications.length > 0 &&
                  filteredApplications.every((application) =>
                    selectedIds.includes(application.id),
                  )
                }
                onChange={toggleSelectAll}
              />

              <span className="internship-applications-checkbox">
                <FaCheck />
              </span>

              <span>Select all</span>
            </label>

            <div className="internship-applications-toolbar-right">
              <span>
                Showing <strong>{filteredApplications.length}</strong> of{" "}
                <strong>{applications.length}</strong>
              </span>

              {selectedIds.length > 0 && (
                <button
                  type="button"
                  className="internship-applications-delete-all-button"
                  onClick={handleBulkDelete}
                  disabled={bulkDeleting}
                >
                  <FaTrash />

                  <span>
                    {bulkDeleting
                      ? "Deleting..."
                      : `Delete (${selectedIds.length})`}
                  </span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* =====================================================
            APPLICATIONS LIST
        ===================================================== */}

        {filteredApplications.length === 0 ? (
          <section className="internship-applications-empty">
            <div className="internship-applications-empty-icon">
              <FaFileAlt />
            </div>

            <h3>
              {applications.length === 0
                ? "No applications yet"
                : "No matching applications"}
            </h3>

            <p>
              {applications.length === 0
                ? "Student internship applications will appear here once they are submitted."
                : "Try changing your search or filter criteria."}
            </p>

            {applications.length > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="internship-applications-back-button"
                style={{ marginTop: "16px" }}
              >
                Clear Filters
              </button>
            )}
          </section>
        ) : (
          <section className="internship-applications-list">
            {filteredApplications.map((application) => {
              const isExpanded = expandedId === application.id;
              const isSelected = selectedIds.includes(application.id);
              const isDeleting = deletingId === application.id;

              return (
                <article
                  key={application.id}
                  className={`internship-application-card-wrapper ${
                    isExpanded ? "is-expanded" : ""
                  }`}
                >
                  <div
                    className={`internship-application-card ${
                      isSelected ? "is-selected" : ""
                    }`}
                  >
                    <label className="internship-application-card-select">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelected(application.id)}
                        aria-label={`Select ${application.name}`}
                      />

                      <span className="internship-applications-checkbox">
                        <FaCheck />
                      </span>
                    </label>

                    <div className="internship-application-card-icon">
                      <FaUser />
                    </div>

                    <div className="internship-application-card-content">
                      <div className="internship-application-card-top">
                        <div className="internship-application-card-main">
                          <span className="internship-application-card-label">
                            {application.court_preference || "Court Internship"}
                          </span>

                          <h3>{application.name}</h3>

                          <div className="internship-application-card-email">
                            {application.email}
                          </div>
                        </div>

                        <span
                          className={`internship-status-badge ${getStatusClass(
                            application.status,
                          )}`}
                        >
                          {application.status || "Pending"}
                        </span>
                      </div>

                      <div className="internship-application-card-meta">
                        <span>
                          <strong>Year:</strong>{" "}
                          {application.current_year || "—"}
                        </span>

                        <span>
                          <strong>Sem:</strong> {application.semester || "—"}
                        </span>

                        <span>
                          <strong>Roll:</strong>{" "}
                          {application.class_roll_number || "—"}
                        </span>

                        <span>
                          <strong>Phone:</strong>{" "}
                          {application.contact_number || "—"}
                        </span>
                      </div>
                    </div>

                    <div className="internship-application-card-actions">
                      <div className="internship-application-status-select-wrap">
                        <select
                          value={application.status || "Pending"}
                          onChange={(event) =>
                            handleStatusChange(
                              application.id,
                              event.target.value,
                            )
                          }
                          disabled={updatingStatus === application.id}
                          aria-label={`Update status for ${application.name}`}
                        >
                          {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>

                        <FaChevronDown />
                      </div>

                      <button
                        type="button"
                        className="internship-application-view-button"
                        onClick={() =>
                          setExpandedId(isExpanded ? null : application.id)
                        }
                        aria-expanded={isExpanded}
                      >
                        <span>{isExpanded ? "Close" : "View"}</span>
                        {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
                      </button>

                      <button
                        type="button"
                        className="internship-application-delete-button"
                        onClick={() => handleDelete(application)}
                        disabled={isDeleting}
                        aria-label={`Delete ${application.name}`}
                      >
                        {isDeleting ? (
                          <span className="internship-applications-loader mini" />
                        ) : (
                          <FaTrash />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* =================================================
                      EXPANDED DETAILS
                  ================================================= */}

                  {isExpanded && (
                    <div className="internship-application-detail">
                      <div className="internship-application-detail-header">
                        <div className="internship-application-detail-heading">
                          <div className="internship-application-detail-icon">
                            <FaUser />
                          </div>

                          <div className="internship-application-detail-heading-copy">
                            <span>Application Record</span>

                            <h2>{application.name}</h2>

                            <p>
                              Submitted on{" "}
                              {formatDateTime(application.created_at)}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="internship-application-detail-close"
                          onClick={() => setExpandedId(null)}
                          aria-label="Close detail view"
                        >
                          <FaTimes />
                        </button>
                      </div>

                      <div className="internship-application-detail-body">
                        <div className="internship-application-detail-section">
                          <div className="internship-application-detail-section-heading">
                            <span>01</span>
                            <h3>Personal & Academic Details</h3>
                          </div>

                          <div className="internship-application-detail-grid">
                            <div className="internship-application-detail-item">
                              <span className="internship-application-detail-item-label">
                                Full Name
                              </span>

                              <span className="internship-application-detail-item-value">
                                {application.name || "—"}
                              </span>
                            </div>

                            <div className="internship-application-detail-item">
                              <span className="internship-application-detail-item-label">
                                Current Year
                              </span>

                              <span className="internship-application-detail-item-value">
                                {application.current_year || "—"}
                              </span>
                            </div>

                            <div className="internship-application-detail-item">
                              <span className="internship-application-detail-item-label">
                                Semester
                              </span>

                              <span className="internship-application-detail-item-value">
                                {application.semester || "—"}
                              </span>
                            </div>

                            <div className="internship-application-detail-item">
                              <span className="internship-application-detail-item-label">
                                Section
                              </span>

                              <span className="internship-application-detail-item-value">
                                {application.section || "—"}
                              </span>
                            </div>

                            <div className="internship-application-detail-item">
                              <span className="internship-application-detail-item-label">
                                Roll Number
                              </span>

                              <span className="internship-application-detail-item-value">
                                {application.class_roll_number || "—"}
                              </span>
                            </div>

                            <div className="internship-application-detail-item">
                              <span className="internship-application-detail-item-label">
                                Contact Number
                              </span>

                              <span className="internship-application-detail-item-value">
                                <a href={`tel:${application.contact_number}`}>
                                  {application.contact_number || "—"}
                                </a>
                              </span>
                            </div>

                            <div className="internship-application-detail-item internship-application-detail-item-full">
                              <span className="internship-application-detail-item-label">
                                Email Address
                              </span>

                              <span className="internship-application-detail-item-value">
                                <a href={`mailto:${application.email}`}>
                                  {application.email || "—"}
                                </a>
                              </span>
                            </div>

                            <div className="internship-application-detail-item internship-application-detail-item-full">
                              <span className="internship-application-detail-item-label">
                                Local Address
                              </span>

                              <span className="internship-application-detail-item-value">
                                {application.local_address || "—"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="internship-application-detail-section">
                          <div className="internship-application-detail-section-heading">
                            <span>02</span>
                            <h3>Court Preference</h3>
                          </div>

                          <div className="internship-application-detail-grid">
                            <div className="internship-application-detail-item">
                              <span className="internship-application-detail-item-label">
                                Preferred Placement Court
                              </span>

                              <span className="internship-application-detail-item-value">
                                <strong>
                                  {application.court_preference || "—"}
                                </strong>
                              </span>
                            </div>

                            <div className="internship-application-detail-item">
                              <span className="internship-application-detail-item-label">
                                Preferred Internship Year
                              </span>

                              <span className="internship-application-detail-item-value">
                                {application.internship_year || "—"}
                              </span>
                            </div>

                            <div className="internship-application-detail-item">
                              <span className="internship-application-detail-item-label">
                                Preferred Internship Month
                              </span>

                              <span className="internship-application-detail-item-value">
                                {application.internship_month || "—"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="internship-application-detail-section">
                          <div className="internship-application-detail-section-heading">
                            <span>03</span>
                            <h3>Submitted Documents</h3>
                          </div>

                          <div className="internship-application-documents">
                            <div className="internship-application-document">
                              <div className="internship-application-document-icon">
                                <FaFileAlt />
                              </div>

                              <div className="internship-application-document-info">
                                <span>Curriculum Vitae</span>

                                <strong
                                  title={application.cv_original_name || "CV"}
                                >
                                  {application.cv_original_name || "CV.pdf"}
                                </strong>
                              </div>

                              <button
                                type="button"
                                className="internship-application-document-action"
                                onClick={() =>
                                  getDocumentUrl(application, "cv")
                                }
                                disabled={
                                  loadingDocument === `${application.id}-cv`
                                }
                                aria-label="Open CV"
                              >
                                <FaArrowRight />
                              </button>
                            </div>

                            <div className="internship-application-document">
                              <div className="internship-application-document-icon">
                                <FaIdCard />
                              </div>

                              <div className="internship-application-document-info">
                                <span>ID / Fee Receipt</span>

                                <strong
                                  title={
                                    application.id_card_receipt_original_name ||
                                    "Document"
                                  }
                                >
                                  {application.id_card_receipt_original_name ||
                                    "ID_Receipt.pdf"}
                                </strong>
                              </div>

                              <button
                                type="button"
                                className="internship-application-document-action"
                                onClick={() =>
                                  getDocumentUrl(application, "idCard")
                                }
                                disabled={
                                  loadingDocument === `${application.id}-idCard`
                                }
                                aria-label="Open ID card or fee receipt"
                              >
                                <FaArrowRight />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
}

export default InternshipApplications;
