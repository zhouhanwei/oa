import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Router from './router/index';
import ErrorBoundary from "./errorBoundary/index";

// ReactDOM.render(
// //   <React.StrictMode>
// //     {/*<App />*/}
// //     <Router/>
// //   </React.StrictMode>,
// //   document.getElementById('root')
// // );

ReactDOM.render(
        <ErrorBoundary>
            <Router/>
        </ErrorBoundary>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
