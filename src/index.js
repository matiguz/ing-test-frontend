
// index.js

import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import eventsApp from './redux/reducers/reducers'
import thunkMiddleware from 'redux-thunk'
import registerServiceWorker from './registerServiceWorker';

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)

let store = createStoreWithMiddleware(eventsApp)

let rootElement = document.getElementById('root')

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
registerServiceWorker();
