import React from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import Bottomwarning from "../components/Bottomwarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setusername] = useState("");
  const [firstName, setfirstname] = useState("");
  const [lastName, setlastname] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  async function signupbutton(e) {
    const response = await axios.post(
      "http://localhost:3011/api/v1/user/signup",
      {
        username,
        firstName,
        lastName,
        password,
      },
    );
    localStorage.setItem("token", response.data.token);
    alert("User created successfully");
    navigate("/signin");
    setfirstname("");
    setlastname("");
    setusername("");
    setpassword("");
    e.preventDefault();
  }
  return (
    <div className="flex h-screen justify-center bg-slate-300">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-slate-50 p-4 text-center">
          <Heading matter="Sign Up" />
          <SubHeading matter="Enter your information to create an account" />
          <InputBox
            onchange={(e) => {
              setfirstname(e.target.value);
            }}
            value={firstName}
            label="First Name"
            placeholder="ex: Sai"
          />
          <InputBox
            label="Last Name"
            onchange={(e) => {
              setlastname(e.target.value);
            }}
            value={lastName}
            placeholder="ex: Praneeth"
          />
          <InputBox
            label="Email"
            type="email"
            onchange={(e) => {
              setusername(e.target.value);
            }}
            value={username}
            placeholder="example@gmail.com"
          />
          <InputBox
            label="Password"
            onchange={(e) => {
              setpassword(e.target.value);
            }}
            value={password}
            placeholder="ex:123456"
          />
          <Button onclick={signupbutton} buttonname="Sign Up" />
          <Bottomwarning
            bottomwarning="Already have an Account?"
            link="signin"
            url="http://localhost:5173/signin"
          />
        </div>
      </div>
    </div>
  );
}
