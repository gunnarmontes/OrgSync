import NavBar from "../components/NavBar";
import MemberCard from "../components/MemberCard";
import membersController from "../controllers/memberController";

export default function Members() {
  const { members, loading, error } = membersController();

  return (
    <div className="min-h-screen bg-blue-900 text-gray-100">
      <header className="max-w-5xl mx-auto px-4 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold">Members</h1>
            <p className="text-sm opacity-75">Your organization members</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-300" />
        </div>
        <NavBar />
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-10 pt-6">
        {loading && <p className="opacity-80">Loading members…</p>}
        {error && <p className="text-red-300">{error}</p>}
        {!loading && !error && (
          members.length === 0 ? (
            <p className="opacity-80">No members found.</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((m) => (
                <MemberCard key={m.id} member={m} />
              ))}
            </div>
          )
        )}
      </main>
    </div>
  );
}
