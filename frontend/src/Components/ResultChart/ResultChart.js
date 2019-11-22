import React from "react";
import "../../../node_modules/react-vis/dist/style.css";
import {
    XYPlot,
    LineSeries,
    HorizontalGridLines,
    XAxis,
    YAxis,
    Borders,
    ChartLabel,
    DiscreteColorLegend
} from "react-vis";
import "./ResultChart.css";

class ResultChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Fake data
        //
        // const data = [
        //     {x: 1, y: 8},
        //     {x: 2, y: 10},
        //     {x: 3, y: 9},
        //     {x: 4, y: 13},
        //     {x: 5, y: 15},
        //     {x: 6, y: 10},
        //     {x: 7, y: 12},
        //     {x: 8, y: 10},
        //     {x: 9, y: 11},
        //     {x: 10, y: 12},
        //     {x: 11, y: 9},
        //     {x: 12, y: 8},
        // ];

        return (
            <div className="chart-grid">
                <XYPlot height={300} width={600}>
                    <DiscreteColorLegend
                        style={{position: "absolute", left: "50px", top: "10px"}}
                        orientation="vertical"
                        items={[
                            {
                                title: this.props.lable_uncontrolled,
                                color: "#12939A"
                            },
                            {
                                title: this.props.lable_controlled,
                                color: "#FF8000"
                            }
                        ]}
                    />
                    <HorizontalGridLines />
                    <LineSeries data={ this.props.data_uncontrolled }  color="#12939A"/>
                    <LineSeries data={ this.props.data_controlled } color="#FF8000"/>
                    <XAxis
                        title={ this.props.xAxis }
                        position="end"
                    />
                    <YAxis
                        // title={ this.props.yAxis }
                        position="end"
                    />
                </XYPlot>
            </div>
        );
    }
}

export default ResultChart;