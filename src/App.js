import React from 'react';
import { Router } from 'react-router';
import { hot } from 'react-hot-loader/root';
import history from 'shared/utils/history';
import flow from 'lodash/flow';
import { Provider as ReduxProvider } from 'react-redux';
import 'sass/common.scss';
import store from 'shared/redux/store';
import ToastContainer from 'shared/components/Layout/ToastContainer';
import routes, { renderRoutes } from './routes';

const Root = () => (
  <ReduxProvider store={store}>
    <ToastContainer />
    <Router history={history}>
      {renderRoutes(routes)}
    </Router>
  </ReduxProvider>
);

Root.defaultProps = {
};

Root.propTypes = {
};

export { Root as App };

export default flow(
  hot,
)(Root);
