import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createUser } from "../database/supabase";
import { TERRAIN_TYPES } from "../constants";

const SignUpForm = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [placeCategory, setPlaceCategory] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleShowPassword = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword);
    }

    const handleShowConfirmPassword = (event) => {
        event.preventDefault();
        setShowConfirmPassword(!showConfirmPassword);
    }

    const handleSignUpSubmit = (event) => {
        event.preventDefault();
        console.log(`Name: ${name}; Student ID: ${studentId}; Password: ${password}; Confirm Password: ${confirmPassword}; Place Category: ${placeCategory}`);

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        createUser(studentId, name, password, placeCategory)
            .then((err) => {
                if (err) {
                    console.log('create user error: ', err.message);

                    if (err.message === 'duplicate key value violates unique constraint "User_pkey"') {
                        alert(`Sign Up Unsuccessful: User with student id ${studentId} already exists!`)
                    }
                    else if (err.message.includes('invalid input syntax for type bigint')) {
                        alert('Sign Up Unsuccessful: Student ID must be a number!');
                    }
                    else {
                        alert(`Sign Up Unsuccessful (database error): ${err.message}`);
                    }
                } else {
                    alert('Sign Up Successful!');
                    navigate('/home', { state: { student_id: studentId } }); // Navigates to and passes the student id to the home page
                }
            });
    };

    return (
        <form onSubmit={handleSignUpSubmit}>
          <div>
            <label>Name:
                <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
          </div>
          <div>
            <label>Student ID:
                <input 
                    type="text" 
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    required
                />
            </label>
          </div>
          <div>
            <label>Password:
                <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <button onClick={handleShowPassword}>
                Show
            </button>
          </div>
          <div>
            <label>Confirm Password:
                <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </label>
            <button onClick={handleShowConfirmPassword}>
                Show
            </button>
          </div>
          <div>
            Terrain:
            {TERRAIN_TYPES.map((terrain_type) => 
                <label>
                    <input 
                        type="radio" 
                        value={terrain_type}
                        checked={placeCategory === terrain_type}
                        onChange={(e) => setPlaceCategory(e.target.value)}
                    />
                    {terrain_type}
                </label>
            )}
          </div>
          <input type="submit" />
        </form>
      );
};

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
