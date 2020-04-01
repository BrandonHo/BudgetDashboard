function doughnut2dConfig(chartData) {
  return {
    type: 'doughnut2d',
    width: '100%',
    dataFormat: 'json',
    dataSource: {
      chart: {
        numberPrefix: 'R',
        labelDisplay: 'rotate',
        slantLabel: '1',
        showLabels: '1',
        chartLeftMargin: '0',
        chartRightMargin: '0',
        drawCrossLine: '1',
        crossLineColor: '#363636',
        crossLineAlpha: '15',
        drawCrossLineOnTop: '0',
        showBorder: '0',
        bgColor: '#ffffff',
        plotToolText: '<b>$label: $dataValue</b>',
      },
      data: chartData,
    },
  };
}

function bar2dConfig(chartData) {
  return {
    type: 'bar2d',
    width: '100%',
    dataFormat: 'json',
    dataSource: {
      chart: {
        numberPrefix: 'R',
        labelDisplay: 'rotate',
        slantLabel: '1',
        showLabels: '1',
        drawCrossLine: '1',
        crossLineColor: '#000000',
        crossLineAlpha: '15',
        crossLineAnimation: '1',

        showYAxisValues: '0',
        numDivLines: '0',
        divLineAlpha: '0',

        chartLeftMargin: '0',
        chartRightMargin: '0',
        showBorder: '0',
        showCanvasBorder: '0',
        bgColor: '#F5F5F5',
        bgAlpha: '100',

        canvasBgColor: '#F5F5F5',

        plotToolText: '<b>$label: $dataValue</b>',

        paletteColors: '#000000',
        usePlotGradientColor: '0',
      },
      data: chartData,
    },
  };
}

function area2dConfig(chartData) {
  return {
    type: 'splinearea',
    width: '100%',
    dataFormat: 'json',
    dataSource: {
      chart: {
        numberPrefix: 'R',
        labelDisplay: 'Auto',
        slantLabel: '1',
        showLabels: '1',
        showBorder: '0',
        bgColor: '#F5F5F5',
        bgAlpha: '100',
        canvasBgColor: '#F5F5F5',

        drawCrossLine: '1',
        crossLineColor: '#000000',
        crossLineAlpha: '15',

        showAlternativeVGridColor: '0',
        divLineAlpha: '0',
        numDivLines: '0',
        drawAnchors: '1',

        showValues: '0',
        showYAxisValues: '0',
        showCanvasBorder: '0',
        chartLeftMargin: '0',
        chartRightMargin: '0',

        usePlotGradientColor: '1',

        plotToolText: '<b>$label: $dataValue</b>',
      },
      data: chartData,
    },
  };
}

function getChartConfig(chartData, chartType, chartConfigType) {
  let chartConfig = [];

  // Select chart config type
  if (chartType.includes('area2d')) {
    chartConfig = area2dConfig(chartData);
  } else if (chartType.includes('bar2d')) {
    chartConfig = bar2dConfig(chartData);
  }

  // Select/apply color based on chart config type
  if (chartConfigType.includes('income')) {
    chartConfig.dataSource.chart.bgColor = '#000000';
    chartConfig.dataSource.chart.canvasBgColor = '#000000';
  } else if (chartConfigType.includes('expense')) {
    chartConfig.dataSource.chart.bgColor = '#F5F5F5';
    chartConfig.dataSource.chart.canvasBgColor = '#F5F5F5';
    chartConfig.dataSource.chart.showCanvasBorder = '0';
  } else {
    chartConfig.dataSource.chart.bgColor = '#F5F5F5';
    chartConfig.dataSource.chart.canvasBgColor = '#F5F5F5';
  }

  return chartConfig;
}

export default {
  doughnut2dConfig,
  bar2dConfig,
  area2dConfig,
  getChartConfig,
};
