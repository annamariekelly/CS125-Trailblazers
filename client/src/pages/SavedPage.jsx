import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import TripCard from "../components/TripCard";

const SavedPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { student_id } = location.state;

    return (
        <div>
            <h1>
                Saved Trips Page
            </h1>
            <p>
                Saved Trips for user: {student_id}
            </p>

            <TripCard student_id={student_id} page='Saved'/>

            <button onClick={() => navigate('/profile', { state: { student_id: student_id } })}>
                Back
            </button>
        </div>
    );
};

export default SavedPage;
