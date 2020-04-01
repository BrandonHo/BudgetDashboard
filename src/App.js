import React, { Component } from 'react';
import './App.css';
import '../node_modules/bulma/css/bulma.css';
import Charts from 'fusioncharts/fusioncharts.charts';

import FusionCharts from 'fusioncharts';
import ReactFC from 'react-fusioncharts';
import KPICard from './components/kpi-card';

import ChartCard from './components/chart-card';
import Navbar from './components/navbar';
import config from './config';
import ChartConfigHelper from './components/chart-config-helper';
import BudgetMathHelper from './components/budget-math-helper';

ReactFC.fcRoot(FusionCharts, Charts);

const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Budget&majorDimension=ROWS&key=${config.apiKey}`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      totalIncome: 0,
      totalExpenses: 0,
      totalGross: 0,
      records: [],
      incomeCategoryChartData: null,
      incomeCumulativeChartData: null,
      expenseCategoryChartData: null,
      expenseCumulativeChartData: null,
      // grossCumulativeChartData: null,
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

  testMethod = (testWord) => {
    console.log(testWord);
  };

  processDataForUI = () => {
    // Reference current records in state
    const { records } = this.state;

    // Use helper to calculate/format data from records
    const budgetData = BudgetMathHelper.getTotalsForIncomeExpenseAndGross(
      records,
    );
    const itemArrays = BudgetMathHelper.getIncomeAndExpenseDataArrays(records);
    const expenseCategoryData = BudgetMathHelper.getKeyValueArrayFromMap(
      BudgetMathHelper.getCategoryValueMapFromData(itemArrays.expenseItems),
    );
    const expenseCumulativeData = BudgetMathHelper.getCumulativeTotalPerDateArray(
      itemArrays.expenseItems,
    );
    const incomeCategoryData = BudgetMathHelper.getKeyValueArrayFromMap(
      BudgetMathHelper.getCategoryValueMapFromData(itemArrays.incomeItems),
    );
    const incomeCumulativeData = BudgetMathHelper.getCumulativeTotalPerDateArray(
      itemArrays.incomeItems,
    );

    // Update state with new amount variables
    this.setState({
      totalIncome: budgetData.totalIncome,
      totalExpenses: budgetData.totalExpenses,
      totalGross: budgetData.totalGross,
      expenseCategoryChartData: ChartConfigHelper.bar2dConfig(expenseCategoryData),
      expenseCumulativeChartData: ChartConfigHelper.area2dConfig(expenseCumulativeData),
      incomeCategoryChartData: ChartConfigHelper.bar2dConfig(incomeCategoryData),
      incomeCumulativeChartData: ChartConfigHelper.area2dConfig(incomeCumulativeData),
    });
  };

  render() {
    const { totalIncome, totalExpenses, totalGross } = this.state;
    const {
      expenseCumulativeChartData, expenseCategoryChartData,
      incomeCumulativeChartData, incomeCategoryChartData,
    } = this.state;
    return (
      <div className="app has-background-grey-dark">
        <Navbar />
        <div className="container is-fullhd has-fixed-navbar-top-padding">
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

          <section className="section is-next-section is-bottom-paddingless">
            <div className="columns is-multiline">
              <div className="column is-half-fullhd is-half-desktop is-tablet is-mobile">
                <ChartCard
                  chartTitle="Cumulative Expenses Over Time"
                  chartConfig={expenseCumulativeChartData}
                />
              </div>

              <div className="column is-half-fullhd is-half-desktop is-tablet is-mobile">
                <ChartCard
                  chartTitle="Category Overview of Expenses"
                  chartConfig={expenseCategoryChartData}
                />
              </div>

              <div className="column is-half-fullhd is-half-desktop is-tablet is-mobile">
                <ChartCard
                  chartTitle="Cumulative Income Over Time"
                  chartConfig={incomeCumulativeChartData}
                />
              </div>

              <div className="column is-half-fullhd is-half-desktop is-tablet is-mobile">
                <ChartCard
                  chartTitle="Category Overview of Income"
                  chartConfig={incomeCategoryChartData}
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
