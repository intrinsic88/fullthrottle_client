import React from 'react';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries } from 'react-vis';

const GraphComponent = (props) => {

    return(
        <XYPlot margin={{bottom: 70}} xType="linear" xDomain={[1, 24]} width={500} height={500}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis title='Time in Day'/>
        <YAxis title='Hours (30Mins is 0.5 hours)'/>
        <VerticalBarSeries
          data={props.data}
        />
        </XYPlot>
    )

}

export default GraphComponent;


