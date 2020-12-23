import React, { useEffect, useState } from "react";
import GlobalAmount from "./leftStatBlock/GlobalAmount/GlobalAmount";
import CasesByCountry from "./leftStatBlock/CasesByCountry/CasesByCountry";
import DeathCases from "./rightStatBlock/DeathCases/DeathCases";
import RecoveredCases from "./rightStatBlock/RecoveredCases/RecoveredCases";
import "./App.css";
import Header from "./header/header";
import MapBlock from './mapBlock/mapBlock'
import BarChart from "./graph/BarChart";

function App() {
  const [globalData, setGlobalData] = useState([]);
  const [isToday, setIsToday] = useState([]);

  const [countriesData, setCountriesData] = useState([]);
  const [worldDataCases, setWorldDataCases] = useState([]);
  const [worldDataDeaths, setWorldDataDeaths] = useState([]);
  const [worldDataRecovered, setWorldDataRecovered] = useState([]);

  useEffect(() => {
    const getGlobalData = async () => {
      const response = await fetch("https://disease.sh/v3/covid-19/all");
      const dataSummary = await response.json();

      setGlobalData(dataSummary);
      setWorldDataCases(dataSummary.cases);
      setWorldDataDeaths(dataSummary.deaths);
      setWorldDataRecovered(dataSummary.recovered);
      setIsToday(false);
    };

    getGlobalData();
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      const response = await fetch("https://disease.sh/v3/covid-19/countries");
      const countriesData = await response.json();
      setCountriesData(countriesData);
    };

    getCountriesData();
  }, []);

  function maxCases (countriesData) {
    let max = 0;
    countriesData.map((item) => {
      if (item.cases > max) {
        max = item.cases;
      }
    })
    return max;
  }

  const max = maxCases(countriesData);

  countriesData.map((item) => {
    if (item.cases === max) {
    item.markerSize = 700000;
    } else {item.markerSize = item.cases / max * 700000}
  })

  return (
    <div className="App">
      <header className="header container">
        <Header />
      </header>
      <main className="main container">
        <div className="infected">
          <div className="global">
            {worldDataCases !== undefined ? (
              <GlobalAmount globalCases={worldDataCases} />
            ) : null}
          </div>
          <div className="country">
            {countriesData !== undefined ? (
              <CasesByCountry
                countriesArr={countriesData}
                todayStatus={isToday}
              />
            ) : null}
          </div>
          <div className="period-buttons-wrapper">
            <button
              className={isToday ? `button` : `button button--active`}
              onClick={() => {
                setWorldDataCases(globalData.cases);
                setWorldDataDeaths(globalData.deaths);
                setWorldDataRecovered(globalData.recovered);
                setIsToday(false);
              }}
            >
              Total
            </button>
            <button
              className={isToday ? `button button--active` : `button`}
              onClick={() => {
                setWorldDataCases(globalData.todayCases);
                setWorldDataDeaths(globalData.todayDeaths);
                setWorldDataRecovered(globalData.todayRecovered);
                setIsToday(true);
              }}
            >
              Today
            </button>
          </div>
        </div>
        <div className="map">
          {countriesData !== undefined ? (
              <MapBlock 
                countriesArr={countriesData}
              />
            ) : null}
        </div>
        <div className="day-statistic">
          <div className="day-statistic-data">
            <div className="deaths">
              {countriesData !== undefined ? (
                <DeathCases
                  countriesDeathsArr={countriesData}
                  globalDeaths={worldDataDeaths}
                  todayStatus={isToday}
                />
              ) : null}
            </div>
            <div className="lives">
              {countriesData !== undefined ? (
                <RecoveredCases
                  countriesRecoveredArr={countriesData}
                  globalRecovered={worldDataRecovered}
                  todayStatus={isToday}
                />
              ) : null}
            </div>
          </div>
          <BarChart />
        </div>
      </main>
    </div>
  );
}

export default App;
