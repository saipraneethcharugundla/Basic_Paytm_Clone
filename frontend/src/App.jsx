import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Moneytransfer from "./pages/Moneytransfer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/moneytransfer" element={<Moneytransfer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
