import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "./Layouts/AppLayout.jsx";
import AuthLayout from "./Layouts/AuthLayout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> }
    ]
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "/home", element: <Home /> },
        ]
      }
    ]
  }
]);

export default router;
