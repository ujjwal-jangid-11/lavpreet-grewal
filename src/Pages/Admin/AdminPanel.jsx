import { useEffect, useState } from "react";
import {
  FaSignOutAlt,
  FaUserShield,
  FaLayerGroup,
  FaArrowRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import "./AdminPanel.css";

function AdminPanel() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout failed:", error.message);
      alert(error.message);
      return;
    }

    window.location.href = "/";
  };

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
              <span className="admin-panel-eyebrow">
                LAW FACULTY HUB
              </span>

              <h1>Admin Panel</h1>

              <p>
                Manage your website from one place.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="admin-panel-logout"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </header>

        {/* ================= ACCOUNT ================= */}

        <section className="admin-panel-account">
          <div>
            <span className="admin-panel-section-label">
              Signed in as
            </span>

            <strong>
              {user?.email || "Administrator"}
            </strong>
          </div>

          <span className="admin-panel-account-status">
            <span className="admin-panel-status-dot"></span>
            Authenticated
          </span>
        </section>

        {/* ================= DASHBOARD ================= */}

        <section className="admin-panel-content">

          <div className="admin-panel-welcome">
            <span className="admin-panel-section-label">
              Dashboard
            </span>

            <h2>Welcome, Administrator</h2>

            <p>
              Your authentication is working correctly. Choose a
              section below to manage your website content.
            </p>
          </div>

          {/* ================= CONTENT MANAGEMENT ================= */}

          <div className="admin-panel-cards">

            <article className="admin-panel-card">

              <div className="admin-panel-card-icon">
                <FaLayerGroup />
              </div>

              <div className="admin-panel-card-body">

                <span className="admin-panel-card-label">
                  CONTENT
                </span>

                <h3>Content Management</h3>

                <p>
                  Manage internship opportunities and important
                  updates for students from one place.
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

          </div>

        </section>
      </div>
    </main>
  );
}

export default AdminPanel;