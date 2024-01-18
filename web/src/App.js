import "./Css/App.css";
import React from "react";
import Navbar from "./components/Navbar";
import SideBar from "./components/Body";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
      <div>
        <Navbar />
        <div style={{ marginTop: "63px" }}>
          <SideBar />
        </div>
      </div>
      </Router>
    </div>
  );
}

export default App;
