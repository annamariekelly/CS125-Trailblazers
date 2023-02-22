import React, { useEffect } from "react";
import PropTypes from 'prop-types';

import { fetchUser } from "../helpers/supabase";

const HomePage = ({ student_id }) => {
    
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
            <a href="/">
                <button>
                    Back
                </button>
            </a>
        </div>
    );
};

HomePage.defaultProps = {
    student_id: 0,
};

HomePage.propTypes = {
    student_id: PropTypes.number,
};

export default HomePage;
