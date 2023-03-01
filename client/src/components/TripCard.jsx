import React from "react";

const TripCard = ({busId, rating}) => {

    return (
        <div>
            <h1>
                {busId}
            </h1>
            <h4>
                {rating}
            </h4>
        </div>
    );
};

export default TripCard;
