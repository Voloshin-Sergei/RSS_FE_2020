import React from "react";
import "./deathCases.css";
import CountryItem from "./CountryItem";

function DeathCases({ countriesDeathsArr, globalDeaths, todayStatus }) {
  let readableAmount = globalDeaths
    .toString()
    .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");

  return (
    <div className="country-deathCases">
      <h2 className="country-deathCases-title">Deaths</h2>
      <p className="global-deathsAmount">{readableAmount}</p>
      <ul className="country-deathCases-list">
        {countriesDeathsArr.map((countryItem, index) => {
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

export default DeathCases;
