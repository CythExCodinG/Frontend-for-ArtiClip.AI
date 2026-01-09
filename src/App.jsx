import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/Landing'
import ProtectedRoute from './ProtectedRoute'
import Register from './pages/Register'
import Login from './pages/Login'
import Postgenerator from './pages/Postgenerator'
const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/postgenerator" element={<Postgenerator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App