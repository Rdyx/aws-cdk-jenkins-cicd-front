import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import PingURL from "./PingURL/PingURL";
import CheckURL from "./CheckURL/CheckURL";

function App() {
  return (
    <>
      <Navbar />
      <div className="flex p-5 justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ping-url" element={<PingURL />} />
          <Route path="/check-url" element={<CheckURL />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
