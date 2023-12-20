import React, { useState } from 'react';
import './Post.css';

const Post = ({ title, content, date, uploader, comments }) => {
    const [selectedComment, setSelectedComment] = useState(null);

    const handleCommentChange = (event) => {
        setSelectedComment(event.target.value);
    };

    return (
        <div className="post">
            <h3>{title}</h3>
            <p className="content">{content}</p>
            <p className="info">Uploader: {uploader}</p>
            <p className="info">Date: {date}</p>
            <div className="comments-section">
                <label htmlFor={`comments-dropdown-${date}`}></label>
                <div className="select-wrapper">
                    <select
                        id={`comments-dropdown-${date}`}
                        onChange={handleCommentChange}
                        value={selectedComment}
                        style={{ width: selectedComment ? `${selectedComment.length + 10}ch` : 'auto' }}
                    >
                        <option disabled selected value="">
                            View Comments
                        </option>
                        {comments.map((comment, index) => (
                            <option key={index} value={comment}>
                                {comment}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Post;
