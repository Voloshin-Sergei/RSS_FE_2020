import React from "react";
import "./header.css";
import Logo from "./logo";

function Header() {
  return (
    <div className="header-wrapper">
      <div className="header-title">
       
        <Logo />
        <h1>
          COVID-19 Dashboard by the Center for Systems Science and Engineering
          (CSSE) at Johns Hopkins University (JHU)
        </h1>
      </div>
      <div className="burger">
        <span className="burger-line"></span>
        <ul className="menu__list hidden">
          <li className="menu__item">
            <a href="./">Some link</a>
          </li>
          <li className="menu__item">
            <a href="./">Some link</a>
          </li>
          <li className="menu__item">
            <a href="./">Some link</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
