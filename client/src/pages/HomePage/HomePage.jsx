import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { fetchUser } from "../../database/supabase";
import { getCurrentLocation } from "../../backend/currentLocation";

import Dropdown from "../../components/Dropdown.jsx";

import { TERRAIN_TYPES, INTENSITIES, TIMES } from "../../constants.js";

import TripCard from "../../components/TripCard";
import NavBar from "../../components/NavBar";

import { sampleRecList } from "../../backend/sampleRecList";

// import { getRecList } from "../../backend/recAlgorithm";

import "./HomePage.css";
import "../globalStyles.css";

const HomePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { student_id } = location.state;
    const [filterTerrainType, setFilterTerrainType] = useState(0);
    const [intensity, setIntensity] = useState(0);
    const [time, setTime] = useState(TIMES[0]);
    
    useEffect(() => {
        fetchUser(student_id)
            .then(({data, error}) => {
                if (data) {
                    console.log('one user: ', data);

                    const { place_category } = data[0];
                    console.log(`place cat: ${place_category}`);

                    const place_category_enum = TERRAIN_TYPES.findIndex((terrain_type) => place_category === terrain_type);
                    console.log(`place cat enum: ${place_category_enum}`);

                    const userLocation = getCurrentLocation(student_id);
                    console.log(`location: ${userLocation}`);

                    // getRecList(student_id, userLocation, place_category_enum, time, intensity)
                    //     .then((rec_list) => console.log(`Rec List`, rec_list));
                } else {
                    console.log('fetch user error: ', error.message);
                }
            });

        
    }, []);

    const handleTerrainDropdownChange = (event) => {
        setFilterTerrainType(event.target.value);
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
                        <Dropdown label="Terrain:" items={TERRAIN_TYPES} handleChange={handleTerrainDropdownChange} isEnum/>
                        {/* <p>Terrain Type Chosen: {filterTerrainType}</p> */}
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
                {sampleRecList.map((business) => {
                    const { name, rating, distance, image_url, url } = business;
                    const { address1, city, state } = business.location;

                    return (
                        <TripCard
                            name={name}
                            yRating={rating}
                            dist={distance}
                            img={image_url}
                            url={url}
                            street={address1}
                            city={city}
                            state={state}
                        />
                    )
                })}
            </div>
        </div>
        
    );
};

export default HomePage;
