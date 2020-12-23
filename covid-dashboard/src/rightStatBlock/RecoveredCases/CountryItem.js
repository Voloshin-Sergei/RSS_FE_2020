import React from "react";
import "./countryItem.css";

function CountryItem({ countryDataObj, todayStatus }) {
  let readableAmount;
  if (todayStatus) {
    readableAmount = countryDataObj.todayRecovered
      .toString()
      .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
  } else {
    readableAmount = countryDataObj.recovered
      .toString()
      .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
  }
  return (
    <li className="country-recoveredCases-wrapper">
      <div className="country-flag">
        <img
          src={countryDataObj.countryInfo.flag}
          width="18"
          alt="national-flag"
        ></img>
      </div>
      <div className="country-title">{countryDataObj.country}</div>
      <div className="country-recoveredAmount">
        <div className="amount-wrapper">{readableAmount}</div>
      </div>
    </li>
  );
}

export default CountryItem;
