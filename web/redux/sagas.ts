import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

const sagaMiddleware = createSagaMiddleware();

export const runSaga = () =>
  sagaMiddleware.run(function* () {
    yield all([]);
  });

export default sagaMiddleware;
