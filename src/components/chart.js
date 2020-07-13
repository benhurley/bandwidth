import React, { Fragment } from 'react';
import "../styles/chart.css"
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

export const Chart = ({ bandwidths }) => {

// map bandwidth data into required format for fusioncharts
const categories = [{"category": bandwidths.map(b => {return { "label": b.timestamp.toString()  }}) }]
const fsData = bandwidths.map(b => { return { "value": b.data[0].bytes_fs.toString()}})
const tsData = bandwidths.map(b => { return { "value": b.data[0].bytes_ts.toString()}})
const dataset = [{"seriesname": "Bytes From Server", "data": fsData}, {"seriesname": "Bytes To Server", "data": tsData}]

const chartConfigs = {
    type: 'msline',// The chart type
    width: '800', // Width of the chart
    height: '600', // Height of the chart
    dataFormat: 'json', // Data type
     dataSource: {
    //Chart Configurations
      "chart": {
        "bgColor": "#282c34",
        "theme": "fusion",
        "caption": "Bandwidth Comparison",
        "captionFontColor": "#FFFFF",
        "subCaption": "Aggregated by Window Time",
        "subCaptionFontColor": 	"#f5f2d0",
        "xAxisname": "Timestamp (epoch)",
        "yAxisName": "Bytes",
        "xAxisNameFontColor": "#f5f2d0",
        "yAxisNameFontColor": "#f5f2d0",
        "xAxisValueFontColor": "#FFFFF",
        "yAxisValueFontColor": "#FFFFF",
        "plotFillAlpha": "80",
        "divLineIsDashed": "1",
        "divLineDashLen": "1",
        "divLineGapLen": "1",
        "labelFontColor":	"#FFFFF"
      },
      "categories": categories,
      "dataset": dataset,
    }
  }
    // render the chart
    return( 
      <Fragment>
          <div> {bandwidths.device_id} </div>
          <div class="chart">
            <ReactFC {...chartConfigs} /> 
          </div>
      </Fragment>
    )
};