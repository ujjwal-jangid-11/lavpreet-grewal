import {
  FiBriefcase,
  FiClock,
  FiExternalLink,
  FiFileText,
  FiMapPin,
} from "react-icons/fi";

import "./Internship.css";

const Internship = ({ internships = [] }) => {
  const getCompany = (internship) => {
    return (
      internship.organization ||
      internship.company ||
      internship.organisation ||
      ""
    );
  };

  const getRole = (internship) => {
    return (
      internship.role ||
      internship.internship_role ||
      internship.position ||
      internship.title ||
      "Legal Internship"
    );
  };

  const getDescription = (internship) => {
    return (
      internship.description ||
      internship.content ||
      "View the complete internship opportunity for more details."
    );
  };

  const getLocation = (internship) => {
    return internship.location || internship.mode || "";
  };

  const getDuration = (internship) => {
    return internship.duration || "";
  };

  const getDeadline = (internship) => {
    return internship.deadline || internship.application_deadline || "";
  };

  const getApplicationUrl = (internship) => {
    return internship.application_url || internship.apply_url || "";
  };

  const getPdfUrl = (internship) => {
    return (
      internship.pdf_url ||
      internship.pdf ||
      internship.document_url ||
      internship.file_url ||
      ""
    );
  };

  /*
   * IMPORTANT:
   * Deadline ko tabhi format karenge jab database
   * me genuinely valid date available ho.
   *
   * Missing/invalid deadline par koi current/today
   * ki date generate nahi hogi.
   */
  const formatDeadline = (value) => {
    if (!value) {
      return null;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (internships.length === 0) {
    return (
      <div className="bulletin-empty">
        <div className="bulletin-empty-icon">
          <FiBriefcase />
        </div>

        <h3>No internship opportunities yet</h3>

        <p>New opportunities will be added here when available.</p>
      </div>
    );
  }

  return (
    <div className="bulletin-internship-list">
      {internships.map((internship) => {
        const company = getCompany(internship);
        const role = getRole(internship);
        const description = getDescription(internship);
        const location = getLocation(internship);
        const duration = getDuration(internship);

        const deadlineValue = getDeadline(internship);
        const deadline = formatDeadline(deadlineValue);

        const applicationUrl = getApplicationUrl(internship);
        const pdfUrl = getPdfUrl(internship);

        return (
          <article className="bulletin-internship-card" key={internship.id}>
            <div className="bulletin-internship-icon">
              <FiBriefcase />
            </div>

            <div className="bulletin-internship-main">
              <span className="bulletin-opportunity-label">
                INTERNSHIP OPPORTUNITY
              </span>

              <h3>{company || role}</h3>

              {company && (
                <div className="bulletin-internship-role">{role}</div>
              )}

              <p>{description}</p>

              {(location || duration || deadline) && (
                <div className="bulletin-internship-meta">
                  {location && (
                    <span>
                      <FiMapPin />
                      {location}
                    </span>
                  )}

                  {duration && (
                    <span>
                      <FiClock />
                      {duration}
                    </span>
                  )}

                  {deadline && (
                    <span>
                      <FiClock />
                      Deadline: {deadline}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="bulletin-internship-actions">
              {applicationUrl && (
                <a
                  href={applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bulletin-opportunity-btn"
                >
                  Apply
                  <FiExternalLink />
                </a>
              )}

              {pdfUrl && (
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bulletin-opportunity-btn bulletin-pdf-btn"
                >
                  View PDF
                  <FiFileText />
                </a>
              )}

              {!applicationUrl && !pdfUrl && (
                <span className="bulletin-opportunity-btn bulletin-opportunity-btn-disabled">
                  Details
                  <FiFileText />
                </span>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Internship;
