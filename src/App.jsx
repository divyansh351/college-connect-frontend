import CssBaseline from "@mui/material/CssBaseline"
import RegisterForm from "./components/RegisterForm"
import LoginForm from "./components/LoginForm"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <RegisterForm />
      <LoginForm />
      <Footer />
    </>
  )
}

export default App
