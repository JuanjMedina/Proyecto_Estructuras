import './App.css'
import { Login } from './components/login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/authContext'
import { MainPage } from './components/principal'
import History from './History'
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<History />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
