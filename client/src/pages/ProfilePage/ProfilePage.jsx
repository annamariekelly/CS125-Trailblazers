import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { fetchUser, updateUser } from "../../database/supabase";
import { TERRAIN_TYPES } from "../../constants";

import "./ProfilePage.css";
import "../globalStyles.css";

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
        alert(`Updating Student ID: ${student_id} to ${placeCategory}`);
        
        updateUser(student_id, placeCategory)
            .then((err) => {
                if (err) {
                    console.log('update user error: ', err.message);
                }
            });
    };

    return (
        <form onSubmit={updateTerrain} className="form-container" >
          <div>
            <label>Name:
                <input
                    type="text"
                    value={name}
                    disabled
                />
            </label>
          </div>
          <div>
            <label>Student ID:
                <input
                    type="text"
                    value={student_id}
                    disabled
                />
            </label>
          </div>
          
          <div>
            <label>Password:
                <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    disabled
                />
                <button onClick={handleShowPassword}>
                    Show
                </button>
            </label>
          </div>
          <div className="terrain-container">
            <span className="terrain-title">Terrain:</span>
            {TERRAIN_TYPES.map((terrain_type) => 
                <label className="terrain-label">
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
          <input type="submit" value="Update Terrain" className="gray-button submit-button"/>
        </form>
    );
}

const ProfilePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { student_id } = location.state;

    return (
        <div>
            <h1>
                Profile Page
            </h1>
            <button onClick={() => navigate('/home', { state: { student_id: student_id } })}>
                Back
            </button>

            {ProfileInfo(student_id)}

            <button onClick={() => navigate('/saved', { state: { student_id: student_id } })}>
                Saved Trips
            </button>
            <button onClick={() => navigate('/past', { state: { student_id: student_id } })}>
                Past Trips
            </button>
            <a href="/">
                <button>
                    Sign Out
                </button>
            </a>
        </div>
    );
};

export default ProfilePage;
