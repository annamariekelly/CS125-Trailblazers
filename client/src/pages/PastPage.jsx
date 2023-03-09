import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { getTrips } from "../database/supabase";
import TripCard from "../components/TripCard";

const PastPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { student_id } = location.state;
    
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        getTrips('Past', student_id)
            .then(({data, error}) => {
                if (data) {
                    console.log('trips returned: ', data);
                    setTrips(data);                    
                } else {
                    console.log('fetch user error: ', error.message);
                }
            });
    }, []);

    return (
        <div>
            <h1>
                Past Trips Page
            </h1>
            <p>
                Past Trips for user: {student_id}
            </p>

            <TripCard trips={trips}/>

            <button onClick={() => navigate('/profile', { state: { student_id: student_id } })}>
                Back
            </button>
        </div>
    );
};

export default PastPage;
