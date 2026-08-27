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
    let logoutTimer;

    const logoutAdmin = async () => {
      await supabase.auth.signOut();

      if (mounted) {
        setSession(null);
      }
    };

    const startSessionTimer = (currentSession) => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }

      if (!currentSession) {
        return;
      }

      const loginTime = currentSession.user?.last_sign_in_at
        ? new Date(currentSession.user.last_sign_in_at).getTime()
        : Date.now();

      const elapsedTime = Date.now() - loginTime;
      const remainingTime = ADMIN_SESSION_DURATION - elapsedTime;

      if (remainingTime <= 0) {
        logoutAdmin();
        return;
      }

      logoutTimer = setTimeout(() => {
        logoutAdmin();
      }, remainingTime);
    };

    const getSession = async () => {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      setSession(currentSession);
      setLoading(false);

      if (currentSession) {
        startSessionTimer(currentSession);
      }
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (!mounted) return;

      setSession(currentSession);

      if (currentSession) {
        startSessionTimer(currentSession);
      } else {
        if (logoutTimer) {
          clearTimeout(logoutTimer);
        }
      }
    });

    return () => {
      mounted = false;

      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }

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
