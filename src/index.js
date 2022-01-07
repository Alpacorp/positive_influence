import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import observer from './utils/openTelemetry/observer';
import rum from '../src/utils/elastic/monitor';

rum.setInitialPageLoadName('load_page_positive_influence');

observer('tracer-positive-influence');

ReactDOM.render(
  <App />,
  document.getElementById('root')
);