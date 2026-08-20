import "./Semester.css";
import { useNavigate, useParams } from "react-router-dom";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import { PiBooksFill } from "react-icons/pi";
import studyMaterial from "./data";

function Semester() {
  const navigate = useNavigate();
  const { semester } = useParams();

  // Current Semester Find
  const currentSemester = studyMaterial.find(
    (item) => item.folder === semester
  );

  if (!currentSemester) {
    return (
      <section className="semester-page">

        <div className="semester-container">

          <h1>Semester Not Found</h1>

          <button
            className="back-btn"
            onClick={() => navigate("/study-material")}
          >
            <HiArrowLeft />
            Back
          </button>

        </div>

      </section>
    );
  }

  return (
    <section className="semester-page">

      <div className="semester-container">

        {/* Back Button */}

        <button
          className="back-btn"
          onClick={() => navigate("/study-material")}
        >
          <HiArrowLeft />
          Back to Study Material
        </button>

        {/* Header */}

        <div className="semester-header">

          <div className="semester-icon">
            <PiBooksFill />
          </div>

          <h1>{currentSemester.semester}</h1>

          <p>

            Select a subject to access Notes,
            Bare Acts, Case Material,
            Previous Year Papers,
            Dukki and RTI Answer Sheets.

          </p>

        </div>

        {/* Subjects */}

        <div className="subject-grid">

          {currentSemester.subjects.map((subject) => (

            <div
              key={subject.id}
              className="subject-card"
              onClick={() =>
                navigate(
                  `/study-material/${currentSemester.folder}/${subject.folder}`
                )
              }
            >

              <div className="subject-top">

                <span className="subject-id">

                  {String(subject.id).padStart(2, "0")}

                </span>

              </div>

              <h2>

                {subject.name}

              </h2>

              <p>

                Notes, Bare Acts,
                Case Material,
                PYQs,
                Dukki &
                RTI

              </p>

              <button>

                Explore

                <HiArrowRight />

              </button>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Semester;