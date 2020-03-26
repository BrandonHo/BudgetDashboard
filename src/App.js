import React, { Component } from 'react';
import './App.css';
import '../node_modules/bulma/css/bulma.css';
import Charts from 'fusioncharts/fusioncharts.charts';

import FusionCharts from 'fusioncharts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import OceanTheme from 'fusioncharts/themes/fusioncharts.theme.ocean';
import KPICard from './components/kpi-card';

import ChartCard from './components/chart-card';
import Navbar from './components/navbar';
import config from './config';
import ChartConfigHelper from './components/chart-config-helper';
import BudgetMathHelper from './components/budget-math-helper';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme, OceanTheme);

const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Budget&majorDimension=ROWS&key=${config.apiKey}`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      totalIncome: 0,
      totalExpenses: 0,
      totalGross: 0,
      records: [],
      expenseBarChartData: null,
      expenseAreaChartData: null,
    };
  }

  componentDidMount() {
    // Process google sheets callback for data
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const batchRowValues = data.valueRanges[0].values;
        const rows = [];

        // Get each record from the spreadsheet (note first row/headers excluded)
        for (let i = 1; i < batchRowValues.length; i += 1) {
          const rowObject = {};
          for (let j = 0; j < batchRowValues[i].length; j += 1) {
            rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
          }
          rows.push(rowObject);
        }

        // Set records in state, then process for UI purposes
        this.setState({ records: rows }, () => this.processDataForUI());
      });
  }

  testMethod = () => {
    // console.log(testWord);
  };

  processDataForUI = () => {
    // Reference current records in state
    const { records } = this.state;

    const budgetData = BudgetMathHelper.getTotalsForIncomeExpenseAndGross(
      records,
    );
    const itemArrays = BudgetMathHelper.getIncomeAndExpenseDataArrays(records);
    const expenseChartData = BudgetMathHelper.getKeyValueArrayFromMap(
      BudgetMathHelper.getCategoryValueMapFromData(itemArrays.expenseItems),
    );
    const cumulativeExpenseChartData = BudgetMathHelper.getCumulativeTotalPerDateArray(
      itemArrays.expenseItems,
    );

    // Update state with new amount variables
    this.setState({
      totalIncome: budgetData.totalIncome,
      totalExpenses: budgetData.totalExpenses,
      totalGross: budgetData.totalGross,
      expenseBarChartData: ChartConfigHelper.bar2dConfig(expenseChartData),
      expenseAreaChartData: ChartConfigHelper.area2dConfig(cumulativeExpenseChartData),
    });
  };

  render() {
    const { totalIncome, totalExpenses, totalGross } = this.state;
    const { expenseAreaChartData, expenseBarChartData } = this.state;
    return (
      <div className="app has-background-grey-dark">
        <Navbar onClickEvent={this.testMethod} />
        <div className="container is-fullhd">
          <section className="section is-bottom-paddingless">
            <div className="columns">
              <div className="column material-design-dark-card">
                <KPICard
                  id="test1"
                  cardTitle="Income"
                  value={totalIncome}
                />
              </div>
              <div className="column">
                <KPICard
                  id="test2"
                  cardTitle="Expenses"
                  value={totalExpenses}
                />
              </div>
              <div className="column">
                <KPICard
                  id="test3"
                  cardTitle="Gross"
                  value={totalGross}
                />
              </div>
            </div>
          </section>

          <section className="section is-bottom-paddingless has-paddingtop-size-1">
            <div className="columns is-multiline">
              <div className="column is-half-fullhd is-half-desktop is-tablet is-mobile">
                <ChartCard
                  chartTitle="Cumulative Expenses Over Time"
                  chartConfig={expenseAreaChartData}
                />
              </div>

              <div className="column is-half-fullhd is-half-desktop is-tablet is-mobile">
                <ChartCard
                  chartTitle="Category Overview of Expenses"
                  chartConfig={expenseBarChartData}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
