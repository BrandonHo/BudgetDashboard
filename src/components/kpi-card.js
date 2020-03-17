import React from "react";
import "../../node_modules/bulma/css/bulma.css";

const KPICard = props => {
  return (
    <div className="card">
      <header className="card-header">
        <div className="card-header-title is-mobile is-desktop" id="card-title">
          {props.cardtitle}
        </div>
      </header>
      <div className="card-content">
        <div id="card-val">{props.value}</div>
      </div>
    </div>
  );
};

export default KPICard;
