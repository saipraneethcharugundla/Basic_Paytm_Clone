import React from "react";

export default function MoneyTransfer() {
  return (
    <div className="flex h-screen justify-center bg-slate-300">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-slate-50 p-4 text-center text-emerald-600">
          <div className=" p-3 text-4xl font-bold">Send Money</div>
          <div className="flex justify-start px-5 text-2xl">
            <div className=" rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 to-70% px-4 py-2">
              R
            </div>
            <div className="self-center px-4">Ravi Kumar</div>
          </div>
          <div className=" px-5 pb-2 text-left text-base font-medium">
            <div>Amount(rs)</div>
            <div className="py-2">
              <input
                placeholder="100"
                className="w-full rounded border border-slate-200 px-2 py-2 text-xl"
              ></input>
            </div>
          </div>
          <div className=" px-20 pb-2">
            <button className="w-full rounded-lg border-slate-200 bg-gradient-to-r from-cyan-400 to-emerald-400 to-70% py-2 text-xl text-white">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
