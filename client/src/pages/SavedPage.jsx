import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { getTrips } from "../database/supabase";
import TripCard from "../components/TripCard";

const SavedPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { student_id } = location.state;

    const [trips, setTrips] = useState([]);

    

    // when calling addtrip do you return any data or let the post show in console
    // why console log twice

    useEffect(() => {
        getTrips('Saved', student_id)
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
                Saved Trips Page
            </h1>
            <p>
                Saved Trips for user: {student_id}
            </p>

            { trips.map( (trip) => { return (
                    <div>
                        <TripCard busId={trip.business_id} rating={trip.rating}/>
                    </div>
                );
            } ) }

            <button onClick={() => navigate('/profile', { state: { student_id: student_id } })}>
                Back
            </button>
        </div>
    );
};

export default SavedPage;
