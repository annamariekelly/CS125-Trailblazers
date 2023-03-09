import React, { useEffect, useState }  from "react";

// import { getBusinessInfo } from "../backend/yelp";

const Card = ({name, uRating, yRating, dist, img, url, street, city}) => {

    return (
        <div>
            <h1>
                {name}
            </h1>

            <h4>
                {uRating ? uRating : 'no rating'}
            </h4>
            <h4>
                {yRating}
            </h4>

            <h4>
                {dist}
            </h4>

            <a href={url}>
                Link Here
            </a>
            
            <h4>
                {street}
            </h4>
            <h4>
                {city}
            </h4>

            <img src={img}/>

        </div>
    );
}

const TripCard = ({trips}) => {
    const [businessInfo, setbusinessInfo] = useState([]);

    useEffect(() => {
        console.log('useeffect trips: ', trips);
        
        let sampleBusinessInfo = [{
            id: '7z9LRl5rLzSc7I9nSYDnnA',
            name: 'Cheesetella',
            image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/f7ExT6WliNxZ2q0v-IuCOg/o.jpg',
            street: '17655 Harvard Ave',
            city: 'Irvine',
            url: 'https://www.yelp.com/biz/cheesetella-irvine?adjust_creative=67rtU44aHwVN8WeBY1zCbg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=67rtU44aHwVN8WeBY1zCbg',
            distance: 611.654965783868,
            rating: 4,
            userRating: 3 // ADD IN MANUALLYYYYYYYYYYYYYYYYYYY
        }]
        // for every trip in trips
            // get business info
            // add to businessInfo obj ADD IN USER RATING
        
        setbusinessInfo(sampleBusinessInfo);

        // getBusinessInfo('o6ziktvJIlqumDpggkS-dQ')
        //     .then(({data}) => {
        //         if (data) {
        //             console.log('business info: ', data);
        //         } else {
        //             console.log('fetch user error');
        //         }
        //     }); name, uRating, yRating, dist, img, url, street, city

    }, []);

    return (
        <div>
            { businessInfo.map( (bI) => { return (
                    <div>
                        <Card   name={bI.name} 
                                uRating={bI.userRating} 
                                yRating={bI.rating}
                                dist={bI.distance} 
                                img={bI.image_url}
                                url={bI.url} 
                                street={bI.street} 
                                city={bI.city}/>
                    </div>
                );
            } ) }
        </div>
    );
};

export default TripCard;
