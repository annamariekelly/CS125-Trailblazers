import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import TripCard from "../../components/TripCard";

// import { fetchUser } from "../database/supabase";

const PastPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { student_id } = location.state;
    
    // useEffect(() => {
    //     fetchUser(student_id)
    //         .then(({data, error}) => {
    //             if (data) {
    //                 console.log('one user: ', data);
    //             } else {
    //                 console.log('fetch user error: ', error.message);
    //             }
    //         });
    // }, []);

    return (
        <div>
            <h1>
                Past Trips Page
            </h1>
            <p>
                Past Trips for user: {student_id}
            </p>
            <TripCard/>
            <TripCard/>
            <button onClick={() => navigate('/profile', { state: { student_id: student_id } })}>
                Back
            </button>
        </div>
    );
};

export default PastPage;
