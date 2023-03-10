import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import TripCard from "../components/TripCard";

const PastPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { student_id } = location.state;

    return (
        <div>
            <h1>
                Past Trips Page
            </h1>
            <p>
                Past Trips for user: {student_id}
            </p>

            <TripCard student_id={student_id} page='Past'/>

            <button onClick={() => navigate('/profile', { state: { student_id: student_id } })}>
                Back
            </button>
        </div>
    );
};

export default PastPage;
