/*	 @flow */
import React from 'react';
import { render } from 'react-dom';
import getRoutes from './routes/';

import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.js';
import 'bootstrap/dist/js/bootstrap.js';
import './styles/index.scss';
class App extends React.Component {
	constructor (props) {
		super (props);
	}

	render () {
		return getRoutes();
	}
}

render (<App/>, document.getElementById ('app'));