import { configureStore } from 'redux-starter-kit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'shared/redux/saga';
import reducer from './reducer';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer,
  preloadedState: {},
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
export default store;
