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
import RatingForm from "./components/RatingForm"
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
          path="/course"
          element={<CourseList />}
        />
        <Route
          path="/course/:id"
          element={<SingleCourse />}
        />
        <Route
          path="/course/rating/new"
          element={<RatingForm />}
        />
      </Routes>
      <Footer />
    </>
  )
}

export default App
