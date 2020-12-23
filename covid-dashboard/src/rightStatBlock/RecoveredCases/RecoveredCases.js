import React from "react";
import "./recoveredCases.css";
import CountryItem from "./CountryItem";

function RecoveredCases({
  countriesRecoveredArr,
  globalRecovered,
  todayStatus,
}) {
  let readableAmount = globalRecovered
    .toString()
    .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");

  return (
    <div className="country-recoveredCases">
      <h2 className="country-recoveredCases-title">Recovered</h2>
      <p className="global-recoveredAmount">{readableAmount}</p>
      <ul className="country-recoveredCases-list">
        {countriesRecoveredArr.map((countryItem, index) => {
          return (
            <CountryItem
              countryDataObj={countryItem}
              key={index}
              todayStatus={todayStatus}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default RecoveredCases;
