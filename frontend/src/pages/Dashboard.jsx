import React from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";

export default function Dashboard() {
  return (
    <div className="flex h-screen flex-col bg-white">
      <Appbar />
      <Balance />
      <Users />
    </div>
  );
}
