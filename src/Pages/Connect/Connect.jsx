import "./Connect.css";

import { Link } from "react-router-dom";

import {
  HiArrowLeft,
  HiEnvelope,
  HiPhone,
  HiArrowTopRightOnSquare,
} from "react-icons/hi2";

import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa6";

function Connect() {
  return (
    <main className="connect-page">
      <div className="connect-container">
        {/* ===========================
                HEADER
        =========================== */}

        <div className="connect-header">
          <Link to="/" className="back-btn">
            <HiArrowLeft />
            <span>Back</span>
          </Link>

          <span className="connect-tag">🤝 We'd Love To Hear From You</span>

          <h1>Get Connected</h1>

          <p>
            Whether you have any questions, suggestions, feedback, collaboration
            ideas, event related queries or simply wish to connect with Team
            Love Preet Grewal, fill out the form below. We'll get back to you as
            soon as possible.
          </p>
        </div>

        {/* ===========================
                INFO CARD
        =========================== */}

        <div className="info-card">
          <div className="info-icon">
            <HiEnvelope />
          </div>

          <div className="info-content">
            <h3>Before You Submit</h3>

            <p>
              Please provide correct information so our team can reach you
              easily. Response time is usually within
              <strong> 24–48 hours.</strong>
            </p>
          </div>
        </div>

        {/* ===========================
                FORM
        =========================== */}

        <section className="form-section">
          <div className="section-header">
            <h2>Connection Form</h2>

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSd68-AhEtqcLnXPoRGnAwLtuhqISdb2chTO39xyArYMHECdpA/viewform?embedded=true"
              target="_blank"
              rel="noreferrer"
              className="open-form-btn"
            >
              <HiArrowTopRightOnSquare />
              Open in New Tab
            </a>
          </div>

          <div className="iframe-card">
            <iframe
              title="Student Election Form"
              src="https://docs.google.com/forms/d/e/1FAIpQLSd68-AhEtqcLnXPoRGnAwLtuhqISdb2chTO39xyArYMHECdpA/viewform?embedded=true"
              width="100%"
              height="2982"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
            >
              Loading…
            </iframe>
          </div>
        </section>

        {/* ===========================
                CONTACT
        =========================== */}

        <section className="contact-section">
          <h2>Need Another Way To Reach Us?</h2>

          <p>You can also connect with us through the platforms below.</p>

          <div className="contact-grid">
            <a href="mailto:query.teamlavpreetlc2@gmail.com" className="contact-card">
              <HiEnvelope />

              <div>
                <h4>Email</h4>
                <span>query.teamlavpreetlc2@gmail.com</span>
              </div>
            </a>

            <a
              href="https://wa.me/919873565433"
              target="_blank"
              rel="noreferrer"
              className="contact-card"
            >
              <FaWhatsapp />

              <div>
                <h4>WhatsApp</h4>
                <span>Chat with us</span>
              </div>
            </a>

            <a
              href="https://instagram.com/lavpreetgrewal_lc2"
              target="_blank"
              rel="noreferrer"
              className="contact-card"
            >
              <FaInstagram />

              <div>
                <h4>Instagram</h4>
                <span>@lavpreetgrewal_lc2</span>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/lavpreet-grewal-7270831bb?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noreferrer"
              className="contact-card"
            >
              <FaLinkedin />

              <div>
                <h4>LinkedIn</h4>
                <span>Let's Connect</span>
              </div>
            </a>

            <a href="tel:+919873565433" className="contact-card">
              <HiPhone />

              <div>
                <h4>Phone</h4>
                <span>+91 98735 65433</span>
              </div>
            </a>
          </div>
        </section>

        {/* ===========================
                FOOTER NOTE
        =========================== */}

        <div className="footer-note">
          <p>
            Thank you for taking the time to connect with us. We appreciate your
            support and look forward to hearing from you.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Connect;
