import axios from "axios";
import { useState, useEffect } from "react";
import CourseCard from "./CourseCard";

export default function CourseList() {
    const [courses, setcourses] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://college-connect-backend-0x0i.onrender.com/course');
                console.log(res.data);
                setcourses(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);
    console.log(courses);
    return (
        <div className="course-list-container">
            {courses.map((course, index) => (
                <CourseCard key={index} id={course._id} />
            ))}
            <style jsx>{`
            .course-list-container {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                margin: 20px; /* Adjust margin as needed */
            }
        `}</style>
        </div>
    );
}