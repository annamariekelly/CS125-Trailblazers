import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { fetchUser } from "../helpers/supabase";

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
        alert(`Student ID: ${studentId}; Password: ${password}`);

        fetchUser(studentId)
            .then(({data, error}) => {
                if (data) {
                    console.log('one user: ', data);

                    if (data.length === 0) { // ID doesn't exist in db
                        alert(`Login unsuccessful: No User with ID ${studentId} found!`);
                    }
                    else if (data[0].password === password) { // Login success (right password)
                        alert('Login successful!');
                        navigate('/home', { state: { student_id: studentId } });
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
        <form onSubmit={handleLoginSubmit}>
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
          <input type="submit" />
        </form>
    );
}

const LoginPage = () => {

    return (
        <div>
            <h1>
                Login Page
            </h1>
            <a href="/">
                <button>
                    Back
                </button>
            </a>
            {LoginForm()}
        </div>
    );
};

export default LoginPage;
