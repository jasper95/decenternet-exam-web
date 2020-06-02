import React from 'react';
import { 
  PieChart,
  Pie,
  Cell
} from 'recharts'
import ReactResizeDetector from 'react-resize-detector';

function CustomOneLevelPieChart(props) {
  const { 
    data,
    barThickness,
    chartClassName,
    customNumber
  } = props
  return (
    <div className={`${chartClassName} customChart customChart-one-level-pie`}>
      <ReactResizeDetector handleWidth handleHeight>
        {({ width, height }) => (
          <>
            { customNumber && (
              <h1 className="customChart_number">
                {customNumber}
              </h1>
            )}
            <PieChart width={width} height={height} >
              <Pie
                data={data}
                cx={(width/2)}
                cy={(height/2)}
                innerRadius={(height/2.3) - barThickness}
                outerRadius={(height/2.3)}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {
                  data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)
                }
              </Pie>
            </PieChart>
          </>
        )}
      </ReactResizeDetector>
    </div>
  )
}

CustomOneLevelPieChart.defaultProps = {
  data: [
    { name: 'Group A', value: 400, color: '#0088FE' },
    { name: 'Group B', value: 300, color: '#00C49F' },
    { name: 'Group C', value: 300, color: '#FFBB28'},
    { name: 'Group D', value: 200, color: '#FF8042' },
  ],
  chartClassName: '',
  barThickness: 30
}

export default CustomOneLevelPieChart;
