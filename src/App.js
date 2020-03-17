import React, { Component } from "react";
import "./App.css";
import config from "./config";
import Navbar from "./components/navbar";
import KPICard from "./components/kpi-card";
import "../node_modules/bulma/css/bulma.css";
import ChartCard from "./components/chart-card";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionCharts from "fusioncharts";
import ReactFC from "react-fusioncharts";

ReactFC.fcRoot(FusionCharts, Charts);

const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Budget&majorDimension=ROWS&key=${config.apiKey}`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      income: 0,
      expenses: 0,
      gross: 0,

      items: [],
      chartData: null
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

        this.setState({ items: rows }, () => this.getData());
      });
  }

  getData = () => {
    // Reference current items in state
    const records = this.state.items;

    // Variables to contain new state data
    let newExpenseItems = [];
    let newIncomeItems = [];
    let newItems = [];
    let newIncome = 0;
    let newExpenses = 0;

    for (let i = 0; i < records.length; i++) {
      let typeString = records[i]["type"];

      // Remove any funky currency-related parts from number
      let tcCurrencyString = records[i]["totalcost"];
      let tcNumber = Number(tcCurrencyString.replace(/[^0-9.-]+/g, ""));

      // Add to income/expense total based on type
      if (typeString.includes("income")) {
        newIncome += tcNumber;
        newIncomeItems.push({
          description: records[i].description,
          value: tcNumber
        });
      } else {
        newExpenses += tcNumber;
        newExpenseItems.push({
          label: records[i].description,
          value: tcNumber
        });
      }
      // console.log(newIncome);
      // descriptions.push(records[i].description);
      // values.push(records[i].number);
      // newItems.push({ description: records[i].description, number: records[i].number });
    }

    console.log(newExpenseItems);
    // Calculate gross...
    let newGross = newIncome - newExpenses;

    // ... then define formatter to format the amounts back to rand currency
    var formatter = new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR"
    });

    newIncome = formatter.format(newIncome);
    newExpenses = formatter.format(newExpenses);
    newGross = formatter.format(newGross);

    // Update state with new amount variables
    this.setState({
      income: newIncome,
      expenses: newExpenses,
      gross: newGross
    });

    const chartConfig = {
      type: "pie3d",
      width: "100%",
      dataFormat: "json",
      dataSource: {
        chart: {
          xAxisName: "Description",
          yAxisName: "Value",
          numberPrefix: "R",
          labelDisplay: "rotate",
          slantLabel: "1",
          showLabels: "1",
          chartLeftMargin: "0",
          chartRightMargin: "0",
          showBorder: "0",
          bgColor: "#ffffff",
          plotToolText: "<b>$label: $dataValue</b>"
        },
        data: newExpenseItems
      }
    };

    this.setState({ items: newItems });
    this.setState({ chartData: chartConfig });
  };

  render() {
    return (
      <div className="app has-background-light">
        <Navbar />
        <div className="container is-fullhd">
          <section className="section is-bottom-paddingless has-paddingtop-size-1">
            <div className="columns">
              <div className="column">
                <KPICard
                  id="test1"
                  cardtitle="Income"
                  value={this.state.income}
                />
              </div>
              <div className="column">
                <KPICard
                  id="test2"
                  cardtitle="Expenses"
                  value={this.state.expenses}
                />
              </div>
              <div className="column">
                <KPICard
                  id="test3"
                  cardtitle="Gross"
                  value={this.state.gross}
                />
              </div>
            </div>
          </section>

          <section className="section is-bottom-paddingless has-paddingtop-size-1">
            <div className="columns is-multiline">
              <div className="column is-half-tablet is-one-third-desktop is-half-fullhd">
                <ChartCard
                  chartTitle="All Expenses"
                  chartConfig={this.state.chartData}
                />
              </div>

              <div className="column is-half-tablet is-one-third-desktop is-half-fullhd">
                <ChartCard
                  chartTitle="All Expenses"
                  chartConfig={this.state.chartData}
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
