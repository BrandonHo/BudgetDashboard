function doughnut2dConfig(chartData) {
  return {
    type: "doughnut2d",
    width: "100%",
    dataFormat: "json",
    dataSource: {
      chart: {
        numberPrefix: "R",
        labelDisplay: "rotate",
        slantLabel: "1",
        showLabels: "1",
        chartLeftMargin: "0",
        chartRightMargin: "0",
        showBorder: "0",
        bgColor: "#ffffff",
        plotToolText: "<b>$label: $dataValue</b>",
        theme: "fusion"
      },
      data: chartData
    }
  };
}

function bar2dConfig(chartData) {
  return {
    type: "bar2d",
    width: "100%",
    dataFormat: "json",
    dataSource: {
      chart: {
        numberPrefix: "R",
        labelDisplay: "rotate",
        slantLabel: "1",
        showLabels: "1",
        chartLeftMargin: "0",
        chartRightMargin: "0",
        showBorder: "0",
        bgColor: "#ffffff",
        plotToolText: "<b>$label: $dataValue</b>",
        theme: "fusion"
      },
      data: chartData
    }
  };
}

export default { doughnut2dConfig, bar2dConfig };
