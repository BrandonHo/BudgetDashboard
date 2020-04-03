import React, { Component } from 'react';
import './App.css';
import '../node_modules/bulma/css/bulma.css';
import Charts from 'fusioncharts/fusioncharts.charts';
import FusionCharts from 'fusioncharts';
import ReactFC from 'react-fusioncharts';
import KPICard from './components/kpi-card';
import ChartCard from './components/chart-card';
import Navbar from './components/navbar';
import ChartConfigHelper from './helpers/chart-config-helper';
import BudgetMathHelper from './helpers/budget-math-helper';
import DummyDataHelper from './helpers/dummy-data-helper';

ReactFC.fcRoot(FusionCharts, Charts);

class App extends Component {
  constructor() {
    super();
    this.state = {
      records: [],
      totalIncome: 0,
      totalExpenses: 0,
      totalGross: 0,
      grossCumulativeChartData: null,
      incomeCategoryChartData: null,
      expenseCategoryChartData: null,
    };
  }

  componentDidMount() {
    const ssID = process.env.REACT_APP_SS_ID;
    const apiKey = process.env.REACT_APP_API_KEY;

    // If ID or api key not found - load dummy data
    if ((ssID === undefined) || (apiKey === undefined)) {
      this.processGoogleSheetData(DummyDataHelper.generateDummyData());
    } else {
      // Define get method url, process callback for data
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${ssID}/values:batchGet?ranges=Budget&majorDimension=ROWS&key=${apiKey}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.processGoogleSheetData(data);
        });
    }
  }

  processDataForUI = () => {
    // Reference current records in state
    const { records } = this.state;

    // Use helper to calculate/format data from records
    const budgetData = BudgetMathHelper.getTotalsForIncomeExpenseAndGross(
      records,
    );
    const itemArrays = BudgetMathHelper.getIncomeAndExpenseDataArrays(records);
    const grossCumulativeData = BudgetMathHelper.getGrossCategoriesAndValues(
      itemArrays.incomeItems,
      itemArrays.expenseItems,
    );
    const expenseCategoryData = BudgetMathHelper.getKeyValueArrayFromMap(
      BudgetMathHelper.getCategoryValueMapFromData(itemArrays.expenseItems),
    );
    const incomeCategoryData = BudgetMathHelper.getKeyValueArrayFromMap(
      BudgetMathHelper.getCategoryValueMapFromData(itemArrays.incomeItems),
    );

    // Update state with new amount variables
    this.setState({
      totalIncome: budgetData.totalIncome,
      totalExpenses: budgetData.totalExpenses,
      totalGross: budgetData.totalGross,
      grossCumulativeChartData: ChartConfigHelper.scrollArea2dConfig(
        grossCumulativeData.categories,
        grossCumulativeData.values,
      ),
      expenseCategoryChartData: ChartConfigHelper.bar2dConfig(expenseCategoryData, 'expense'),
      incomeCategoryChartData: ChartConfigHelper.bar2dConfig(incomeCategoryData, 'income'),
    });
  };

  processGoogleSheetData(data) {
    // Process data into appropriate objects
    const batchRowValues = data.valueRanges[0].values;
    const rows = [];
    for (let i = 1; i < batchRowValues.length; i += 1) {
      const rowObject = {};
      for (let j = 0; j < batchRowValues[i].length; j += 1) {
        rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
      }
      rows.push(rowObject);
    }

    // Set records in state, then process for UI purposes
    this.setState({ records: rows }, () => this.processDataForUI());
  }

  render() {
    const {
      totalIncome,
      totalExpenses,
      totalGross,
      grossCumulativeChartData,
      expenseCategoryChartData,
      incomeCategoryChartData,
    } = this.state;
    return (
      <div className="app has-background-grey-dark">
        <Navbar />
        <div className="container is-fullhd has-fixed-navbar-top-padding">
          <section className="section is-bottom-paddingless">
            <div className="columns">
              <div className="column">
                <KPICard
                  cardTitle="Expenses"
                  value={totalExpenses}
                />
              </div>
              <div className="column">
                <KPICard
                  cardTitle="Gross"
                  value={totalGross}
                />
              </div>
              <div className="column">
                <KPICard
                  cardTitle="Income"
                  value={totalIncome}
                />
              </div>
            </div>
          </section>

          <section className="section is-next-section is-bottom-paddingless">
            <div className="columns is-multiline">
              <div className="column is-full is-tablet is-mobile">
                <ChartCard
                  chartTitle="Gross Balance Per Date"
                  chartConfig={grossCumulativeChartData}
                />
              </div>
              <div className="column is-half-fullhd is-half-desktop is-tablet is-mobile">
                <ChartCard
                  chartTitle="Expense Categories"
                  chartConfig={expenseCategoryChartData}
                />
              </div>
              <div className="column is-half-fullhd is-half-desktop is-tablet is-mobile">
                <ChartCard
                  chartTitle="Income Categories"
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
