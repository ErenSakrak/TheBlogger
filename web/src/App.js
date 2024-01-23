import "./Css/App.css";
import React from "react";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";

function App() {
  return (
    <div style={{ marginTop: "63px" }}>
    <Router>
      <AuthProvider>
        <Navbar />
        <Body />
      </AuthProvider>
    </Router>
    </div>
  );
}

export default App;
