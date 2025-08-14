// src/layouts/AppLayout.jsx
import { Outlet, Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

export default function AppLayout() {
  return (
    <div>
      <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
        <LogoutButton />
      </nav>
      <Outlet />
    </div>
  );
}
