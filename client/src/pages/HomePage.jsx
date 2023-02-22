import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { fetchUser } from "../helpers/supabase";

const HomePage = () => {
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
        </div>
    );
};

export default HomePage;
