import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { fetchUser, getTrips } from "../../database/supabase";
import { getCurrentLocation } from "../../backend/currentLocation";

import Dropdown from "../../components/Dropdown.jsx";

import { TERRAIN_TYPES, RATINGS, INTENSITIES, TIMES } from "../../constants.js";

import TripCard from "../../components/TripCard";
import NavBar from "../../components/NavBar";

import "./HomePage.css";
import "../globalStyles.css";

const HomePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { student_id } = location.state;
    const [userPlaceCategoryEnum, setUserPlaceCategoryEnum] = useState(0);
    const [userLocation, setUserLocation] = useState('');
    const [filterRating, setFilterRating] = useState(0);
    const [intensity, setIntensity] = useState(0);
    const [time, setTime] = useState(TIMES[0]);
    const [pastTrips, setPastTrips] = useState([]);
    const [recTrips, setRecTrips] = useState([]);

    useEffect(() => {
        fetchUser(student_id)
            .then(({data, error}) => {
                if (data) {
                    console.log('one user: ', data);

                    const { place_category } = data[0];
                    console.log(`place cat: ${place_category}`);

                    const place_category_enum = TERRAIN_TYPES.findIndex((terrain_type) => place_category === terrain_type);
                    console.log(`place cat enum: ${place_category_enum}`);
                    setUserPlaceCategoryEnum(place_category_enum);

                    getCurrentLocation(student_id).then((userLocation) => {
                        console.log(`location: ${userLocation}`);
                        setUserLocation(userLocation);
                    });

                } else {
                    console.log('fetch user error: ', error.message);
                }
            });
    })
    
    useEffect(() => {
        getTrips('Past', student_id)
            .then(({data, error}) => {
                if (data) {
                    setPastTrips(data);
                    console.log('Past trips: ', data);
                } else {
                    console.log('get trips error: ', error.message);
                }
            });
        
        fetch('/recommendation', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                studentID: student_id,
                currentLocation: userLocation,
                terrainPreference: userPlaceCategoryEnum,
                maxTime: time,
                intensity,
            })
        })
        .then((response) => response.json())
        .then((rec_list) => {
            console.log(`Rec List`, rec_list);
            setRecTrips(rec_list.recList);
        });
    }, [intensity, time]);

    const handleFilterRatingDropdownChange = (event) => {
        setFilterRating(event.target.value);
    }

    const handleIntensityDropdownChange = (event) => {
        setIntensity(event.target.value);
    }

    const handleTimeDropdownChange = (event) => {
        setTime(event.target.value);
    }

    return (
        <div>
            <NavBar nav={() => navigate('/')}/>
            <div className="home-container">
                <h1>
                    Home Page
                </h1>
                <p>
                    Welcome User: {student_id}
                </p>
                <div>
                    <button onClick={() => navigate('/profile', { state: { student_id: student_id } })}>
                        Profile
                    </button>
                </div>
                <div className="home-filters">
                    <div>
                        <Dropdown label="Rating (>=):" items={RATINGS} handleChange={handleFilterRatingDropdownChange}/>
                        {/* <p>Rating Chosen: {filterRating}</p> */}
                    </div>
                    <div>
                        <Dropdown label="Intensity:" items={INTENSITIES} handleChange={handleIntensityDropdownChange} isEnum/>
                        {/* <p>Intensity Chosen: {intensity}</p> */}
                    </div>
                    <div>
                        <Dropdown label="Time (min):" items={TIMES} handleChange={handleTimeDropdownChange} />
                        {/* <p>Time Chosen: {time}</p> */}
                    </div>
                </div>
                {recTrips.length > 0 && recTrips
                    .filter(({rating}) => rating >= filterRating)
                    .map((business) => {
                        const { id, name, rating, distance, image_url, url, street, city } = business;

                        const found = pastTrips.find((trip) => trip.business_id === id);

                        return (
                            <TripCard
                                businessId={id}
                                studentId={student_id}
                                name={name}
                                uRating={found?.rating}
                                yRating={rating}
                                dist={distance}
                                img={image_url}
                                url={url}
                                street={street}
                                city={city}
                            />
                        );
                    })
                }
            </div>
        </div>
        
    );
};

export default HomePage;
