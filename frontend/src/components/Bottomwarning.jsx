import React from "react";

export default function Bottomwarning(matter) {
  return (
    <div className="flex-col-2 flex justify-center space-x-3 p-2 text-center text-base">
      <div className="text-base font-medium">{matter.bottomwarning}</div>
      <a href={matter.url} className="font-normal underline">{matter.link}</a>
    </div>
  );
}
