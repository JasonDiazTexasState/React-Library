import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import CreateBook from './CreateBook';
import ShowBooks from './ShowBooks';
//import ClearBooks from './ClearBooks';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
//ReactDOM.render(<ClearBooks />, document.getElementById('clearBooks'))
//ReactDOM.render(<CreateBook />, document.getElementById('createBook'))
ReactDOM.render(<ShowBooks />, document.getElementById('showBooks'))

registerServiceWorker();
