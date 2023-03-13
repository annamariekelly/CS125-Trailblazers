import React from "react";
import "./StartPage.css";
import "../globalStyles.css";

import trailblazersLogo from '../../trailblazers.png';

const StartPage = () => {

    return (
        <div className="start-page-container">
            <h1>
                Trailblazers
            </h1>
            <p>
                Your Guide to Exploring on Foot
            </p>
            <img className="home-image" src={trailblazersLogo}/>
            <a href="/signup">
                <button className="gray-button">
                    Sign Up
                </button>
            </a>
            <a href="/login">
                <button className="gray-button">
                    Log In
                </button>
            </a>
        </div>
    );
};

export default StartPage;
