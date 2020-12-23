import React from "react";

function OptionItem({ countriesArr }) {
  return (
 
      countriesArr.map((country, index) => {
        return (
          <option
            key={index}
            value={
              country.province === null
                ? [country.country]
                : [country.country, country.province]
            }
          >
            {country.province === null
              ? `${country.country}`
              : `${country.country} ${country.province
                  .split(/\s+/)
                  .map((word) => word[0].toUpperCase() + word.substring(1))
                  .join(" ")}`}
          </option>
        );
      })
  );
}

export default OptionItem;
