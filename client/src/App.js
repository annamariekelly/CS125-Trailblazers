// client/src/App.js
import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { fetchUser } from "./helpers/supabase";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    // fetch("/api")
    //     .then((res) => res.json())
    //     .then((data) => setData(data.message));

    fetchUser(43798917)
        .then((data) => setData(data[0].student_id));
  }, []);

  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{!data ? "Loading..." : data}</p>
        </header>
      </div>
  );
}

export default App;

