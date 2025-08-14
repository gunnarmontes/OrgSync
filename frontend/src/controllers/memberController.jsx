import { useCallback, useEffect, useState } from "react";
import MemberModel from "../models/MemberModel";

/**
 * Controls Members data for page
 */
export default function membersController() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await MemberModel.list();
      setMembers(Array.isArray(data) ? data : []);
    } catch {
      setError("Failed to load members");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return {
    members,
    loading,
    error,
    fetchMembers,
    setMembers, 
  };
}
