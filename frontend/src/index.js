import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux'
import store from './store'
import {Provider as AlertProvider,positions,transitions} from 'react-alert'
import AltertTemplate from 'react-alert-template-basic'


const options={
  timeout:5000,
  transition:transitions.SCALE,
  position:positions.BOTTOM_CENTER
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AlertProvider template={AltertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>
);