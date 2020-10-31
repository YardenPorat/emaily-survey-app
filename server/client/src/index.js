import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import 'materialize-css/dist/css/materialize.min.css';

//redux
const initialState = {};
const middleware = [thunk];
const store = createStore(
    reducers,
    initialState,
    applyMiddleware(...middleware)
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);

// console.log(`stripe key is`, process.env.REACT_APP_STRIPE_KEY);
// console.log(`env is `, process.env.NODE_ENV);
