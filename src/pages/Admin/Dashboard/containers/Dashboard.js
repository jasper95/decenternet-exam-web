import React from 'react';
import CustomLineChart from 'shared/components/Charts/LineChart';
import CustomBarChart from 'shared/components/Charts/BarChart';
import CustomAreaChart from 'shared/components/Charts/AreaChart';
import CustomOneLevelPieChart from 'shared/components/Charts/OneLevelPieChart';
import Paper from 'react-md/lib/Papers/Paper';
import cn from 'classnames';
import 'sass/components/cards/graphCard/index.scss';
import { useSelector } from 'react-redux';
import { authSelector } from 'shared/hocs/withAuth';

function Dashboard() {
  const { auth } = useSelector(authSelector);
  return (
    <>
      <div className="row row-header dashboardHeader">
        <h1 className="dashboardHeader_title">
          {`Welcome ${[auth.first_name, auth.last_name].join(' ')}!`}
        </h1>
      </div>
      <div className="row row-pies">
        <GraphCard
          className="col col-md-4-guttered"
          type="pie"
          cartTitle="Active Users"
        >
          <CustomOneLevelPieChart
            className="graphCard_chart"
            customNumber={parseInt(Math.random() * 100)}
          />
        </GraphCard>
        <GraphCard
          className="col col-md-4-guttered"
          type="pie"
          cartTitle="Daily Views"
        >
          <CustomOneLevelPieChart
            className="graphCard_chart"
            customNumber={parseInt(Math.random() * 100)}
          />
        </GraphCard>
        <GraphCard
          className="col col-md-4-guttered"
          type="pie"
          cartTitle="Online Sessions"
        >
          <CustomOneLevelPieChart
            className="graphCard_chart"
            customNumber={parseInt(Math.random() * 100)}
          />
        </GraphCard>
      </div>
      <div className="row row-content">
        <Paper
          className="col col-md-8-guttered col-form"
          style={{ height: 250 }}
        >
          <CustomLineChart />
        </Paper>
        <Paper
          className="col col-md-4-guttered col-form"
          style={{ height: 250 }}
        >
          <CustomBarChart />
        </Paper>
      </div>

      <div className="row row-content-2">
        <Paper
          className="col col-md-12-guttered col-form"
          style={{ height: 500 }}
        >
          <CustomAreaChart />
        </Paper>
      </div>
    </>
  );
}


function GraphCard(props) {
  const {
    className, type, cartTitle, children,
  } = props;
  return (
    <Paper
      className={cn(`${className} graphCard`, {
        [`graphCard-${type}`]: type,
      })}
    >
      <h1 className="graphCard_title">
        {cartTitle}
      </h1>
      <div className="graphCard_chartContainer">
        <div className="graphCard_chart">
          {children}
        </div>
      </div>
    </Paper>
  );
}

export default Dashboard;
