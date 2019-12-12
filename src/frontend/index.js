import React from 'react';
import ReactDom from 'react-dom';
import moment from 'moment';

import App from './app/app';
import './style/style.less';

moment.locale('pt');

ReactDom.render(<App />, document.getElementById('app'));