import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '../redux/store';
import { initialState } from '../redux/reducer';

ReactDOM.render(
    <Provider store={configureStore({ state: initialState })}>
        <App />
    </Provider>,
    document.getElementById('root'),
);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js');
    });
}
