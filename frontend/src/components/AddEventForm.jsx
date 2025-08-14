// src/components/AddEventForm.jsx
import { useEffect, useState } from "react";

export default function AddEventForm({ open, onClose, onCreated }) {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");   // yyyy-mm-dd
  const [time, setTime] = useState("");   // HH:MM
  const [location, setLocation] = useState("");
  const [err, setErr] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose]);

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    if (!description || !date || !time) {
      setErr("Description, Date, and Time are required.");
      return;
    }
    setSubmitting(true);
    try {
      await onCreated({ description, date, time, location })
      setDescription(""); setDate(""); setTime(""); setLocation("");
      onClose();
    } catch {
      setErr("Failed to create event.")
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" aria-modal="true" role="dialog">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-gray-900 text-gray-100 w-full max-w-lg mx-4 rounded-md shadow-xl border border-blue-900 p-6">
        <button onClick={onClose} className="absolute left-3 top-3 text-gray-400 hover:text-gray-200" aria-label="Close" type="button">✕</button>
        <h2 className="text-center text-xl font-semibold mb-5">Add Event</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Description</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-full bg-gray-200 text-gray-900 px-4 py-2 outline-none"
              placeholder="Description"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                     className="w-full rounded-full bg-gray-200 text-gray-900 px-4 py-2 outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Time</label>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)}
                     className="w-full rounded-full bg-gray-200 text-gray-900 px-4 py-2 outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Location</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-full bg-gray-200 text-gray-900 px-4 py-2 outline-none"
              placeholder="Location"
            />
          </div>

          {err && <p className="text-red-300 text-sm">{err}</p>}

          <div className="flex justify-center pt-2">
            <button type="submit" disabled={submitting}
                    className="rounded bg-indigo-500 hover:bg-indigo-600 px-4 py-1 text-white disabled:opacity-60">
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
