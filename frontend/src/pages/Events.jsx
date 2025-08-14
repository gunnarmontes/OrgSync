// src/pages/Events.jsx
import { useState } from "react";
import NavBar from "../components/NavBar";
import EventCard from "../components/EventCard";
import AddEventForm from "../components/AddEventForm";
import eventsController from "../controllers/eventsController";

export default function Events() {
  const {
    tab, setTab,
    events, loading, error,
    fetchEvents, createEvent, // createEvent refetches current tab in the controller
  } = eventsController();

  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="min-h-screen bg-blue-900 text-gray-100">
      <header className="max-w-5xl mx-auto px-4 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold">Events</h1>
            <p className="text-sm opacity-75">
              {tab === "planned" ? "Upcoming planned events" : "Previous events"}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-300" />
        </div>
        <NavBar />
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-10 pt-6">
        <div className="flex gap-3 mb-5">
          <button
            type="button"
            onClick={() => setTab("planned")}
            className={`px-3 py-1 rounded ${tab === "planned" ? "bg-blue-600" : "bg-gray-700"}`}
          >
            Planned
          </button>
          <button
            type="button"
            onClick={() => setTab("previous")}
            className={`px-3 py-1 rounded ${tab === "previous" ? "bg-blue-600" : "bg-gray-700"}`}
          >
            Previous
          </button>

          <div className="flex-1" />
          <button
            type="button"
            onClick={() => setShowAdd(true)}
            className="px-4 py-2 rounded bg-blue-800 hover:bg-blue-700"
          >
            Add Event
          </button>
        </div>

        {loading && <p className="opacity-80">Loading events…</p>}
        {error && <p className="text-red-300">{error}</p>}
        {!loading && !error && (
          events.length === 0 ? (
            <p className="opacity-80">No events.</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {events.map(ev => <EventCard key={ev.id} event={ev} />)}
            </div>
          )
        )}
      </main>

      <AddEventForm
        open={showAdd}
        onClose={() => setShowAdd(false)}
        onCreated={createEvent}   
      />
    </div>
  );
}
