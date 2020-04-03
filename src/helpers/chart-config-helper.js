function bar2dConfig(chartData, dataType) {
  const chartConfig = {
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
        labelFontSize: '12',
        labelFontBold: '0',
        valueFontBold: '1',
        valueFontItalic: '1',
        valueFontSize: '15',
        chartLeftMargin: '0',
        chartRightMargin: '0',
        showPlotBorder: '0',
        showBorder: '0',
        showCanvasBorder: '0',
        bgColor: '#F5F5F5',
        bgAlpha: '100',
        canvasBgColor: '#F5F5F5',
        plotToolText: '<b>$label: $dataValue</b>',
        paletteColors: '#000000',
        usePlotGradientColor: '1',
      },
      data: chartData,
    },
  };

  // Select/apply color based on data type
  if (dataType.includes('income')) {
    chartConfig.dataSource.chart.paletteColors = '#66bb6a';
    chartConfig.dataSource.chart.plotGradientColor = '#a5d6a7';
  } else if (dataType.includes('expense')) {
    chartConfig.dataSource.chart.paletteColors = '#ef5350';
    chartConfig.dataSource.chart.plotGradientColor = '#ff867c';
  }

  return chartConfig;
}

function scrollArea2dConfig(chartCategories, chartValues) {
  return {
    type: 'scrollarea2d',
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
        canvasLeftPadding: '15',
        canvasTopPadding: '0',
        canvasRightPadding: '20',
        canvasBottomPadding: '0',
        chartLeftMargin: '0',
        chartRightMargin: '0',
        flatScrollBars: '1',
        drawCrossLine: '1',
        crossLineColor: '#000000',
        crossLineAlpha: '15',
        showPlotBorder: '0',
        yAxisValueFontSize: '12',
        showAlternativeVGridColor: '0',
        showAlternateHGridColor: '0',
        divLineAlpha: '25',
        numDivLines: '4',
        drawAnchors: '1',
        anchorRadius: '5',
        anchorBgColor: '#66bb6a',
        showValues: '0',
        xAxisName: 'Date (Day/Month)',
        xAxisNameFontSize: '10',
        showYAxisValues: '1',
        showCanvasBorder: '0',
        plotFillColor: '#d7ffd9',
        plotGradientColor: '#a5d6a7',
        usePlotGradientColor: '1',
        plotToolText: '<b>$label: $dataValue</b>',
      },
      categories: [
        {
          fontSize: '15',
          fontBold: '1',
          category: chartCategories,
        },
      ],
      dataset: [
        {
          data: chartValues,
        },
      ],
    },
  };
}

export default {
  bar2dConfig,
  scrollArea2dConfig,
};
