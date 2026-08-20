import "./Subject.css";
import { useNavigate, useParams } from "react-router-dom";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import studyMaterial from "./data";

function Subject() {
  const navigate = useNavigate();

  const { semester, subject } = useParams();

  const currentSemester = studyMaterial.find(
    (item) => item.folder === semester,
  );

  const currentSubject = currentSemester?.subjects.find(
    (item) => item.folder === subject,
  );

  if (!currentSemester || !currentSubject) {
    return (
      <section className="subject-page">
        <div className="subject-container">
          <button
            className="back-btn"
            onClick={() => navigate("/study-material")}
          >
            <HiArrowLeft />
            Back
          </button>

          <div className="empty-state">
            <h2>Subject Not Found</h2>

            <p>The requested subject does not exist.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="subject-page">
      <div className="subject-container">
        {/* Back Button */}

        <button
          className="back-btn"
          onClick={() => navigate(`/study-material/${semester}`)}
        >
          <HiArrowLeft />
          Back to {currentSemester.semester}
        </button>

        {/* Heading */}

        <div className="subject-header">
          <h1>{currentSubject.name}</h1>

          <p>Select the study resource you want to access.</p>
        </div>

        {/* Resource Cards */}

        <div className="resource-grid">
          {Object.entries(currentSubject.resources).map(([key, files]) => (
            <div
              key={key}
              className="resource-card"
              onClick={() =>
                navigate(`/study-material/${semester}/${subject}/${key}`)
              }
            >
              <div>
                <h2>
                  {key
                    .replace("bareacts", "Bare Acts")
                    .replace("casemat", "Case Material")
                    .replace("pyqs", "Previous Year Papers")
                    .replace("dukki", "Dukki")
                    .replace("notes", "Notes")
                    .replace("rti", "RTI Answer Sheets")}
                </h2>

                <div className="file-count">{files.length} Files Available</div>

                <p>Open all available resources for this category.</p>
              </div>

              <div className="resource-footer">
                <span>Explore</span>

                <HiArrowRight />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Subject;
