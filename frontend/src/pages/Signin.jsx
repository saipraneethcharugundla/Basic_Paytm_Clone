import React from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import Bottomwarning from "../components/Bottomwarning";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function Signin() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  async function signinbutton(e) {
    const response = await axios.post(
      "http://localhost:3011/api/v1/user/signin",
      {
        username,
        password,
      },
    );
    localStorage.setItem("token", response.data.token);
    alert("Logged in successfully");
    navigate("/dashboard");
    setusername("");
    setpassword("");
    e.preventDefault();
  }
  return (
    <div className="flex h-screen justify-center bg-slate-300">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-slate-50 p-4 text-center">
          <Heading matter="Sign In" />
          <SubHeading matter="Enter your credentials to access your account" />
          <InputBox
            label="Email"
            type="email"
            value={username}
            placeholder="example@gmail.com"
            onchange={(e) => {
              setusername(e.target.value);
            }}
          />
          <InputBox
            label="Password"
            onchange={(e) => {
              setpassword(e.target.value);
            }}
            value={password}
            placeholder="ex:123456"
          />
          <Button onclick={signinbutton} buttonname="Sign In" />
          <Bottomwarning
            bottomwarning="Don't have an Account?"
            url="http://localhost:5173/"
            link="signup"
          />
        </div>
      </div>
    </div>
  );
}
