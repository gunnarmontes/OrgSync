export default function EventCard({ event }) {
  return (
    <div className="bg-gray-700/60 text-gray-100 rounded p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{event.description}</h3>
        <span className="text-xs opacity-75">#{event.id}</span>
      </div>
      <div className="mt-2 text-sm text-gray-300">
        <div><span className="opacity-70">Date:</span> {event.date}</div>
        <div><span className="opacity-70">Time:</span> {event.time}</div>
        <div><span className="opacity-70">Location:</span> {event.location || "—"}</div>
      </div>
    </div>
  );
}
