import React, { useEffect, useState }  from "react";

import { getTrips } from "../database/supabase";

// import { getBusinessInfo } from "../backend/yelp";

const Card = ({name, uRating, yRating, dist, img, url, street, city}) => {

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
            
            <img src={img} width='300px'/>
            
            <h4>
                {street}
                <br></br>
                {city}
                <br></br>
                <a href={url}>
                    Link Here
                </a>
            </h4>

        </div>
    );
}

const TripCard = ({student_id, page}) => {
    // const [trips, setTrips] = useState([]);
    const [businessInfoList, setbusinessInfoList] = useState([]);
    
    useEffect(() => {
        getTrips(page, student_id)
            .then(({data, error}) => {
                if (data) {
                    console.log('trips returned: ', data);
                    // setTrips(data); 

                    let trips = data;

                    let businessInfoUpdater = [];
                    for (let i = 0; i < Object.keys(trips).length; i++){
                        let trip = trips[i];
                        
                        // temporary dummy business info:
                        let businessInfo = {  // ACTUALLY CALL GET BUSINESS INFO FOR TRIP
                            id: '7z9LRl5rLzSc7I9nSYDnnA',
                            name: 'Cheesetella',
                            image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/f7ExT6WliNxZ2q0v-IuCOg/o.jpg',
                            street: '17655 Harvard Ave',
                            city: 'Irvine',
                            url: 'https://www.yelp.com/biz/cheesetella-irvine?adjust_creative=67rtU44aHwVN8WeBY1zCbg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=67rtU44aHwVN8WeBY1zCbg',
                            distance: 611.654965783868,
                            rating: 4,
                            userRating: trip.rating // MANUALLY ADDED
                        }

                        businessInfoUpdater.push(businessInfo);
                        console.log('updated bus info = ', businessInfoUpdater);  
                    }

                    // //////////////////// TEMP NON ASYNC DEMO
                    // let businessInfo = { 
                    //     id: '7z9LRl5rLzSc7I9nSYDnnA',
                    //     name: 'Cheesetella',
                    //     image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/f7ExT6WliNxZ2q0v-IuCOg/o.jpg',
                    //     street: '17655 Harvard Ave',
                    //     city: 'Irvine',
                    //     url: 'https://www.yelp.com/biz/cheesetella-irvine?adjust_creative=67rtU44aHwVN8WeBY1zCbg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=67rtU44aHwVN8WeBY1zCbg',
                    //     distance: 611.654965783868,
                    //     rating: 4,
                    // }

                    // businessInfo.uRating = 5; // trip.rating;
                    // businessInfoUpdater.push(businessInfo);
                    // ///////////////////////

                    setbusinessInfoList(businessInfoUpdater);
                



                } else {
                    console.log('fetch user error: ', error.message);
                }
            });
    }, []);



    // useEffect(() => {     
    //     console.log('trips useeffect ', trips);  
    //     let businessInfoUpdater = [];

    //     // for (let i = 0; i < trips.size; i++){
    //     //     let trip = trips[i];

    //     //     // temporary dummy business info:
    //     //     let businessInfo = [{  // ACTUALLY CALL GET BUSINESS INFO FOR TRIP
    //     //         id: '7z9LRl5rLzSc7I9nSYDnnA',
    //     //         name: 'Cheesetella',
    //     //         image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/f7ExT6WliNxZ2q0v-IuCOg/o.jpg',
    //     //         street: '17655 Harvard Ave',
    //     //         city: 'Irvine',
    //     //         url: 'https://www.yelp.com/biz/cheesetella-irvine?adjust_creative=67rtU44aHwVN8WeBY1zCbg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=67rtU44aHwVN8WeBY1zCbg',
    //     //         distance: 611.654965783868,
    //     //         rating: 4,
    //     //     }]

    //     //     businessInfo.uRating = trip.rating;
    //     //     businessInfoUpdater.push(businessInfo);
    //     //     console.log('updated bus info = ', businessInfoUpdater);  
    //     // }

    //     //////////////////// TEMP NON ASYNC DEMO
    //     let businessInfo = { 
    //         id: '7z9LRl5rLzSc7I9nSYDnnA',
    //         name: 'Cheesetella',
    //         image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/f7ExT6WliNxZ2q0v-IuCOg/o.jpg',
    //         street: '17655 Harvard Ave',
    //         city: 'Irvine',
    //         url: 'https://www.yelp.com/biz/cheesetella-irvine?adjust_creative=67rtU44aHwVN8WeBY1zCbg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=67rtU44aHwVN8WeBY1zCbg',
    //         distance: 611.654965783868,
    //         rating: 4,
    //     }

    //     businessInfo.uRating = 5; // trip.rating;
    //     businessInfoUpdater.push(businessInfo);
    //     businessInfoUpdater.push(businessInfo);
    //     ///////////////////////

    //     setbusinessInfoList(businessInfoUpdater);

    //     // getBusinessInfo('o6ziktvJIlqumDpggkS-dQ')
    //     //     .then(({data}) => {
    //     //         if (data) {
    //     //             console.log('business info: ', data);
    //     //         } else {
    //     //             console.log('fetch user error');
    //     //         }
    //     //     }); name, uRating, yRating, dist, img, url, street, city
        
    // }, []);

    return (
        <div>
            { 
            businessInfoList.map( (bI) => { return (
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
            } ) 
            }
        </div>
    );
};

export default TripCard;
