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

            <p>
                {(dist * 0.000621371).toFixed(2)} miles away
            </p>

            <b>
                <div className="rating">
                    User Rating: {<Rating
                                name="simple-controlled"
                                value={userRating ? userRating : (uRating ? uRating : 0)}
                                onChange={handleUserRating}
                                precision={0.5}
                            />}
                </div>
                
                {/* <br></br> */}
                <div className="rating">
                    Yelp Rating: {<Rating
                                    name="read-only"
                                    value={yRating}
                                    precision={0.5}
                                    readOnly
                                />}
                </div>
                {/* <br></br> */}
            </b>
            
            <img className="card-img" src={img} alt={name}/>
            
            <p>
                {street}
                <br></br>
                {city}
            </p>
            <br></br>
            <a className="click-link" href={url} target='_blank' rel="noreferrer">
                <b>Click For More</b>
            </a>
        </div>
    );
}

export default TripCard;
