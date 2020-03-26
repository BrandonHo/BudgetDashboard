import React from 'react';
import PropTypes from 'prop-types';
import '../../node_modules/bulma/css/bulma.css';
import BudgetMathHelper from './budget-math-helper';

const KPICard = ({ cardTitle, value }) => (
  <div className="card has-background-grey-lighter">
    <header className="card-header material-design-dark-card">
      <div className="card-header-title is-mobile is-desktop" id="card-title">
        {cardTitle}
      </div>
    </header>
    <div className="card-content">
      <div id="card-val">{BudgetMathHelper.addCurrencySyntax(value)}</div>
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
