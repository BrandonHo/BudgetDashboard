import React from 'react';
import ReactFC from 'react-fusioncharts';
import PropTypes from 'prop-types';
import '../../node_modules/bulma/css/bulma.css';

const ChartCard = ({ chartTitle, chartConfig }) => (
  <div className="card is-half-fullhd is-half-desktop is-mobile is-bottom-paddingless has-block-display has-background-white-ter">
    <header className="card-header">
      <div id="card-chart-title" className="card-header-title">
        {chartTitle}
      </div>
    </header>

    <div id="card-chart-content" className="card-content">
      <ReactFC {...chartConfig} />
    </div>
  </div>
);

ChartCard.propTypes = {
  chartTitle: PropTypes.string,
  chartConfig: PropTypes.instanceOf(Object),
};

ChartCard.defaultProps = {
  chartTitle: 'chartTitle',
  chartConfig: null,
};

export default ChartCard;
