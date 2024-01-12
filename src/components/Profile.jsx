import React, { useState, useEffect } from 'react';
import AuthVerify from '../helper/JWTVerify';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Profile.css'
import backgroundImage from "../assets/bgimj2.jpg";

export default function Profile() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
        setLoading(true);
        if (!AuthVerify(token)) navigate('/login');
        axios.get(`https://college-connect-backend-0x0i.onrender.com/user/view`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then((res) => {
                setUser(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.error(err)
                setError(true)
                setLoading(false)
                setErrorMessage(err.message)
            });
        //
    }, [])

    return (
        <React.Fragment>
            <div className="background-container" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: '600px', minHeight: '100vh' }} />
            {!user['user'] && <h1>Loading</h1>}
            {user['user'] &&
                <React.Fragment>
                    <div className='profile-up'>
                        <div className='photo'>
                            <img className="profile-pic" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGhmTe4FGFtGAgbIwVBxoD3FmED3E5EE99UGPItI0xnQ&s'></img>
                        </div>
                        <div className='personal-details'>
                            <h1 className='name'><strong>{user['user']['name']}</strong></h1>
                            <h5>Email: <strong>{user['user']['email']}</strong></h5>
                            <h5>Username: <strong>{user['user']['username']}</strong></h5>
                        </div>
                    </div>
                    <div className="courses">
                        <h2 className='main-head'>Saved Courses</h2>
                    </div>
                    <div className="courses">
                        <h2 className='main-head'>Courses Attended</h2>
                    </div>
                </React.Fragment>
            }
            {error && <p>{errorMessage}</p>}
        </React.Fragment>
    )
}