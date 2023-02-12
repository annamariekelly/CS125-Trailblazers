// client/src/App.js
import React from "react";
import logo from "./logo.svg";
import "./App.css";

import {
  fetchAllUsers,
  fetchUser,
  createUser,
  updateUser,
  deleteUser,
  getAllTrips,
  getTrips,
  addTrip,
  updateTrip,
  deleteTrip,
} from "./helpers/supabase";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    // fetch("/api")
    //     .then((res) => res.json())
    //     .then((data) => setData(data.message));

    fetchAllUsers().then(({data, error}) => {
      if (data) {
        console.log('all users: ', data);
      } else {
        console.log('all users: ', data);
        console.log('fetch user error: ', error.message);
      }
    });

    fetchUser(7654321)
      .then(({data, error}) => {
        if (data) {
          console.log('one user: ', data);
          setData(data[0].student_id);
        } else {
          console.log('fetch user error: ', error.message);
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

    getAllTrips('Past').then(({data, error}) => {
        if (data) {
          console.log('get all past trips for all users: ', data);
        } else {
          console.log('get all past trips for all users error: ', error.message);
        }
      });

    getTrips('Past', 43798917).then(({data, error}) => {
        if (data) {
          console.log('get all past trips: ', data);
        } else {
          console.log('get all past trips error: ', error.message);
        }
      });

    addTrip('Past', 43798917, 2, 4)
      .then((err) => {
        if (err) {
          console.log('add past trip error: ', err.message);
        }
      });

    addTrip('Past', 43798917, 1, 4)
      .then((err) => {
        if (err) {
          console.log('add past trip error: ', err.message);
        }
      });

    updateTrip('Past', 43798917, 1, 3)
      .then((err) => {
        if (err) {
          console.log('update past trip error: ', err.message);
        }
      });

    deleteTrip('Past', 43798917, 1)
      .then((err) => {
        if (err) {
          console.log('delete past trip error: ', err.message);
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

