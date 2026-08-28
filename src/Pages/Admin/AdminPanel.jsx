import { useEffect, useState } from "react";
import {
  FaSignOutAlt,
  FaUserShield,
  FaLayerGroup,
  FaArrowRight,
  FaFileAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import "./AdminPanel.css";

function AdminPanel() {
  const [user, setUser] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navigate = useNavigate();

  /* =====================================================
                         GET CURRENT USER
  ===================================================== */

  useEffect(() => {
    let mounted = true;

    const getUser = async () => {
      const {
        data: { user: currentUser },
        error,
      } = await supabase.auth.getUser();

      if (!mounted) return;

      if (error) {
        console.error("Failed to get admin user:", error.message);

        setUser(null);
        return;
      }

      setUser(currentUser);
    };

    getUser();

    return () => {
      mounted = false;
    };
  }, []);

  /* =====================================================
                              LOGOUT
  ===================================================== */

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      console.log("Admin logout started");

      /*
        Local logout only.
        This signs out the currently active browser session
        without affecting the same admin account on another
        device/browser.
      */

      const { error } = await supabase.auth.signOut({
        scope: "local",
      });

      if (error) {
        console.error("Logout failed:", error.message);

        setIsLoggingOut(false);
        return;
      }

      /*
        Clear our custom one-hour session timestamp.
      */

      localStorage.removeItem("adminSessionStartedAt");

      /*
        Clear login success message if it still exists.
      */

      sessionStorage.removeItem("adminLoginSuccess");

      /*
        Clear local user state.
      */

      setUser(null);

      console.log("Admin logout successful");

      /*
        React Router navigation instead of a hard browser reload.
      */

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      console.error("Unexpected logout error:", error);

      setIsLoggingOut(false);
    }
  };

  /* =====================================================
                            RETURN
  ===================================================== */

  return (
    <main className="admin-panel">
      <div className="admin-panel-container">
        {/* ================= HEADER ================= */}

        <header className="admin-panel-header">
          <div className="admin-panel-heading">
            <div className="admin-panel-icon">
              <FaUserShield />
            </div>

            <div>
              <span className="admin-panel-eyebrow">LAW FACULTY HUB</span>

              <h1>Admin Panel</h1>

              <p>Manage your website from one place.</p>
            </div>
          </div>

          <button
            type="button"
            className="admin-panel-logout"
            onClick={handleLogout}
            disabled={isLoggingOut}
            aria-label="Logout from admin panel"
          >
            <FaSignOutAlt />

            <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
          </button>
        </header>

        {/* ================= ACCOUNT ================= */}

        <section className="admin-panel-account">
          <div>
            <span className="admin-panel-section-label">Signed in as</span>

            <strong>{user?.email || "Administrator"}</strong>
          </div>

          <span className="admin-panel-account-status">
            <span className="admin-panel-status-dot" />
            Authenticated
          </span>
        </section>

        {/* ================= DASHBOARD ================= */}

        <section className="admin-panel-content">
          <div className="admin-panel-welcome">
            <span className="admin-panel-section-label">Dashboard</span>

            <h2>Welcome, Administrator</h2>

            <p>
              Your authentication is working correctly. Choose a section below
              to manage your website content and internship applications.
            </p>
          </div>

          {/* ================= CONTENT MANAGEMENT ================= */}

          <div className="admin-panel-cards">
            {/* EXISTING CONTENT MANAGEMENT CARD */}

            <article className="admin-panel-card">
              <div className="admin-panel-card-icon">
                <FaLayerGroup />
              </div>

              <div className="admin-panel-card-body">
                <span className="admin-panel-card-label">CONTENT</span>

                <h3>Content Management</h3>

                <p>
                  Manage internship opportunities and important updates for
                  students from one place.
                </p>

                <button
                  type="button"
                  className="admin-panel-card-button"
                  onClick={() => navigate("/admin/content")}
                >
                  <span>Manage Content</span>
                  <FaArrowRight />
                </button>
              </div>
            </article>

            {/* ================= INTERNSHIP APPLICATIONS ================= */}

            <article className="admin-panel-card">
              <div className="admin-panel-card-icon">
                <FaFileAlt />
              </div>

              <div className="admin-panel-card-body">
                <span className="admin-panel-card-label">APPLICATIONS</span>

                <h3>Internship Applications</h3>

                <p>
                  Review submitted internship applications, applicant details,
                  court preferences and uploaded documents from one place.
                </p>

                <button
                  type="button"
                  className="admin-panel-card-button"
                  onClick={() => navigate("/admin/internship-applications")}
                >
                  <span>View Applications</span>
                  <FaArrowRight />
                </button>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AdminPanel;
