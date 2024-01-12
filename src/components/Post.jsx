import React, { useEffect, useState } from 'react';
import './Post.css';
import axios from 'axios';
import CommentForm from './CommentForm';
import moment from 'moment';

const Post = ({ _id, title, content, date, uploader }) => {
    const [comments, setComments] = useState([]);
    const [viewComment, setViewComment] = useState(false);
    const [viewCommentForm, setViewCommentForm] = useState(false);
    const [uploaderName, setUploaderName] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const dt = moment(date).format('DD-MM-YYYY');

    useEffect(() => {
        const fetchUploader = async (id) => {
            try {
                const response = await axios.get(`https://college-connect-backend-0x0i.onrender.com/user/${id}/get_name`)
                setUploaderName(response.data.name);
            }
            catch (err) {
                setError(true);
                setErrorMessage(err.message);
            }
        };
        fetchUploader(uploader)
    }, [])
    const handleViewComment = async (evt) => {
        evt.preventDefault();
        setLoading(true);
        setSuccess(false);
        setError(false);
        try {
            if (!comments.length) {
                const response = await axios.get(
                    `https://college-connect-backend-0x0i.onrender.com/post/${_id}/comments`,
                )
                setComments(response.data);
            }
            setViewComment(true);
            setLoading(false);
        }
        catch (err) {
            console.log(err);
        }
    }
    const handleViewCommentForm = () => setViewCommentForm(!viewCommentForm);
    const handleCollapse = () => setViewComment(false);

    return (
        <div className="post">
            <h3 className='post-title'>{title}</h3>
            <p className="content">{content}</p>
            {/*<p className="info">By: {uploaderName}</p>*/}
            <p className="info">On: {dt}</p>
            <button onClick={() => setViewCommentForm(!viewCommentForm)}>
                {viewCommentForm ? 'Close' : 'Add a Comment'}
            </button>
            <div className={`slide-down${viewCommentForm ? ' open' : ''}`}>
                <CommentForm post_id={_id} />
            </div>
            {
                viewComment ? <>
                    <button onClick={handleCollapse}>Collapse</button>
                    {comments.length ?
                        comments.map((comment, index) => (
                            <p key={index}>{comment.content}</p>
                        ))
                        : <p>Nothing To Show :)</p>}

                </> : <button onClick={handleViewComment}>Comments</button>
            }
        </div>
    );
};

export default Post;
