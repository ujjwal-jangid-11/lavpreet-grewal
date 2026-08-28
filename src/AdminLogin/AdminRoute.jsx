import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import Loader from "../Loader/Loader";

const ADMIN_SESSION_DURATION = 60 * 60 * 1000; // 1 hour

function AdminRoute({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let logoutTimer = null;

    const clearAdminTimer = () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
        logoutTimer = null;
      }
    };

    const logoutAdmin = async () => {
      clearAdminTimer();

      localStorage.removeItem(
        "adminSessionStartedAt"
      );

      await supabase.auth.signOut();

      if (mounted) {
        setSession(null);
      }

      window.location.replace("/");
    };

    const startSessionTimer = (currentSession) => {
      clearAdminTimer();

      if (!currentSession) {
        return;
      }

      /*
        The timestamp is created when the user successfully
        logs in. It is NOT based on Supabase's
        last_sign_in_at value.
      */
      let sessionStartedAt =
        localStorage.getItem(
          "adminSessionStartedAt"
        );

      if (!sessionStartedAt) {
        sessionStartedAt = String(Date.now());

        localStorage.setItem(
          "adminSessionStartedAt",
          sessionStartedAt
        );
      }

      const elapsedTime =
        Date.now() - Number(sessionStartedAt);

      const remainingTime =
        ADMIN_SESSION_DURATION - elapsedTime;

      if (remainingTime <= 0) {
        logoutAdmin();
        return;
      }

      logoutTimer = setTimeout(() => {
        logoutAdmin();
      }, remainingTime);
    };

    const initialize = async () => {
      try {
        const {
          data: { session: currentSession },
          error,
        } = await supabase.auth.getSession();

        if (!mounted) return;

        if (error) {
          console.error(
            "Admin session check failed:",
            error.message
          );

          setSession(null);
          setLoading(false);
          return;
        }

        setSession(currentSession);
        setLoading(false);

        if (currentSession) {
          startSessionTimer(currentSession);
        } else {
          localStorage.removeItem(
            "adminSessionStartedAt"
          );
        }
      } catch (error) {
        console.error(
          "Admin session initialization failed:",
          error
        );

        if (mounted) {
          setSession(null);
          setLoading(false);
        }
      }
    };

    initialize();

    /*
      IMPORTANT:
      Do NOT call getSession(), signOut(), etc. inside
      this auth-state callback.

      Supabase itself provides the new session here.
    */
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        if (!mounted) return;

        if (event === "SIGNED_OUT") {
          clearAdminTimer();

          localStorage.removeItem(
            "adminSessionStartedAt"
          );

          setSession(null);
          return;
        }

        if (currentSession) {
          setSession(currentSession);
          startSessionTimer(currentSession);
        } else {
          clearAdminTimer();
          setSession(null);
        }
      }
    );

    return () => {
      mounted = false;

      clearAdminTimer();

      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!session) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;