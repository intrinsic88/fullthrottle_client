import React from 'react';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries } from 'react-vis';
import {isMobile} from 'react-device-detect';

const GraphComponent = (props) => {

  const width = isMobile? window.innerWidth-(20*window.innerWidth/100) :'500';
  const height = isMobile? '500':'500'

    return(
      <div> 
        <XYPlot margin={{bottom: 70}} xType="linear" xDomain={[1, 24]} width={width} height={height}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis title='Session Start time'/>
        <YAxis title='Hours Active(30Mins is 0.5 hours)'/>
        <VerticalBarSeries
          data={props.data}
        />
        </XYPlot>
      </div>
    )

}

export default GraphComponent;


