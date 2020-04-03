import React from 'react';
import ReactFC from 'react-fusioncharts';
import PropTypes from 'prop-types';
import '../../node_modules/bulma/css/bulma.css';

const ChartCard = ({ chartTitle, chartConfig }) => (
  <div className="card is-bottom-paddingless has-block-display has-background-white-ter">
    <div id="card-chart-content" className="card-content">
      <div id="card-chart-title" className="has-text-weight-medium is-size-5 has-text-centered">
        {chartTitle}
      </div>
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
