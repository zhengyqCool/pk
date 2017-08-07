import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { Provider } from 'react-redux'
import store from './store/index.js'
import './css/index.css';
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  hashHistory as history ,
//  browserHistory as history ,
} from 'react-router-dom'

ReactDOM.render(
    <Provider store={store}>
        <Router  history={history}>
            <App />
        </Router>
    </Provider>,
  document.getElementById('root')
);

