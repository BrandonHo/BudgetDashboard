import React from "react";
import "../../node_modules/bulma/css/bulma.css";

const KPICard = props => {
  return (
    <div className="card material-design-dark-card">
      <header className="card-header material-design-dark-card">
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
