import React from 'react';
import PropTypes from 'prop-types';
import '../../node_modules/bulma/css/bulma.css';
import BudgetMathHelper from '../helpers/budget-math-helper';

const KPICard = ({ cardTitle, value }) => (
  <div className="card has-background-white-ter">
    <div className="card-content">
      <div className="has-text-weight-medium is-size-5" id="card-title">
        {cardTitle}
      </div>
      <div className="has-text-weight-medium is-size-3" id="card-val">
        {BudgetMathHelper.addCurrencySyntax(value)}
      </div>
    </div>
  </div>
);

KPICard.propTypes = {
  cardTitle: PropTypes.string,
  value: PropTypes.number,
};

KPICard.defaultProps = {
  cardTitle: 'cardTitle',
  value: 0,
};

export default KPICard;
