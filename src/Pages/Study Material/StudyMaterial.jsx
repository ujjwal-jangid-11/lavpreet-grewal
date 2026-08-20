import "./StudyMaterial.css";
import { useNavigate } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";
import { PiBooksFill } from "react-icons/pi";
import studyMaterial from "./data";
import SEO from "../../SEO/SEO.jsx";

function StudyMaterial() {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Law Study Material | Notes, Bare Acts & PYQs | LC2"
        description="Access law study material for Law Centre-II students including semester notes, Bare Acts, case material, previous year papers, Dukki, RTI answer sheets and other academic resources."
        path="/study-material"
      />

      <section className="study-page">
        <div className="study-container">

          {/* Hero */}

          <div className="study-header">

            <div className="study-icon">
              <PiBooksFill />
            </div>

            <h1>
              Study Material
            </h1>

            <p>
              Everything you need for your semester in one place.
              Access Notes, Bare Acts, Case Material, Previous Year
              Papers, Dukki and RTI Answer Sheets with a clean and
              organized experience.
            </p>

          </div>

          {/* Semester Cards */}

          <div className="semester-grid">

            {studyMaterial.map((semester, index) => (

              <div
                className="semester-card"
                key={semester.id}
                onClick={() =>
                  navigate(`/study-material/${semester.folder}`)
                }
              >

                <span className="semester-id">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h2>
                  {semester.semester}
                </h2>

                <p>
                  {semester.subjects.length} Subjects Available
                </p>

                <div className="resource-list">
                  <span>Notes</span>
                  <span>Bare Acts</span>
                  <span>Case Material</span>
                  <span>PYQs</span>
                  <span>Dukki</span>
                  <span>RTI</span>
                </div>

                <button type="button">
                  Explore
                  <HiArrowRight />
                </button>

              </div>

            ))}

          </div>

        </div>
      </section>
    </>
  );
}

export default StudyMaterial;