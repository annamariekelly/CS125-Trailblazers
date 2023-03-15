import React, { useState } from "react";
import Rating from '@mui/material/Rating';

import './TripCard.css';

import { updateTrip } from "../database/supabase";

const TripCard = ({studentId, businessId, name, uRating, yRating, dist, img, url, street, city}) => {
    const [userRating, setUserRating] = useState(uRating ? uRating : 0);

    const handleUserRating = (_, newValue) => {
       if (!newValue) {
        return;
       }

        setUserRating(newValue);

        updateTrip('Past', studentId, businessId, name, newValue)
            .then((err) => {
                if (err) {
                    console.log('update past trip error: ', err.message);
                }
            }
        );
    }

    return (
        <div className="trip-card-container">
            <h2>
                {name}
            </h2>

            <h3>
                {(dist * 0.000621371).toFixed(2)} miles away
            </h3>

            <h4>
                User Rating: {<Rating
                                name="simple-controlled"
                                value={userRating ? userRating : (uRating ? uRating : 0)}
                                onChange={handleUserRating}
                                precision={0.5}
                            />}
                <br></br>
                Yelp Rating: {<Rating
                                name="read-only"
                                value={yRating}
                                precision={0.5}
                                readOnly
                            />}
                <br></br>
            </h4>
            
            <img src={img} width='300px' alt={name}/>
            
            <h4>
                {street}
                <br></br>
                {city}
                <br></br>
                <a href={url} target='_blank' rel="noreferrer">
                    Link Here
                </a>
            </h4>

        </div>
    );
}

export default TripCard;
