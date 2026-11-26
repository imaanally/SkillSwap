
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Marketplace from "./pages/Marketplace";
import Requests from "./pages/Requests";
import Sessions from "./pages/Sessions";
import MemberProfile from "./pages/MemberProfile";

import AppShell from "./components/AppShell";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected personal profile */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Other members' profiles */}
      <Route
        path="/members/:id"
        element={
          <ProtectedRoute>
            <MemberProfile />
          </ProtectedRoute>
        }
      />

      {/* Marketplace */}
      <Route
        path="/marketplace"
        element={
          <ProtectedRoute>
            <AppShell>
              <Marketplace />
            </AppShell>
          </ProtectedRoute>
        }
      />

      {/* Requests */}
      <Route
        path="/requests"
        element={
          <ProtectedRoute>
            <AppShell>
              <Requests />
            </AppShell>
          </ProtectedRoute>
        }
      />

      {/* Sessions */}
      <Route
        path="/sessions"
        element={
          <ProtectedRoute>
            <AppShell>
              <Sessions />
            </AppShell>
          </ProtectedRoute>
        }
      />

      {/* Default routes */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;

