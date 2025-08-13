// src/components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

export default function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function refreshIfNeeded() {
      const access = localStorage.getItem(ACCESS_TOKEN);
      const refresh = localStorage.getItem(REFRESH_TOKEN);

      if (!access && !refresh) {
        if (mounted) {
          setIsAuthed(false);
          setLoading(false);
        }
        return;
      }

      
      if (refresh) {
        try {
          const { data } = await api.post("/orgs/token/refresh/", { refresh });
          localStorage.setItem(ACCESS_TOKEN, data.access);
          if (mounted) setIsAuthed(true);
        } catch {
          if (mounted) setIsAuthed(false);
        } finally {
          if (mounted) setLoading(false);
        }
      } else {
        if (mounted) {
          setIsAuthed(true);
          setLoading(false);
        }
      }
    }

    refreshIfNeeded();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (!isAuthed) return <Navigate to="/login" replace />;

  return <Outlet />;
}
