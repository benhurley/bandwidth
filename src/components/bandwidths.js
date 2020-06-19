import React from 'react';
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

export const Bandwidths = ({ bandwidths }) => {

const categories = [{"category": bandwidths.map(b => {return { "label": b.timestamp.toString()  }}) }]
const fsData = bandwidths.map(b => { return { "value": b.data[0].bytes_fs.toString()}})
const tsData = bandwidths.map(b => { return { "value": b.data[0].bytes_ts.toString()}})
const dataset = [{"seriesname": "Bytes From Server", "data": fsData}, {"seriesname": "Bytes To Server", "data": tsData}]

const chartConfigs = {
    type: 'msline',// The chart type
    width: '1000', // Width of the chart
    height: '600', // Height of the chart
    dataFormat: 'json', // Data type
     dataSource: {
    //Chart Configurations
      "chart": {
        "theme": "fusion",
        "caption": "Bandwidth Comparison",
        "subCaption": "Aggregated by Window Time",
        "xAxisname": "Timestamp (epoch)",
        "yAxisName": "Bytes",
        "plotFillAlpha": "80",
        "divLineIsDashed": "1",
        "divLineDashLen": "1",
        "divLineGapLen": "1"
      },
      "categories": categories,
      "dataset": dataset,
    }
  }

    return( <ReactFC {...chartConfigs} /> )
};