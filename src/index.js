import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import 'antd/dist/antd';
import { Provider } from 'react-redux';
import store from './app/store'
import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Provider store = {store}>
<App/>
</Provider>
  </Router>
);


reportWebVitals();
       
       
