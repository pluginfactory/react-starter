import React from 'react';
import { Link } from 'react-router';

import './index.scss';

export default () =>
	<div className='container' id='notfoundcontainer'>


		<h1 className="not-found">404</h1>
		<p className="subtext">Oooooops!!!</p>
		<p>The page seems to have evaporated.</p>
		<Link to={"/"}>Continue to Homepage</Link>


	</div>