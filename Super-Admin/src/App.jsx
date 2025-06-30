import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import SuperAdmin from './pages/SuperAdmin'
import TotalClients from './pages/TotalClients'
import TotalUsers from './pages/TotalUsers'
import CreateClient from './pages/CreateClient'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/super-admin" element={<SuperAdmin />} />
        <Route path="/super-admin/total-clients" element={<TotalClients />} />
        <Route path="/super-admin/total-users" element={<TotalUsers />} />
        <Route path="/super-admin/create-client" element={<CreateClient />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App