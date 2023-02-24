import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { fetchUser } from "../helpers/supabase";

const HomePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { student_id } = location.state;
    
    useEffect(() => {
        fetchUser(student_id)
            .then(({data, error}) => {
                if (data) {
                    console.log('one user: ', data);
                } else {
                    console.log('fetch user error: ', error.message);
                }
            });
    }, []);

    const navToProfile = (event) => {
        event.preventDefault();
        // console.log(`Student ID: ${student_id}`);
        navigate('/profile', { state: { student_id: student_id } }); // Navigates to and passes the student id to the profile page
    };

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
            <button onClick={navToProfile}>
                Profile
            </button>
        </div>
    );
};

export default HomePage;
