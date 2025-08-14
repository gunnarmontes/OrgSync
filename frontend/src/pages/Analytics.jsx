import NavBar from "../components/NavBar";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import AnimatedMembersBars from "../components/AnimatedMembersBars";

export default function Analytics() {
  // ----- SAMPLE DATA (no controller/model) -----
  const newslettersObj = { january: 10, february: 5, march: 12 };
  const membersObj     = { january: 40, february: 7, march: 77, april: 20 };

  // Recharts graph
  const newslettersData = Object.entries(newslettersObj).map(([k, v]) => ({
    name: k,
    value: v,
  }));
  const membersData = Object.entries(membersObj).map(([k, v]) => ({
    name: k,
    value: v,
  }));

  return (
    <div className="min-h-screen bg-blue-900 text-gray-100">
      <header className="max-w-5xl mx-auto px-4 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold">Analytics</h1>
            <p className="text-sm opacity-75">Sample data visualizations</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-300" />
        </div>
        <NavBar />
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-10 pt-6 space-y-10">
        {/* Recharts: Newsletters sent */}
        <section className="bg-gray-900 rounded-md shadow p-4 border border-blue-900">
          <h2 className="text-lg font-semibold mb-4">Newsletters Sent (by Month)</h2>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={newslettersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#111827", border: "1px solid #374151", color: "#e5e7eb" }} />
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* D3: Animated new members */}
        <section className="bg-gray-900 rounded-md shadow p-4 border border-blue-900">
          <h2 className="text-lg font-semibold mb-4">New Members (Animated)</h2>
          <AnimatedMembersBars data={membersData} />
        </section>
      </main>
    </div>
  );
}

