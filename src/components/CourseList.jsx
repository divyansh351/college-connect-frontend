import axios from "axios";
import { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import React from "react";
import backgroundImage from "../assets/bgimj2.jpg"; // Adjust the path accordingly

export default function CourseList() {
    const [courses, setcourses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://college-connect-backend-0x0i.onrender.com/course');
                setcourses(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    return (
        <React.Fragment>
            <div className="background-container" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: '600px', minHeight: '100vh', backgroundAttachment: 'fixed' }} />
            <div className="course-list-container">
                <div className="content-container">
                    {courses.map((course, index) => (
                        <CourseCard key={index} id={course._id} linkDisable={false} />
                    ))}
                </div>
                <style jsx="true">{`
                .course-list-container {
                    position: relative;
                }

                .background-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    object-fit: cover;
                    z-index: -1;
                }

                .content-container {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-around;
                    z-index: 1; /* Ensure content is above the background */
                }
            `}</style>
            </div>
        </React.Fragment>
    );
}
