//Entry point for rendering the React application into the DOM

/*
index.js file is responsible for rendering the main App component into the root HTML element of the application 
(<div id="root"></div>).
The ReactDOM.render function is used to mount the App component into the DOM, 
ensuring that it's rendered within the specified root element.
*/
// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
ReactDOM.render(<App />, document.getElementById('root'));
