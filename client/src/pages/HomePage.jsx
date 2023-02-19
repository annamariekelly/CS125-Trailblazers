import React from "react";

const HomePage = () => {

    return (
        <div>
            <h1>
                Home Page
            </h1>
            <a href="/signup">
                <button>
                    Sign Up
                </button>
            </a>
            <a href="/login">
                <button>
                    Log In
                </button>
            </a>
        </div>
    );
};

export default HomePage;
