import { useCallback, useEffect, useState } from "react";
import EventModel from "../models/EventModel";

/**
 * Controls Events data & IO for the Events page.
 * - Keeps tab ("planned" | "previous")
 * - Fetches events when tab changes
 * - Creates events and refreshes current view
 */
export default function eventsController() {
  const [tab, setTab] = useState("planned");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("");

  const fetchEvents = useCallback(async (scope = tab) => {
    setLoading(true);
    setError("")
    try {
      const data = await EventModel.list(scope);
      setEvents(Array.isArray(data) ? data : [])
    } catch (e) {
      setError("Failed to load events");
    } finally {
      setLoading(false)
    }
  }, [tab]);

  // fetch whenever tab changes
  useEffect(() => {
    fetchEvents(tab);
  }, [tab, fetchEvents]);

  const createEvent = useCallback(async (payload) => {
    const created = await EventApi.create(payload);
    await fetchEvents(tab);
    return created;
  }, [fetchEvents, tab]);

  return {
    // state
    tab,
    events,
    loading,
    error,

    // functions
    setTab,
    fetchEvents,
    createEvent
  };
}
