import axios from "axios";
import { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import backgroundImage from "../assets/bgimg.svg"; // Adjust the path accordingly

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
        <div className="course-list-container">
            <div className="background-container" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh', opacity: 0.5 }} />
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
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: -1;
                }

                .content-container {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-around;
                    margin: 20px; /* Adjust margin as needed */
                    z-index: 1; /* Ensure content is above the background */
                }
            `}</style>
        </div>
    );
}
