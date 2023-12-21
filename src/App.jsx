import CssBaseline from "@mui/material/CssBaseline"
import RegisterForm from "./components/RegisterForm"
import LoginForm from "./components/LoginForm"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Profile from "./components/Profile"
import { Routes, Route } from 'react-router-dom'
import Landing from "./components/Landing"
import SingleCourse from "./components/SingleCourse"
import CourseList from "./components/CourseList"
function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Landing />}
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
          path="/SingleCourse"
          element={<SingleCourse id='6580959b5a9f0bb827be6078' />}
        />
        <Route
          path="/Courses"
          element={<CourseList />}
        />
      </Routes>
      <Footer />
    </>
  )
}

export default App
