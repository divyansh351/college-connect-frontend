import React, { useState } from 'react';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
const RatingForm = ({ course_id }) => {
    const [formData, setformData] = useState({
        course_id: course_id,
        criteria1: 0,
        criteria2: 0,
        criteria3: 0,
        criteria4: 0,
        criteria5: 0
    })
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const handleChange = (evt) => {
        const fieldName = evt.target.name;
        const value = evt.target.value;
        setformData((currdata) => ({
            ...currdata,
            [fieldName]: value,
        }));
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        setLoading(true);
        setSuccess(false);
        setError(false);
        const token = localStorage.getItem('token');


        try {
            const response = await axios.post(
                `https://college-connect-backend-0x0i.onrender.com/rating/new`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )

            setLoading(false);
            if (response.data.message == 'succesfully rated') {
                setSuccess(true)
                window.location.reload();
            }
            else {
                setError(true);
                setErrorMessage(response.data.message)
                console.log(error);
            }
        } catch (err) {
            setLoading(false);
            setError(true);
            setErrorMessage(err.response.data.message)
        }
    };
    return (
        <div>
            <Box>
                <div style={{ display: 'block' }}>
                    <Typography component="legend">Criteria1: </Typography>
                    <Rating name='criteria1' value={formData.criteria1} onChange={handleChange} />
                </div>
                <div style={{ display: 'block' }}>
                    <Typography component="legend">Criteria2:  </Typography>
                    <Rating name='criteria2' value={formData.criteria2} onChange={handleChange} />
                </div>
                <div style={{ display: 'block' }}>
                    <Typography component="legend">Criteria3:  </Typography>
                    <Rating name='criteria3' value={formData.criteria3} onChange={handleChange} />
                </div>
                <div style={{ display: 'block' }}>
                    <Typography component="legend">Criteria4:  </Typography>
                    <Rating name='criteria4' value={formData.criteria4} onChange={handleChange} />
                </div>
                <div style={{ display: 'block' }}>
                    <Typography component="legend">Criteria5:  </Typography>
                    <Rating name='criteria5' value={formData.criteria5} onChange={handleChange} />
                </div>
                <button onClick={handleSubmit} variant="contained">Submit</button>

            </Box>
            {success ? <div>Rating Posted</div> : <></>}
            {error ? <div>{errorMessage}</div> : <></>}
            {loading ? <div>Rating</div> : <></>}
        </div>

    );
};

export default RatingForm;
