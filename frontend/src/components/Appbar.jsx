import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Appbar() {
  const tokenfrombrowser = localStorage.getItem("token");
  const [gotname, setGotName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3011/api/v1/user/getfirstname",
          {
            headers: {
              authorization: `Bearer ${tokenfrombrowser}`,
            },
          },
        );
        setGotName(response.data.gotfirstname);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [tokenfrombrowser]);

  return (
    <div>
      <div className="flex w-screen flex-col px-2 py-2">
        <div className="flex flex-row justify-between space-x-4 rounded-md bg-gradient-to-r from-cyan-400 to-emerald-400 to-70% p-6 text-2xl shadow-md shadow-slate-500">
          <div className="self-center">Paytm Clone.....Payments made easy</div>
          <div className="flex flex-row space-x-1 ">
            <div className="rounded-md p-3">Welcome</div>
            <div className="rounded-full bg-gradient-to-r from-rose-500 to-yellow-300 px-5 py-3 text-3xl font-semibold text-white">
              {gotname.charAt(0).toUpperCase()}
            </div>
            <div className="rounded-md p-3">{gotname}</div>
            <button className="rounded-md bg-white p-3 hover:bg-slate-400 hover:text-white active:ring-2 active:ring-slate-500 ">
              Check Balance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
