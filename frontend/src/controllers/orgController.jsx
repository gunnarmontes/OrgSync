// src/controllers/orgController.js
import { useState, useCallback } from "react";
import OrgModel from "../models/OrgModel";

export default function orgController() {
  const [org, setOrg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await OrgModel.getMe();
      setOrg(data);
    } catch (err) {
      setError("Failed to load organization");
      setOrg(null);
    } finally {
      setLoading(false);
    }
  }, []);

  

  return {
    org,
    loading,
    error,

    load
  };
}
