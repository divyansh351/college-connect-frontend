import { useEffect, useState } from "react";
import Post from "./Post";
import axios from 'axios';

const PostList = ({ id }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async (id) => {
            try {
                const response = await axios.get(`https://college-connect-backend-0x0i.onrender.com/course/${id}`);
                if (Array.isArray(response.data.associated_posts)) {
                    setPosts(response.data.associated_posts);
                } else {
                    setError("Invalid data structure: associated_posts is not an array.");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData(id);
    }, []);


    return (
        <div className="posts-list">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {posts.map((post, index) => (
                <Post key={index} {...post} />
            ))}
        </div>
    );
};

export default PostList;
