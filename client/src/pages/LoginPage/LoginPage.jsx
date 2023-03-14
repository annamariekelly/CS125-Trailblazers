import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { fetchUser } from "../../database/supabase";

import "./LoginPage.css";
import "../globalStyles.css";
import NavBar from "../../components/NavBar";

const LoginForm = () => {
    const navigate = useNavigate(); // Used to explicitly navigate to routes/pages

    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword);
    }

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        console.log(`Student ID: ${studentId}; Password: ${password}`);

        fetchUser(studentId)
            .then(({data, error}) => {
                if (data) {
                    console.log('one user: ', data);

                    if (data.length === 0) { // ID doesn't exist in db
                        alert(`Login unsuccessful: No User with ID ${studentId} found!`);
                    }
                    else if (data[0].password === password) { // Login success (right password)
                        alert('Login successful!');
                        navigate('/home', { state: { student_id: studentId } }); // Navigates to and passes the student id to the home page
                    }
                    else { // Wrong password
                        alert('Login unsuccessful: Wrong Password!');
                    }
                } else { // Catches any db error
                    console.log(`fetch user error: ${error.message}`);
                    alert(`Login unsuccessful (database error): ${error.message}`);
                }
            });
    };

    return (
        <form onSubmit={handleLoginSubmit} className="form-container">
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
                <div className="label-password">
                    <input 
                        className="password"
                        type={showPassword ? "text" : "password"} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button onClick={handleShowPassword} className="show-password">
                        Show
                    </button>
                </div>
            </label>
          </div>
          <input type="submit" className="gray-button" />
        </form>
    );
}

const LoginPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <NavBar nav={() => navigate('/')}/>
            <div className="form-page-container">
                <h1>
                    Log In
                </h1>
                {LoginForm()} 
            </div>
        </div>
    );
};

export default LoginPage;
