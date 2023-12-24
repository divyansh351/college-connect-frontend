import React from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

const RatingCard = ({ stars, length }) => {
    const goldenStarStyle = { color: 'gold' };
    console.log(stars);
    console.log(length);
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>Criteria 1:</span>
                <span style={{ marginLeft: '8px' }}>{length ? stars[0] / length : 0}</span>
                <StarIcon style={{ ...goldenStarStyle, marginLeft: '4px' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>Criteria 2:</span>
                <span style={{ marginLeft: '8px' }}>{length ? stars[1] / length : 0}</span>
                <StarIcon style={{ ...goldenStarStyle, marginLeft: '4px' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>Criteria 3:</span>
                <span style={{ marginLeft: '8px' }}>{length ? stars[2] / length : 0}</span>
                <StarIcon style={{ ...goldenStarStyle, marginLeft: '4px' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>Criteria 4:</span>
                <span style={{ marginLeft: '8px' }}>{length ? stars[3] / length : 0}</span>
                <StarIcon style={{ ...goldenStarStyle, marginLeft: '4px' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>Criteria 5:</span>
                <span style={{ marginLeft: '8px' }}>{length ? stars[4] / length : 0}</span>
                <StarIcon style={{ ...goldenStarStyle, marginLeft: '4px' }} />
            </div>
        </div>
    );
};

export default RatingCard;
