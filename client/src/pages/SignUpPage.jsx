import React, { useState } from "react";

import { createUser } from "../helpers/supabase";

const SignUpForm = () => {
    const [name, setName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const [placeCategory, setPlaceCategory] = useState('');

    const handleSignUpSubmit = (event) => {
        event.preventDefault();
        alert(`Name: ${name}; Student ID: ${studentId}; Password: ${password}; Place Category: ${placeCategory}`);
        createUser(studentId, name, password, placeCategory)
            .then((err) => {
                if (err) {
                console.log('create user error: ', err.message);
                }
            });
    }

    return (
        <form onSubmit={handleSignUpSubmit}>
          <label>Name:
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>Student ID:
            <input 
              type="text" 
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
          </label>
          <label>Password:
            <input 
              type="text" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div>
            Terrain:
            <label>
                <input 
                type="radio" 
                value="Foodie Finds"
                checked={placeCategory === "Foodie Finds"}
                onChange={(e) => setPlaceCategory(e.target.value)}
                />
                Foodie Finds
            </label>
            <label>
                <input 
                type="radio" 
                value="Nature Navigators"
                checked={placeCategory === "Nature Navigators"}
                onChange={(e) => setPlaceCategory(e.target.value)}
                />
                Nature Navigators
            </label>
            <label>
                <input 
                type="radio" 
                value="Adventure Seekers"
                checked={placeCategory === "Adventure Seekers"}
                onChange={(e) => setPlaceCategory(e.target.value)}
                />
                Adventure Seekers
            </label>
            <label>
                <input 
                type="radio" 
                value="Metropolis Marvels"
                checked={placeCategory === "Metropolis Marvels"}
                onChange={(e) => setPlaceCategory(e.target.value)}
                />
                Metropolis Marvels
            </label>
          </div>
          <input type="submit" />
        </form>
      )
}

const SignUpPage = () => {

    return (
        <div>
            <h1>
                Sign Up Page
            </h1>
            <a href="/">
                <button>
                    Back
                </button>
            </a>
            {SignUpForm()}
        </div>
    );
};

export default SignUpPage;
