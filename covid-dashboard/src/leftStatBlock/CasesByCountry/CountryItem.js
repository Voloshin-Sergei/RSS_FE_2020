import React from "react";
import "./countryItem.css";

function CountryItem({ countryObj, todayStatus }) {
  let readableAmount;
  if (todayStatus) {
    readableAmount = countryObj.todayCases
      .toString()
      .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
  } else {
    readableAmount = countryObj.cases
      .toString()
      .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
  }
  return (
    <li className="country-item-wrapper">
      <div className="country-flag">
        <img
          src={countryObj.countryInfo.flag}
          width="18"
          alt="national-flag"
        ></img>
      </div>
      <div className="country-title">{countryObj.country}</div>
      <div className="country-infectedAmount">
        <div className="amount-wrapper">{readableAmount}</div>
      </div>
    </li>
  );
}

export default CountryItem;
