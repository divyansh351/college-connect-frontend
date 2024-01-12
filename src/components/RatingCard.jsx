import React from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

const RatingCard = ({ stars, length }) => {
    const goldenStarStyle = { color: '#faaf00' };
    return (
        <div>
            <div className='category-rating'>
                <div style={{ display: 'block', alignItems: 'center' }}>
                    <div>Criteria 1:<span style={{ marginLeft: '8px' }}>{length ? stars[0] / length : 0}</span></div>
                    <StarIcon style={{ ...goldenStarStyle, marginLeft: '4px' }} />
                    <StarIcon style={{ ...goldenStarStyle, marginLeft: '4px' }} />
                    <StarIcon style={{ ...goldenStarStyle, marginLeft: '4px' }} />
                    <StarIcon style={{ ...goldenStarStyle, marginLeft: '4px' }} />
                    <StarIcon style={{ ...goldenStarStyle, marginLeft: '4px' }} />
                </div>
            </div>
            <div className='category-rating'>
                <div style={{ display: 'block', alignItems: 'center' }}>
                    <div>Criteria 2: <span style={{ marginLeft: '8px' }}>{length ? stars[1] / length : 0}</span></div>
                    <StarIcon style={{ ...goldenStarStyle, marginLeft: '4px' }} />
                    <StarIcon style={{ ...goldenStarStyle, marginLeft: '4px' }} />
                    <StarIcon style={{ ...goldenStarStyle, marginLeft: '4px' }} />
                    <StarIcon style={{ ...goldenStarStyle, marginLeft: '4px' }} />
                    <StarIcon style={{ ...goldenStarStyle, marginLeft: '4px' }} />
                </div>
            </div>
            <div className='category-rating'>
                <div style={{ display: 'block', alignItems: 'center' }}>
                    <div>Criteria 3: <span style={{ marginLeft: '8px' }}>{length ? stars[2] / length : 0}</span></div>
                    <StarIcon style={{ ...goldenStarStyle, marginLeft: '4px' }} />
                    <StarIcon style={{ ...goldenStarStyle, marginLeft: '4px' }} />
                    <StarIcon style={{ ...goldenStarStyle, marginLeft: '4px' }} />
                    <StarIcon style={{ ...goldenStarStyle, marginLeft: '4px' }} />
                    <StarIcon style={{ ...goldenStarStyle, marginLeft: '4px' }} />
                </div>
            </div>
            <div className='category-rating'>
                <div style={{ display: 'block', alignItems: 'center' }}>
                    <div>Criteria 4: <span style={{ marginLeft: '8px' }}>{length ? stars[3] / length : 0}</span></div>
                    <StarIcon style={{ ...goldenStarStyle, marginLeft: '4px' }} />
                    <StarIcon style={{ ...goldenStarStyle, marginLeft: '4px' }} />
                    <StarIcon style={{ ...goldenStarStyle, marginLeft: '4px' }} />
                    <StarIcon style={{ ...goldenStarStyle, marginLeft: '4px' }} />
                    <StarIcon style={{ ...goldenStarStyle, marginLeft: '4px' }} />
                </div>
            </div>
            <div className='category-rating'>
                <div style={{ display: 'block', alignItems: 'center' }}>
                    <div>Criteria 5: <span style={{ marginLeft: '8px' }}>{length ? stars[4] / length : 0}</span></div>
                    <StarIcon style={{ ...goldenStarStyle, marginLeft: '4px' }} />
                    <StarIcon style={{ ...goldenStarStyle, marginLeft: '4px' }} />
                    <StarIcon style={{ ...goldenStarStyle, marginLeft: '4px' }} />
                    <StarIcon style={{ ...goldenStarStyle, marginLeft: '4px' }} />
                    <StarIcon style={{ ...goldenStarStyle, marginLeft: '4px' }} />
                </div>
            </div>
        </div>
    );
};

export default RatingCard;
