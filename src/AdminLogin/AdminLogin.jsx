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

function AdminLogin({ isOpen, onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const modalRef = useRef(null);
  const messageTimerRef = useRef(null);
  const logoutTimerRef = useRef(null);

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
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target)
    ) {
      onClose();
    }
  };

  /* =====================================================
                    ONE HOUR AUTO LOGOUT
  ===================================================== */

  useEffect(() => {
    const SESSION_DURATION = 60 * 60 * 1000;

    const setupAutoLogout = async () => {
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
        logoutTimerRef.current = null;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        localStorage.removeItem("adminSessionStartedAt");
        return;
      }

      const storedStartTime = localStorage.getItem(
        "adminSessionStartedAt"
      );

      if (!storedStartTime) {
        const now = Date.now();

        localStorage.setItem(
          "adminSessionStartedAt",
          String(now)
        );

        logoutTimerRef.current = setTimeout(async () => {
          await supabase.auth.signOut();

          localStorage.removeItem(
            "adminSessionStartedAt"
          );

          window.location.replace("/");
        }, SESSION_DURATION);

        return;
      }

      const elapsed =
        Date.now() - Number(storedStartTime);

      const remaining =
        SESSION_DURATION - elapsed;

      if (remaining <= 0) {
        await supabase.auth.signOut();

        localStorage.removeItem(
          "adminSessionStartedAt"
        );

        window.location.replace("/");

        return;
      }

      logoutTimerRef.current = setTimeout(async () => {
        await supabase.auth.signOut();

        localStorage.removeItem(
          "adminSessionStartedAt"
        );

        window.location.replace("/");
      }, remaining);
    };

    setupAutoLogout();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          localStorage.setItem(
            "adminSessionStartedAt",
            String(Date.now())
          );

          setupAutoLogout();
        }

        if (event === "SIGNED_OUT") {
          if (logoutTimerRef.current) {
            clearTimeout(logoutTimerRef.current);
            logoutTimerRef.current = null;
          }

          localStorage.removeItem(
            "adminSessionStartedAt"
          );
        }
      }
    );

    return () => {
      subscription.unsubscribe();

      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
        logoutTimerRef.current = null;
      }
    };
  }, []);

  /* =====================================================
                          LOGIN
  ===================================================== */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (messageTimerRef.current) {
      clearTimeout(messageTimerRef.current);
    }

    setMessage("");
    setMessageType("");

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    /* ===================================================
                        LOGIN ERROR
    =================================================== */

    if (error) {
      console.error(
        "Admin login failed:",
        error.message
      );

      showMessage(
        "error",
        error.message,
        3000
      );

      return;
    }

    /* ===================================================
                      LOGIN SUCCESS
    =================================================== */

    console.log(
      "Admin login successful",
      data
    );

    /*
      Start the one-hour admin session.
    */
    localStorage.setItem(
      "adminSessionStartedAt",
      String(Date.now())
    );

    /*
      Store success message for Admin Panel.
      AdminLogin may unmount immediately after navigation,
      so the message is intentionally stored here.
    */
    sessionStorage.setItem(
      "adminLoginSuccess",
      "Admin access granted. Welcome back."
    );

    /*
      Close login modal and immediately navigate.
    */
    onClose();
    navigate("/admin");
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
          onMouseDown={(event) =>
            event.stopPropagation()
          }
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
              <span className="admin-login-eyebrow">
                LAW FACULTY HUB
              </span>

              <h2 id="admin-login-title">
                Admin Login
              </h2>

              <p>
                Sign in to access the administration panel.
              </p>
            </div>
          </div>

          {/* =================================================
                                FORM
          ================================================= */}

          <form
            className="admin-login-form"
            onSubmit={handleSubmit}
          >
            {/* ================= EMAIL ================= */}

            <div className="admin-login-field">
              <label htmlFor="admin-email">
                Email Address
              </label>

              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="Enter your email"
                autoComplete="email"
                required
              />
            </div>

            {/* ================= PASSWORD ================= */}

            <div className="admin-login-field">
              <label htmlFor="admin-password">
                Password
              </label>

              <div className="admin-password-wrapper">
                <input
                  id="admin-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="admin-password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (current) => !current
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>
              </div>
            </div>

            {/* =================================================
                            LOGIN BUTTON
            ================================================= */}

            <button
              type="submit"
              className="admin-login-submit"
            >
              <span>Sign In</span>

              <strong>
                <FaArrowRight />
              </strong>
            </button>
          </form>

          {/* =================================================
                                FOOTER
          ================================================= */}

          <div className="admin-login-footer">
            <span>
              Authorized administrators only
            </span>
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