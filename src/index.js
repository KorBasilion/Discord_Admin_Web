import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
          <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" crossorigin></script>
          <script src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js" crossorigin></script>
          <script src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js" crossorigin></script>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

