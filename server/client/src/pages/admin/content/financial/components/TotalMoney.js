import React from "react";
import "./component-styles.css";

function TotalMoney({ value }) {
  return (
    <div className="walletBalanceCard">
      <div className="svgwrapper">
        <svg viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect
            x="0.539915"
            y="6.28937"
            width="21"
            height="4"
            rx="1.5"
            transform="rotate(-4.77865 0.539915 6.28937)"
            fill="#7D6B9D"
            stroke="black"
          ></rect>
          <circle
            cx="11.5"
            cy="5.5"
            r="4.5"
            fill="#E7E037"
            stroke="#F9FD50"
            stroke-width="2"
          ></circle>
          <path
            d="M2.12011 6.64507C7.75028 6.98651 12.7643 6.94947 21.935 6.58499C22.789 6.55105 23.5 7.23329 23.5 8.08585V24C23.5 24.8284 22.8284 25.5 22 25.5H2C1.17157 25.5 0.5 24.8284 0.5 24V8.15475C0.5 7.2846 1.24157 6.59179 2.12011 6.64507Z"
            fill="#BF8AEB"
            stroke="black"
          ></path>
          <path
            d="M16 13.5H23.5V18.5H16C14.6193 18.5 13.5 17.3807 13.5 16C13.5 14.6193 14.6193 13.5 16 13.5Z"
            fill="#BF8AEB"
            stroke="black"
          ></path>
        </svg>
      </div>

      <div className="balancewrapper">
        <span className="balanceHeading">Profito totale</span>
        <p className="balance">
          <span id="currency">Leke </span>{value}
        </p>
      </div>

      {/* <button className="addmoney">
        <span className="plussign">+</span>Add Money
      </button> */}
    </div>
  );
}

export default TotalMoney;
