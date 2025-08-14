export default function MemberCard({ member }) {
  const name = member?.name 
  const email = member?.email 
  const joinedAt = formatDate(member?.joined_at);

  return (
    <div className="bg-gray-700/60 text-gray-100 rounded p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{name}</h3>
        {member?.id != null && (
          <span className="text-xs opacity-75">#{member.id}</span>
        )}
      </div>

      <div className="mt-2 text-sm text-gray-300">
        <div>
          <span className="opacity-70">Email:</span> {email}
        </div>
        <div>
          <span className="opacity-70">Joined:</span> {joinedAt}
        </div>
      </div>
    </div>
  );
}

function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(); // e.g., 8/13/2025 
}
