import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
// import Signup from './components/Signup'

import TotalUsers from './pages/TotalUsers'
import ClientPage from './pages/ClientPage'
import TotalClasses from './pages/TotalClasses'

const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Login/>} />
    {/* <Route path='/signup' element={<Signup/>} /> */}
    <Route path='/clients' element={<ClientPage/>} />
    <Route path='/clients/total-users' element={<TotalUsers/>} />
    <Route path='/clients/total-classes' element={<TotalClasses/>} />
   </Routes>
   </BrowserRouter>
  )
}

export default App