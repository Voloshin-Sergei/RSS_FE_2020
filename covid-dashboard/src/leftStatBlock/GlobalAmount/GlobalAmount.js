import React from "react";
import "./globalAmount.css";

function GlobalAmount({ globalCases }) {
  let readableAmount = globalCases
    .toString()
    .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
  return (
    <div className="global-amount">
      <h2 className="global-title">Global Cases</h2>
      <p className="global-cases">{readableAmount}</p>
    </div>
  );
}

export default GlobalAmount;
