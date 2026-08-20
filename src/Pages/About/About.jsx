import "./About.css";
import candidate from "../../assets/logo.webp";

import {
  HiAcademicCap,
  HiScale,
  HiUserGroup,
  HiLightBulb,
} from "react-icons/hi2";

function About() {
  return (
    <main className="about-page">
      {/* ================= HERO ================= */}

      <section className="about-hero">
        <div className="hero-content">
          <span className="hero-tag">Faculty of Law • University of Delhi</span>

          <h1>
            Meet
            <span> Lavpreet Grewal</span>
          </h1>

          <p>
            Leadership is not about standing above others. It is about standing
            beside every student, listening with sincerity, understanding every
            concern, and working together for meaningful progress.
          </p>
        </div>

        <div className="hero-image">
          <img src={candidate} alt="Lavpreet Grewal" fetchPriority="high" loading="eager"/>
        </div>
      </section>

      {/* ================= ABOUT ================= */}

      <section className="about-section">
        <div className="section-title">
          <span>ABOUT</span>

          <h2>
            A Student.
            <br />
            A Listener.
            <br />A Responsible Representative.
          </h2>
        </div>

        <div className="about-content">
          <p>
            Being a law student at the Faculty of Law, University of Delhi, I
            experience the same classrooms, assignments, internships,
            examinations, administrative procedures, and everyday challenges
            that every student faces.
          </p>

          <p>
            Contesting this election is not about holding a position. It is
            about accepting the responsibility to represent students with
            honesty, transparency, and commitment. Every opinion deserves
            attention, every concern deserves respect, and every student
            deserves to be heard.
          </p>

          <p>
            I believe leadership begins with listening. Before offering
            solutions, one must first understand the real problems faced by
            students. Genuine representation is built on trust, communication,
            and accountability.
          </p>

          <p>
            My objective is simple — to remain approachable, accessible, and
            dedicated towards creating a more supportive, inclusive, and
            student-focused environment.
          </p>
        </div>
      </section>

      {/* ================= VALUES ================= */}

      <section className="values-section">
        <div className="section-title">
          <span>CORE VALUES</span>

          <h2>Principles That Guide Every Decision</h2>
        </div>

        <div className="values-grid">
          <div className="value-card">
            <HiScale />

            <h3>Integrity</h3>

            <p>
              Acting with honesty, fairness, and responsibility in every action.
            </p>
          </div>

          <div className="value-card">
            <HiUserGroup />

            <h3>Representation</h3>

            <p>
              Every student deserves equal respect, equal opportunity, and an
              equal voice.
            </p>
          </div>

          <div className="value-card">
            <HiAcademicCap />

            <h3>Academic Growth</h3>

            <p>
              Supporting an environment where learning, development, and
              opportunities flourish.
            </p>
          </div>

          <div className="value-card">
            <HiLightBulb />

            <h3>Innovation</h3>

            <p>
              Encouraging practical ideas and constructive solutions for a
              better student experience.
            </p>
          </div>
        </div>
      </section>
      {/* ================= VISION ================= */}

      <section className="vision-section">
        <div className="section-title">
          <span>MY VISION</span>

          <h2>Building A Better Student Experience</h2>
        </div>

        <div className="vision-grid">
          <div className="vision-card">
            <span>01</span>

            <h3>Better Academic Support</h3>

            <p>
              Encourage initiatives that strengthen academic guidance, improve
              access to resources, and create more opportunities for learning
              and professional growth.
            </p>
          </div>

          <div className="vision-card">
            <span>02</span>

            <h3>Transparent Representation</h3>

            <p>
              A representative should remain approachable, accountable, and
              committed to listening before making decisions.
            </p>
          </div>

          <div className="vision-card">
            <span>03</span>

            <h3>Stronger Student Community</h3>

            <p>
              Promote collaboration, mutual respect, and meaningful
              participation so every student feels included.
            </p>
          </div>
        </div>
      </section>

      {/* ================= JOURNEY ================= */}

      <section className="journey-section">
        <div className="section-title">
          <span>THE JOURNEY</span>

          <h2>Every Step Has Been A Learning Experience</h2>
        </div>

        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-circle"></div>

            <div className="timeline-content">
              <h3>Started My Law Journey</h3>

              <p>
                Entered the Faculty of Law with the desire to learn, understand,
                and prepare for a meaningful legal career.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-circle"></div>

            <div className="timeline-content">
              <h3>Understanding Student Life</h3>

              <p>
                Interacting with fellow students, participating in academic
                activities, and understanding the everyday challenges faced
                within the campus.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-circle"></div>

            <div className="timeline-content">
              <h3>Taking Responsibility</h3>

              <p>
                Decided to contest the election with the belief that meaningful
                representation begins with listening and sincere action.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY I'M CONTESTING ================= */}

      <section className="purpose-section">
        <div className="section-title">
          <span>WHY I'M CONTESTING</span>

          <h2>Representation Beyond Promises</h2>
        </div>

        <div className="purpose-content">
          <p>
            I believe leadership is not measured by speeches or slogans. It is
            measured by consistency, responsibility, and the willingness to
            remain available whenever students need support.
          </p>

          <p>
            Contesting this election is my commitment to contribute positively
            towards the student community, encourage constructive dialogue, and
            ensure that every voice receives the respect it deserves.
          </p>

          <p>
            My objective is simple — to represent students honestly, work
            collectively, and always place the interests of the student
            community first.
          </p>
        </div>
      </section>

      {/* ================= QUOTE ================= */}

      <section className="quote-section">
        <blockquote>
          "Leadership is not about being remembered for powerful speeches, but
          for meaningful actions that genuinely improve the lives of others."
        </blockquote>
      </section>
      {/* ================= CLOSING MESSAGE ================= */}

      <section className="closing-section">
        <div className="closing-card">
          <span className="closing-tag">TOGETHER FOR A BETTER CAMPUS</span>

          <h2>
            Every Student Matters.
            <br />
            Every Voice Deserves To Be Heard.
          </h2>

          <p>
            A representative is not someone who simply speaks on behalf of
            students. A representative is someone who listens, understands,
            remains accessible, and works consistently towards meaningful
            solutions.
          </p>

          <p>
            I believe that trust is earned through actions, not words. If given
            the opportunity, I will always strive to represent every student
            with honesty, transparency, and dedication.
          </p>
        </div>
      </section>
    </main>
  );
}

export default About;
