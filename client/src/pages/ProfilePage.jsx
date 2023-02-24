import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { fetchUser, updateUser } from "../helpers/supabase";

const ProfileInfo = (student_id) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [placeCategory, setPlaceCategory] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        fetchUser(student_id)
            .then(({data, error}) => {
                if (data) {
                    console.log('one user: ', data);
                    setName(data[0].name);
                    setPassword(data[0].password);
                    setPlaceCategory(data[0].place_category);
                } else {
                    console.log('fetch user error: ', error.message);
                }
            });
    }, []);

    const handleShowPassword = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword);
    }

    const updateTerrain = (event) => {
        event.preventDefault();
        console.log(`Updating Student ID: ${student_id} to ${placeCategory}`);
        
        updateUser(student_id, placeCategory)
            .then((err) => {
                if (err) {
                    console.log('update user error: ', err.message);
                }
            });
    };

    return (
        <form  onSubmit={updateTerrain}>
          <div>
            Name: {name}
          </div>
          <div>
            Student ID: {student_id}
          </div>
          
          <div>
            <label>Password:
                <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    disabled
                />
            </label>
            <button onClick={handleShowPassword}>
                Show
            </button>
          </div>
          
          <div>
            Terrain:
            <label>
                <input 
                    type="radio" 
                    value="Foodie Finds"
                    checked={placeCategory === "Foodie Finds"}
                    onChange={(e) => setPlaceCategory(e.target.value)}
                    required
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
          <input type="submit" value="Update Terrain"/>
        </form>
    );
}

const ProfilePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { student_id } = location.state;

    const navToHome = (event) => {
        event.preventDefault();
        navigate('/home', { state: { student_id: student_id } }); // Navigates to and passes the student id to the profile page
    };

    return (
        <div>
            <h1>
                Profile Page
            </h1>
            <button onClick={navToHome}>
                Back
            </button>

            {ProfileInfo(student_id)}

            <a href="/">
                <button>
                    Saved Trips - TBD
                </button>
            </a>
            <a href="/">
                <button>
                    Sign Out
                </button>
            </a>
        </div>
    );
};

export default ProfilePage;
