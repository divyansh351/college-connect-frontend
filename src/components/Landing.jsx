import { useNavigate } from "react-router-dom"
import AuthVerify from "../helper/JWTVerify";

export default function Landing() {
    const token = localStorage.getItem('token')
    const loggedIn = AuthVerify(token);
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/register')}>Register</button>
        </div>
    )
}