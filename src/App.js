import React, { Component } from "react";
import "./App.css";
import config from "./config";
import Navbar from "./components/navbar";
import KPICard from "./components/kpi-card";
import "../node_modules/bulma/css/bulma.css";
import ChartCard from "./components/chart-card";
import Charts from "fusioncharts/fusioncharts.charts";

import FusionCharts from "fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import OceanTheme from "fusioncharts/themes/fusioncharts.theme.ocean";

import ReactFC from "react-fusioncharts";
import ChartConfigHelper from "./components/chart-config-helper";
import BudgetMathHelper from "./components/budget-math-helper";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme, OceanTheme);

const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Budget&majorDimension=ROWS&key=${config.apiKey}`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      totalIncome: 0,
      totalExpenses: 0,
      totalGross: 0,

      items: [],
      chartData: null,
      expensePieChartData: null,
      expenseBarChartData: null
    };
  }

  componentDidMount() {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let batchRowValues = data.valueRanges[0].values;
        const rows = [];

        for (let i = 1; i < batchRowValues.length; i++) {
          let rowObject = {};
          for (let j = 0; j < batchRowValues[i].length; j++) {
            rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
          }
          rows.push(rowObject);
        }

        this.setState({ items: rows }, () => this.updateData());
      });
  }

  updateData = () => {
    // Reference current items in state
    const records = this.state.items;

    let budgetData = BudgetMathHelper.getTotalsForIncomeExpenseAndGross(
      records
    );

    let itemArrays = BudgetMathHelper.getIncomeAndExpenseDataArrays(records);
    let expenseChartData = BudgetMathHelper.getKeyValueArrayFromMap(
      BudgetMathHelper.getCategoryValueMapFromData(itemArrays.expenseItems)
    );

    // Update state with new amount variables
    this.setState({
      totalIncome: budgetData.totalIncome,
      totalExpenses: budgetData.totalExpenses,
      totalGross: budgetData.totalGross,
      expensePieChartConfig: ChartConfigHelper.doughnut2dConfig(
        expenseChartData
      ),
      expenseBarChartData: ChartConfigHelper.bar2dConfig(expenseChartData)
    });
  };

  render() {
    return (
      <div className="app material-design-dark">
        <Navbar />
        <div className="container is-fullhd">
          <section className="section is-bottom-paddingless">
            <div className="columns">
              <div className="column material-design-dark-card">
                <KPICard
                  id="test1"
                  cardtitle="Income"
                  value={this.state.totalIncome}
                />
              </div>
              <div className="column">
                <KPICard
                  id="test2"
                  cardtitle="Expenses"
                  value={this.state.totalExpenses}
                />
              </div>
              <div className="column">
                <KPICard
                  id="test3"
                  cardtitle="Gross"
                  value={this.state.totalGross}
                />
              </div>
            </div>
          </section>

          <section className="section is-bottom-paddingless has-paddingtop-size-1">
            <div className="columns is-multiline">
              <div className="column is-half-tablet is-one-third-desktop is-half-fullhd">
                <ChartCard
                  chartTitle="All Expenses"
                  chartConfig={this.state.expensePieChartConfig}
                />
              </div>

              <div className="column is-half-tablet is-one-third-desktop is-half-fullhd">
                <ChartCard
                  chartTitle="All Expenses"
                  chartConfig={this.state.expenseBarChartData}
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
