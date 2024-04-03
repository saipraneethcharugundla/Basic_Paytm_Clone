import React from "react";

export default function Button(matter) {
  return (
    <div className=" px-20 pb-2">
      <button className="w-full rounded-lg border border-slate-200 bg-slate-900 py-2 text-xl text-white" onClick={matter.onclick}>
        {matter.buttonname}
      </button>
    </div>
  );
}
