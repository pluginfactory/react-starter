/*	 @flow */
import React from 'react';
import { render } from 'react-dom';
import getRoutes from './routes/';

import './styles/index.scss';


const App = () => {
	return getRoutes()
}


render(<App />, document.getElementById('app'));