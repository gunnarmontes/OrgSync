import { NavLink } from "react-router-dom";

export default function AppNav() {
  const base =
    "px-3 py-2 rounded bg-blue-800 text-white hover:bg-blue-700 text-sm";
  const active =
    "px-3 py-2 rounded bg-blue-600 text-white text-sm";

  return (
    <nav className="flex items-center gap-3">
      <NavLink to="/home" className={({ isActive }) => (isActive ? active : base)}>
        Home
      </NavLink>
      <NavLink to="/events" className={({ isActive }) => (isActive ? active : base)}>
        Events
      </NavLink>
      <NavLink to="/qr" className={({ isActive }) => (isActive ? active : base)}>
        QR Code
      </NavLink>

      <NavLink to="/members" className={({ isActive }) => (isActive ? active : base)}>
        Members
      </NavLink>
      <button className={base} type="button">Analytics</button>
      <button className={base} type="button">Settings</button>
    </nav>
  );
}
