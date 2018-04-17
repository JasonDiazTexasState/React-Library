import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ShowBooks from './ShowBooks';
import registerServiceWorker from './registerServiceWorker';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-117744002-1'); //Unique Google Analytics tracking number

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<ShowBooks />, document.getElementById('showBooks'))

registerServiceWorker();
