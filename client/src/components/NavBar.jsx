import React from "react";

import trailblazersLogo from '../trailblazers.png';

import "../pages/globalStyles.css";

const NavBar = ({ nav }) => {    

    return (
        <div className="navbar">
            <div className="navbar-content">
                <img className="navbar-logo" src={trailblazersLogo}/>
                <p className="navbar-title">Trailblazers</p>
                {/* <button> Back </button> */}
                {/* <a href={nav}>
                    <button className="white-button">
                        Back
                    </button>
                </a> */}
                <button className="white-button" onClick={nav}>
                        Back
                </button>
            </div>
        </div>
        
    );
};

export default NavBar;