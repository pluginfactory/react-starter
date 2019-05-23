import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router';

import './index.scss';

export default () => 
	<Container className='container' id='notfoundcontainer'>
		<Row>
			<Col className="">
				<h1 className="not-found">404</h1>
				<p className="subtext">Oooooops!!!</p>
				<p>The page seems to have evaporated.</p>
				<Link to={"/"}>Continue to Homepage</Link>
			</Col>
		</Row>
	</Container>