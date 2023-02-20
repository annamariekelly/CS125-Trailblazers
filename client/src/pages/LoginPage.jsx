import React, { useState } from "react";

const LoginForm = () => {
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        alert(`Student ID: ${studentId}; Password: ${password}`);
    };

    return (
        <form onSubmit={handleLoginSubmit}>
          <div>
            <label>Student ID:
                <input 
                type="text" 
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                />
            </label>
          </div>
          <div>
            <label>Password:
                <input 
                type="text" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </label>
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
