import CssBaseline from "@mui/material/CssBaseline"
import RegisterForm from "./components/RegisterForm"
import LoginForm from "./components/LoginForm"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Profile from "./components/Profile"
import AuthVerify from "./helper/JWTVerify"
import { Routes, Route } from 'react-router-dom'
import { useNavigate } from "react-router-dom"


function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route
          path="/login"
          element={<LoginForm />}
        />
        <Route
          path="/register"
          element={<RegisterForm />}
        />
        <Route
          path="/profile"
          element={<Profile />}
        />
      </Routes>
      <Footer />
    </>
  )
}

export default App
