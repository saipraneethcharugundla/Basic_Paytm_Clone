import React, { useState, useEffect } from "react";
import axios from "axios";

function User({ user }) {
  return (
    <div className="flex justify-between">
      <div className="flex h-12 flex-row space-x-2">
        <div className="ml-4 h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 to-70% px-4 py-2 text-3xl">
          {user.firstName[0]}
        </div>
        <div className="text-md self-center">
          {user.firstName} {user.lastName}
        </div>
      </div>
      <div className="p-2">
        <button className="w-full rounded-lg border bg-gradient-to-r from-cyan-400 to-emerald-400 to-70% p-2 text-xl ">
          Send Money
        </button>
      </div>
    </div>
  );
}

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (filter.trim() !== "") {
      axios
        .get("http://localhost:3011/api/v1/user/bulk?filter=" + filter)
        .then((response) => {
          setUsers(response.data.user);
        });
    } else {
      setUsers([]);
    }
  }, [filter]);

  return (
    <div>
      <div className="flex w-screen flex-col px-2 py-2">
        <div className="flex flex-col justify-between space-y-3  rounded-md text-2xl">
          <div className="text-4xl font-medium">Users</div>
          <input
            placeholder="search for anything...."
            className="w-full rounded border-2 border-solid border-slate-500 p-3 text-2xl shadow-md shadow-slate-400"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          ></input>
          <div>
            {users.map((user) => (
              <User user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
