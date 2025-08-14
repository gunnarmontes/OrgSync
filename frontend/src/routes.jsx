import { createBrowserRouter, Navigate } from "react-router-dom";

// layouts
import AuthLayout from "./Layouts/AuthLayout.jsx";
import AppLayout from "./Layouts/AppLayout.jsx";
// guards
import ProtectedRoute from "./Components/ProtectedRoute";

// pages
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Events from "./pages/Events.jsx";
import Members from "./pages/Members.jsx";
import QRCode from "./pages/QRCode.jsx";


const router = createBrowserRouter([
  // redirect root to login
  { path: "/", element: <Navigate to="/login" replace /> },

  // public/auth routes
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },

  // protected app routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />, // should render <NavBar /> and <Outlet />
        children: [
          { path: "/home", element: <Home /> },
          { path: "/events", element: <Events /> },
          { path: "/members", element: <Members /> },
          { path: "/qr", element: <QRCode /> },

        ],
      },
    ],
  },

  // 404
  { path: "*", element: <Navigate to="/home" replace /> },
]);

export default router;
