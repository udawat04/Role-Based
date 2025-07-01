import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import SuperAdminDashboard from "./pages/super-admin-pages/SuperAdminDashboard";
import TotalClients from "./pages/super-admin-pages/TotalClients";
import TotalUsers from "./pages/super-admin-pages/TotalUsers";
import CreateClient from "./pages/super-admin-pages/CreateClient";
import ClientDashboard from "./pages/client-pages/ClientDashboard";
import ClientUsers from "./pages/client-pages/ClientUsers";
import CreateUser from "./pages/client-pages/CreateUser";
import UserDashboard from "./pages/user-pages/UserDashboard";
import SpecificClient from "./pages/super-admin-pages/SpecificClient";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Super Admin Routes */}
        <Route path="/super-admin" element={<SuperAdminDashboard />} />
        <Route path="/super-admin/total-clients" element={<TotalClients />} />
        <Route path="/super-admin/total-users" element={<TotalUsers />} />
        <Route path="/super-admin/create-client" element={<CreateClient />} />
        <Route path="/super-admin/specific-client/:id" element={<SpecificClient />} />

        {/* Client Routes */}
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/client/users" element={<ClientUsers />} />
        <Route path="/client/create-users" element={<CreateUser />} />

        {/* User Route */}
        <Route path="/users" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
