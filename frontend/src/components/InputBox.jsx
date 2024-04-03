import React from "react";

export default function InputBox(matter) {
  return (
    <div className=" px-4 pb-2 text-left text-base font-medium text-slate-950">
      <div>{matter.label}</div>
      <div className="py-2">
        <input
          placeholder={matter.placeholder}
          className="w-full rounded border border-slate-200 px-2 py-2 text-xl"
          onChange={matter.onchange}
          value={matter.value}
        ></input>
      </div>
    </div>
  );
}
