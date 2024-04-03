import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Balance() {
  const tokenfrombrowser = localStorage.getItem("token");
  const [gotbalance, setgotbalance] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3011/api/v1/account/balance",
          {
            headers: {
              authorization: `Bearer ${tokenfrombrowser}`,
            },
          },
        );
        setgotbalance(response.data.remaining_balance);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [tokenfrombrowser]);
  return (
    <div>
      <div className="flex w-screen flex-col px-2 py-2">
        <div className="flex flex-row justify-between space-x-4 rounded-md bg-gradient-to-r from-cyan-400 to-emerald-400 to-70% p-4 text-2xl shadow-md shadow-slate-500">
          <div className="self-center">Your Current Balance is :</div>
          <div className="flex flex-row space-x-5 ">
            <div className="rounded-md p-3">$ {gotbalance}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
