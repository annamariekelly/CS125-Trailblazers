import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { fetchUser } from "../database/supabase";

import Dropdown from "../components/Dropdown.jsx";

import { TERRAIN_TYPES, INTENSITIES, TIMES } from "../constants.js";

// import { getRecList } from "../backend/recAlgorithm.js";

const HomePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { student_id } = location.state;
    const [terrainType, setTerrainType] = useState(0);
    const [intensity, setIntensity] = useState(0);
    const [time, setTime] = useState(TIMES[0]);
    
    useEffect(() => {
        fetchUser(student_id)
            .then(({data, error}) => {
                if (data) {
                    console.log('one user: ', data);
                } else {
                    console.log('fetch user error: ', error.message);
                }
            });

        // getRecList(student_id, '3641 Baylor Street, Irvine, CA', terrainType, time, intensity)
        //     .then((rec_list) => console.log(`Rec List: ${rec_list}`));
    }, []);

    const handleTerrainDropdownChange = (event) => {
        setTerrainType(event.target.value);
    }

    const handleIntensityDropdownChange = (event) => {
        setIntensity(event.target.value);
    }

    const handleTimeDropdownChange = (event) => {
        setTime(event.target.value);
    }

    return (
        <div>
            <h1>
                Home Page
            </h1>
            <p>
                Logged in user: {student_id}
            </p>
            <a href="/">
                <button>
                    Back
                </button>
            </a>
            <button onClick={() => navigate('/profile', { state: { student_id: student_id } })}>
                Profile
            </button>
            <div>
                <Dropdown label="Terrain:" items={TERRAIN_TYPES} handleChange={handleTerrainDropdownChange} isEnum/>
                <p>Terrain Type Chosen: {terrainType}</p>
            </div>
            <div>
                <Dropdown label="Intensity:" items={INTENSITIES} handleChange={handleIntensityDropdownChange} isEnum/>
                <p>Intensity Chosen: {intensity}</p>
            </div>
            <div>
                <Dropdown label="Time (min):" items={TIMES} handleChange={handleTimeDropdownChange} />
                <p>Time Chosen: {time}</p>
            </div>
        </div>
    );
};

export default HomePage;
