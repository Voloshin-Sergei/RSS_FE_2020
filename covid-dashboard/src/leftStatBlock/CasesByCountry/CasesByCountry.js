import React from "react";
import "./casesByCountry.css";
import CountryItem from "./CountryItem";

function CasesByCountry({ countriesArr, todayStatus }) {
  return (
    <div className="country-cases">
      <h2 className="country-cases-title">Cases by Country</h2>
      <ul className="country-cases-list">
        {countriesArr.map((countryItem, index) => {
          return (
            <CountryItem
              countryObj={countryItem}
              todayStatus={todayStatus}
              key={index}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default CasesByCountry;
