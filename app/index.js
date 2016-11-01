import React from 'react';
import { render } from 'react-dom';

import App from './app';
import startRouter from './router';
import ViewStore from './store';

import '../less/main.less';

const viewStore = new ViewStore();
startRouter(viewStore);

render(
    <App viewStore={viewStore} />,
    document.getElementById('app')
);
