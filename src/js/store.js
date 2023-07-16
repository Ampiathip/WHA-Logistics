import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import sagas from './sagas'

const initialiseSagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    applyMiddleware(initialiseSagaMiddleware)
);

initialiseSagaMiddleware.run(sagas);

export default store;