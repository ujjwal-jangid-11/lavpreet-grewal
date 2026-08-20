import "./Resource.css";
import { useNavigate, useParams } from "react-router-dom";
import { HiArrowLeft, HiArrowDownTray } from "react-icons/hi2";
import studyMaterial from "./data";

function Resource() {
  const navigate = useNavigate();

  const { semester, subject, resource } = useParams();

  // Current Semester
  const currentSemester = studyMaterial.find(
    (item) => item.folder === semester,
  );

  // Current Subject
  const currentSubject = currentSemester?.subjects.find(
    (item) => item.folder === subject,
  );

  // Current Resource (notes, bareacts, pyqs...)
  const files = currentSubject?.resources?.[resource];

  // Resource Name
  const resourceTitle =
    {
      notes: "Notes",
      bareacts: "Bare Acts",
      casemat: "Case Material",
      pyqs: "Previous Year Papers",
      dukki: "Dukki",
      rti: "RTI Answer Sheets",
    }[resource] || resource;

  // Invalid Route
  if (!currentSemester || !currentSubject || !files) {
    return (
      <section className="resource-page">
        <div className="resource-container">
          <button
            className="back-btn"
            onClick={() => navigate(`/study-material/${semester}/${subject}`)}
          >
            <HiArrowLeft />
            Back
          </button>

          <div className="empty-state">
            <h2>Resource Not Found</h2>

            <p>The requested resource could not be found.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="resource-page">
      <div className="resource-container">
        {/* Back Button */}

        <button
          className="back-btn"
          onClick={() => navigate(`/study-material/${semester}/${subject}`)}
        >
          <HiArrowLeft />
          Back to {currentSubject.name}
        </button>

        {/* Heading */}

        <div className="resource-header">
          <h1>{resourceTitle}</h1>

          <p>Browse and download all available study material.</p>
        </div>

        {/* File Grid */}

        <div className="file-grid">
          {files.length === 0 ? (
            <div className="empty-state">
              <h2>No Files Available</h2>

              <p>Files will be uploaded soon.</p>
            </div>
          ) : (
            files.map((file) => (
              <div key={file.id} className="file-card">
                {/* File Icon */}

                <div className="file-icon">📄</div>

                {/* File Details */}

                <div>
                  <h2>{file.title}</h2>

                  <p>Click below to open or download this PDF.</p>
                </div>

                {/* Download Button */}

                {/* <a
                  href={file.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-btn"
                >
                  <HiArrowDownTray />
                  Download
                </a> */}

                <div className="resource-buttons">
                  <a
                    href={file.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="preview-btn"
                  >
                    👁 Preview
                  </a>

                  <a
                    href={`${file.file}?download`}
                    download
                    className="download-btn"
                  >
                    <HiArrowDownTray />
                    Download
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Resource;
