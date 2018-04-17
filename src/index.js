import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ShowBooks from './ShowBooks';
import registerServiceWorker from './registerServiceWorker';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-117744002-1', {
    'siteSpeedSampleRate': 100,
    'alwaysSendReferrer': true,
    'userId' : "1234User",
    debug: true
}); //Unique Google Analytics tracking number
ReactGA.pageview(window.location.pathname + window.location.search);


ReactDOM.render(<App/>, document.getElementById('root'));
ReactDOM.render(<ShowBooks/>, document.getElementById('showBooks'))

registerServiceWorker();
