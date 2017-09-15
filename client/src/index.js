import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import 'react-select/dist/react-select.css';

import './resources/basic/css/bootstrap.min.css';
import './index.css';
import './resources/basic/css/apps.css';
import './resources/basic/css/mediastyle.css';
import './resources/basic/css/nice-select.css';
import './resources/basic/css/owl.carousel.css';
import './resources/basic/css/style.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
