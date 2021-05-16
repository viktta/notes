import React from "react";
import Navbar from "./components/nav/index";
import "./styles/index.css";
import UserNotes from "./components/links/index";

function App() {
  const p = window.location.pathname === "/";

  return (
    <div>
      {p ? (
        <div>
          <Navbar />
          <UserNotes />
        </div>
      ) : (
        <Navbar />
      )}
    </div>
  );
}

export default App;
