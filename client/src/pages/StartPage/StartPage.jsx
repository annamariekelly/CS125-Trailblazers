import React from "react";

const StartPage = () => {

    return (
        <div>
            <h1>
                Start Page
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

export default StartPage;
