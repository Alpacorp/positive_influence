import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Tracer from './web-tracer.js';

Tracer('positive-influence-app');

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
