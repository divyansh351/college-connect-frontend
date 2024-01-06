import CssBaseline from "@mui/material/CssBaseline"
import RegisterForm from "./components/RegisterForm"
import LoginForm from "./components/LoginForm"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Profile from "./components/Profile"
import { Routes, Route } from 'react-router-dom'
import LandingPage from "./components/LandingPage"
import SingleCourse from "./components/SingleCourse"
import CourseList from "./components/CourseList"
function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route
          path="/"
          element={<LandingPage />}
        />
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
        <Route
          path="/course"
          element={<CourseList />}
        />
        <Route
          path="/course/:id"
          element={<SingleCourse />}
        />
      </Routes>
    </>
  )
}

export default App
