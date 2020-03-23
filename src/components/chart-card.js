import React from "react";
import ReactFC from "react-fusioncharts";
import "../../node_modules/bulma/css/bulma.css";

const ChartCard = props => {
  return (
    <div className="card is-half-fullhd is-half-desktop is-mobile is-bottom-paddingless has-block-display">
      <header className="card-header">
        <div id="card-chart-title" className="card-header-title">
          {props.chartTitle}
        </div>
      </header>

      <div id="card-chart-content" className="card-content">
        <ReactFC {...props.chartConfig} />
      </div>
    </div>
  );
};

export default ChartCard;
