import { useEffect, useRef, useState } from "react";
import {
  FaTimes,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaArrowRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import "./AdminLogin.css";

function AdminLogin({ isOpen, onClose, onLoginSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const modalRef = useRef(null);
  const messageTimerRef = useRef(null);

  const navigate = useNavigate();

  /* =====================================================
                    SHOW MESSAGE
  ===================================================== */

  const showMessage = (type, text, duration = 2000) => {
    if (messageTimerRef.current) {
      clearTimeout(messageTimerRef.current);
    }

    setMessageType(type);
    setMessage(text);

    messageTimerRef.current = setTimeout(() => {
      setMessage("");
      setMessageType("");
      messageTimerRef.current = null;
    }, duration);
  };

  /* =====================================================
                    CLEAR MESSAGE TIMER
  ===================================================== */

  useEffect(() => {
    return () => {
      if (messageTimerRef.current) {
        clearTimeout(messageTimerRef.current);
      }
    };
  }, []);

  /* =====================================================
                        ESC TO CLOSE
  ===================================================== */

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  /* =====================================================
                    BODY SCROLL LOCK
  ===================================================== */

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  /* =====================================================
                      OUTSIDE CLICK
  ===================================================== */

  const handleOverlayClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  /* =====================================================
                          LOGIN
  ===================================================== */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (messageTimerRef.current) {
      clearTimeout(messageTimerRef.current);
      messageTimerRef.current = null;
    }

    setMessage("");
    setMessageType("");
    setIsSubmitting(true);

    const cleanEmail = email.trim();

    try {
      /*
        IMPORTANT:
        This component performs ONLY the login request.

        Session monitoring and one-hour expiry are handled
        by AdminRoute. This prevents nested Supabase auth
        operations and auth-state race conditions.
      */

      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        console.error("Admin login failed:", error.message);

        showMessage("error", error.message, 3000);

        return;
      }

      console.log("Admin login successful:", data?.user?.email);

      /*
        Store the application-level one-hour session start.
        AdminRoute will use this value for the expiry timer.
      */
      localStorage.setItem("adminSessionStartedAt", String(Date.now()));

      /*
        Store success message for AdminPanel.
      */
      sessionStorage.setItem(
        "adminLoginSuccess",
        "Admin access granted. Welcome back.",
      );

      /*
        Notify Header, if the callback exists.
        (Navigation and modal close are handled by the parent component now)
      */
      if (typeof onLoginSuccess === "function") {
        onLoginSuccess(data?.session);
      }
    } catch (error) {
      console.error("Unexpected admin login error:", error);

      showMessage("error", "Unable to sign in. Please try again.", 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =====================================================
                    RESET WHEN CLOSED
  ===================================================== */

  useEffect(() => {
    if (!isOpen) {
      setPassword("");
      setShowPassword(false);
      setMessage("");
      setMessageType("");
      setIsSubmitting(false);

      if (messageTimerRef.current) {
        clearTimeout(messageTimerRef.current);
        messageTimerRef.current = null;
      }
    }
  }, [isOpen]);

  /* =====================================================
                          RETURN
  ===================================================== */

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="admin-login-overlay"
        onMouseDown={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-login-title"
      >
        <div
          ref={modalRef}
          className="admin-login-modal"
          onMouseDown={(event) => event.stopPropagation()}
        >
          {/* =================================================
                                CLOSE
          ================================================= */}

          <button
            type="button"
            className="admin-login-close"
            onClick={onClose}
            aria-label="Close admin login"
          >
            <FaTimes />
          </button>

          {/* =================================================
                                HEADER
          ================================================= */}

          <div className="admin-login-header">
            <div className="admin-login-icon">
              <FaLock />
            </div>

            <div className="admin-login-heading">
              <span className="admin-login-eyebrow">LAW FACULTY HUB</span>

              <h2 id="admin-login-title">Admin Login</h2>

              <p>Sign in to access the administration panel.</p>
            </div>
          </div>

          {/* =================================================
                                FORM
          ================================================= */}

          <form className="admin-login-form" onSubmit={handleSubmit}>
            {/* ================= EMAIL ================= */}

            <div className="admin-login-field">
              <label htmlFor="admin-email">Email Address</label>

              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* ================= PASSWORD ================= */}

            <div className="admin-login-field">
              <label htmlFor="admin-password">Password</label>

              <div className="admin-password-wrapper">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  disabled={isSubmitting}
                />

                <button
                  type="button"
                  className="admin-password-toggle"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={isSubmitting}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* =================================================
                            LOGIN BUTTON
            ================================================= */}

            <button
              type="submit"
              className="admin-login-submit"
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? "Signing In..." : "Sign In"}</span>

              <strong>
                <FaArrowRight />
              </strong>
            </button>
          </form>

          {/* =================================================
                                FOOTER
          ================================================= */}

          <div className="admin-login-footer">
            <span>Authorized administrators only</span>
          </div>

          {/* =================================================
                          ERROR MESSAGE
          ================================================= */}

          {message && (
            <div
              className={`admin-login-message admin-login-message-${messageType}`}
              role="status"
              aria-live="polite"
            >
              <span>{message}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
