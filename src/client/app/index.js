/*	 @flow */
import React from 'react';
import { render } from 'react-dom';
import getRoutes from './routes/';

import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.js';
import 'bootstrap/dist/js/bootstrap.js';
import './styles/index.scss';


const App = () => {
	return getRoutes()
}


render(<App />, document.getElementById('app'));