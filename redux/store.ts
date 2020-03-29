import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { reducer, State } from './reducer';
import createSagaMiddleware from 'redux-saga';
import { sagas } from './sagas';

export type AppState = { state: State };

export function configureStore(initialState: AppState) {
    const sagaMiddleware = createSagaMiddleware();

    const storeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        combineReducers<AppState>({
            state: reducer,
        }),
        initialState,
        storeEnhancers(applyMiddleware(sagaMiddleware)),
    );

    sagaMiddleware.run(sagas);
    return store;
}
