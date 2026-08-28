import "./Header.css";
import logo from "../assets/logo.webp";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
  FaHome,
  FaUser,
  FaFileAlt,
  FaCalendarAlt,
  FaBookOpen,
  FaArrowRight,
  FaBullhorn,
  FaFingerprint,
  FaCheck,
} from "react-icons/fa";
import { supabase } from "../supabase/supabaseClient";
import AdminLogin from "../AdminLogin/AdminLogin";

const navLinks = [
  {
    name: "Home",
    path: "/",
    icon: <FaHome />,
  },
  {
    name: "About",
    path: "/about",
    icon: <FaUser />,
  },
  {
    name: "Manifesto",
    path: "/manifesto",
    icon: <FaFileAlt />,
  },
  {
    name: "Events",
    path: "/events",
    icon: <FaCalendarAlt />,
  },
  {
    name: "Study Material",
    path: "/study-material",
    icon: <FaBookOpen />,
  },
  {
    name: "Bulletin",
    path: "/bulletin",
    icon: <FaBullhorn />,
  },
];

function Header({ darkMode, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [session, setSession] = useState(null);

  // Login success popup
  const [loginSuccess, setLoginSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (mounted) {
        setSession(session);
      }
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setSession(session);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  const handleConnect = () => {
    closeMenu();
    navigate("/connect");
  };

  const handleLogin = () => {
    closeMenu();
    setLoginOpen(true);
  };

  const handleAdminButton = () => {
    closeMenu();

    if (session) {
      navigate("/admin");
      return;
    }

    setLoginOpen(true);
  };

  const closeLogin = () => {
    setLoginOpen(false);
  };

  // Called by AdminLogin after successful authentication
  const handleLoginSuccess = () => {
    setLoginOpen(false);

    setLoginSuccess(true);

    setTimeout(() => {
      setLoginSuccess(false);
    }, 2000);

    navigate("/admin");
  };

  return (
    <>
      <header className={`header ${menuOpen ? "menu-open" : ""}`}>
        {/* =================================================
                            BRAND
        ================================================= */}

        <Link
          to="/"
          className="hdr-logo"
          onClick={closeMenu}
          aria-label="Lavpreet Grewal Home"
        >
          <div className="logo-mark">
            <img src={logo} alt="Lavpreet Grewal" className="logo-img" />
          </div>

          <div className="logo-info">
            <span className="logo-name">Lavpreet Grewal</span>

            <span className="logo-subtitle">Student's Voice</span>
          </div>
        </Link>

        {/* =================================================
                        NAVIGATION
        ================================================= */}

        <nav
          className={`navbar ${menuOpen ? "active" : ""}`}
          aria-label="Main navigation"
        >
          <div className="nav-links">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={closeMenu}
                className={isActive(item.path) ? "active" : ""}
              >
                <span className="nav-name">{item.name}</span>

                <span className="mobile-nav-icon">{item.icon}</span>
              </Link>
            ))}
          </div>

          {/* =================================================
                        MOBILE FOOTER
          ================================================= */}

          <div className="mobile-footer">
            <div className="mobile-footer-top">
              <span className="mobile-follow">FOLLOW THE JOURNEY</span>

              <div className="social-icons">
                <a
                  href="https://wa.me/+919873565433"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp />
                </a>

                <a
                  href="https://instagram.com/lavpreetgrewal_lc2"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>

                <a
                  href="https://www.linkedin.com/in/lavpreet-grewal-7270831bb?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>

            <button
              className="connect-btn mobile-connect"
              onClick={handleConnect}
            >
              <span>Connect With Us</span>

              <strong>
                <FaArrowRight />
              </strong>
            </button>
          </div>
        </nav>

        {/* =================================================
                    RIGHT ACTIONS
        ================================================= */}

        <div className="right-section">
          {/* =================================================
                    THEME + ADMIN
          ================================================= */}

          <div className="theme-actions">
            <button
              className="theme-btn"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
            >
              {darkMode ? (
                <FaSun className="theme-icon" />
              ) : (
                <FaMoon className="theme-icon" />
              )}
            </button>

            <button
              className="fingerprint-btn"
              onClick={handleAdminButton}
              aria-label={session ? "Admin Panel" : "Admin Login"}
            >
              <FaFingerprint className="fingerprint-icon" />

              <span className="admin-tooltip">
                {session ? "Admin Panel" : "Admin Login"}
              </span>
            </button>
          </div>

          {/* =================================================
                    DESKTOP SOCIALS
          ================================================= */}

          <div className="desktop-socials">
            <a
              href="https://wa.me/+919873565433"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>

            <a
              href="https://instagram.com/lavpreetgrewal_lc2"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.linkedin.com/in/lavpreet-grewal-7270831bb?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>

          {/* =================================================
                    DESKTOP CONNECT
          ================================================= */}

          <button
            className="connect-btn desktop-connect"
            onClick={handleConnect}
          >
            <span>Connect</span>
            <strong>↗</strong>
          </button>

          {/* =================================================
                        MOBILE MENU
          ================================================= */}

          <button
            className="menu-btn"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <FaTimes className="menu-icon" />
            ) : (
              <FaBars className="menu-icon" />
            )}
          </button>
        </div>
      </header>

      {/* =================================================
                    ADMIN LOGIN POPUP
      ================================================= */}

      <AdminLogin
        isOpen={loginOpen}
        onClose={closeLogin}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* =================================================
                    LOGIN SUCCESS MESSAGE
      ================================================= */}

      {loginSuccess && (
        <div className="admin-login-success" role="status" aria-live="polite">
          <span className="admin-login-success-icon">
            <FaCheck />
          </span>

          <span className="admin-login-success-text">
            Welcome back. Admin access granted.
          </span>
        </div>
      )}
    </>
  );
}

export default Header;