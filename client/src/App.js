import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Admin from "./components/Admin";
import User from "./components/User";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/admin"
            element={<ProtectedRoute component={Admin} roles={["admin"]} />}
          />
          <Route
            path="/user"
            element={<ProtectedRoute component={User} roles={["user", "admin"]} />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
