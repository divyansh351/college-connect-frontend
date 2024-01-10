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
import React from "react"
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
          element={
            <React.Fragment>
              <Navbar />
              <Profile />
            </React.Fragment>
          }
        />
        <Route
          path="/course"
          element={
            <React.Fragment>
              <Navbar />
              <CourseList />
            </React.Fragment>
          }
        />
        <Route
          path="/course/:id"
          element={
            <React.Fragment>
              <Navbar />
              <SingleCourse />
            </React.Fragment>
          }
        />
      </Routes>
    </>
  )
}

export default App
