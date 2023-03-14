import React  from "react";

const TripCard = ({name, uRating, yRating, dist, img, url, street, city}) => {

    return (
        <div>
            <h1>
                {name}
            </h1>

            <h4>
                User Rating: {uRating ? uRating : 'no rating'}
                <br></br>
                Yelp Rating: {yRating}
                <br></br>
                {dist} miles?
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
