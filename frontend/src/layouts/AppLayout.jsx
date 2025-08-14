import { Outlet, Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

/**
 * 
  * AppLayout component that serves as the main layout for the application.
 */
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
