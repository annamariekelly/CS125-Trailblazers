// client/src/App.js
import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { fetchUser, createUser, updateUser, deleteUser } from "./helpers/supabase";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    // fetch("/api")
    //     .then((res) => res.json())
    //     .then((data) => setData(data.message));

    fetchUser(7654321)
        .then((data) => {
          if (data) {
            setData(data[0].student_id);
          } else {
            console.log('fetch user error: ', data.message);
          }
        });

    createUser(7654321, 'Anna password', 'gym')
        .then((err) => {
          if (err) {
            console.log('create user error: ', err.message);
          }
        });

    updateUser(7654321, 'park')
        .then((err) => {
          if (err) {
            console.log('update user error: ', err.message);
          }
        });

    deleteUser(7654321, 'park')
        .then((err) => {
          if (err) {
            console.log('delete user error: ', err.message);
          }
        });

  }, []);

  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{!data ? "Loading..." : data}</p>
          <button onClick={() => {
            fetchUser(7654321)
              .then((data) => {
                if (data) {
                  setData(data[0].student_id);
                } else {
                  console.log('fetch user error: ', data.message);
                }
              });
          }}>Create</button>
          <button>Read</button>
          <button>Update</button>
          <button>Delete</button>
        </header>
      </div>
  );
}

export default App;

