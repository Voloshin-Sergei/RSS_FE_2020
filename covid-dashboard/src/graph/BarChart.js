import React, { useEffect, useState } from "react";
import "./barChart.css";
import OptionItem from "./OptionItem";

import { Line } from "react-chartjs-2";

function BarChart() {
  const [historicalDataCountries, setHistoricalDataCountries] = useState([]);
  const [historicalDataTotal, setHistoricalDataTotal] = useState([]);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    const getHistoricalData = async () => {
      const response = await fetch("https://disease.sh/v3/covid-19/historical");
      const data = await response.json();

      setHistoricalDataCountries(data);
    };

    getHistoricalData();
  }, []);
  useEffect(() => {
    const getHistoricalDataTotal = async () => {
      const response = await fetch(
        "https://disease.sh/v3/covid-19/historical/all"
      );
      const data = await response.json();

      setCurrentData(data);
      setHistoricalDataTotal(data);
    };

    getHistoricalDataTotal();
  }, []);
  function changeGraph(event) {
    if (event.target.value === "total") {
      setCurrentData(historicalDataTotal);
    } else {
      if (event.target.value.includes(",")) {
        let valueArr = event.target.value.split(",");
        let selectedCountry = historicalDataCountries.filter(
          (item) => item.province === valueArr[1]
        );
        setCurrentData(selectedCountry[0].timeline);
      } else {
        let selectedCountry = historicalDataCountries.filter(
          (item) => item.country === event.target.value
        );
        setCurrentData(selectedCountry[0].timeline);
      }
    }
  }

  return (
    <div className="barChart">
      <form className="form">
        <select
          className="data-select"
          onChange={(event) => changeGraph(event)}
        >
          <option value="total">Total</option>
          {historicalDataCountries !== undefined ? (
            <OptionItem countriesArr={historicalDataCountries} />
          ) : null}
        </select>
      </form>
      {currentData.cases !== undefined ? (
        <Line
          data={{
            labels: Object.keys(currentData.cases).slice(0, 14),
            datasets: [
              {
                label: "Cases",
                data: Object.values(currentData.cases).slice(0, 14),
                backgroundColor: "orange",
                borderColor: "red",
                borderWidth: 1,
                fill: false,
              },
              {
                label: "Deaths",
                data: Object.values(currentData.deaths).slice(0, 14),
                backgroundColor: "#424242",
                borderColor: "gray",
                borderWidth: 1,
                fill: false,
              },
              {
                label: "Recovered",
                data: Object.values(currentData.recovered),
                backgroundColor: "#3F8B2F",
                borderColor: "green",
                borderWidth: 1,
                fill: false,
              },
            ],
          }}
          height={220}
          width={300}
          options={{
            tooltips: {
              callbacks: {
                label: function (tooltipItem, data) {
                  return tooltipItem.yLabel
                    .toString()
                    .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
                },
              },
            },
            legend: {
              display: true,
              labels: {
                boxWidth: 10,
                padding: 10,
              },
            },
            title: {
              display: true,
              text: "Last 14 days dynamic",
              lineHeight: 0,
            },
            maintainAspectRatio: true,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: false,
                    callback: function (value) {
                      return value
                        .toString()
                        .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
                    },
                  },
                },
              ],
            },
          }}
        />
      ) : null}
    </div>
  );
}

export default BarChart;
