import React from "react";

// import { getBusinessInfo } from "../backend/yelp";

const TripCard = ({busId, rating}) => {



    return (
        <div>
            <h1>
                {busId}
            </h1>
            <h4>
                {rating ? rating : 'no rating'}
            </h4>
        </div>
    );
};

export default TripCard;
