import "./Footer.css";
import { Link } from "react-router-dom";

import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaArrowRight,
  FaLinkedin,
} from "react-icons/fa";

function Footer() {
  return (
    <>
      {/* ================= FOOTER ================= */}

      <footer className="footer">
        <div className="footer-container">
          {/* LEFT */}

          <div className="footer-col">
            <Link to="/" className="footer-logo">
              Lavpreet<span> Grewal</span>
            </Link>

            <p className="footer-text">
              Leadership begins with listening, grows through action, and
              succeeds with trust.
            </p>
          </div>

          {/* CENTER */}

          <div className="footer-col">
            <h3>Quick Links</h3>

            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/about">About</Link>
              </li>

              <li>
                <Link to="/manifesto">Manifesto</Link>
              </li>

              <li>
                <Link to="/events">Events</Link>
              </li>

              <li>
                <Link to="/study-material">Study Material</Link>
              </li>

              <li>
                <Link to="/connect">Connect</Link>
              </li>
            </ul>
          </div>

          {/* RIGHT */}

          <div className="footer-col">
            <h3>Stay Connected</h3>

            <p className="social-text">Follow our journey and stay updated.</p>

            <div className="social-icons">
              <a href="https://instagram.com/lavpreetgrewal_lc2">
                <FaInstagram />
              </a>

              <a href="https://www.linkedin.com/in/lavpreet-grewal-7270831bb?utm_source=share_via&utm_content=profile&utm_medium=member_android">
                <FaLinkedin />
              </a>

              <a href="https://wa.me/+919873565433">
                <FaWhatsapp />
              </a>
            </div>

            <div className="footer-quote">
              <h4>Every Voice Matters.</h4>

              <p>Together We Rise.</p>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="footer-bottom">
          <p>© 2026 Lavpreet Grewal. All Rights Reserved.</p>

          <p>Made with ❤️ for Students.</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
