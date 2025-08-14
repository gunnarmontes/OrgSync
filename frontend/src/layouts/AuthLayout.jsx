import { Outlet } from "react-router-dom";

/**
 * 
  *AppLayout component that serves as the main layout for the application.
 */
export default function AuthLayout() {
  return (
    <div style={{ padding: "2rem" }}>
      <Outlet />
    </div>
  );
}
