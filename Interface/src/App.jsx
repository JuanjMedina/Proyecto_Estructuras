import { useEffect, useState } from 'react'
import './App.css'
import { Login } from './components/login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/authContext'
import { MainPage } from './components/main'
function App() {
  

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
