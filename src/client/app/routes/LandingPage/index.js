/**
 * @desc this is the admin component of the application.
 * @author gaurav sharma
 */
import React, { useEffect, useState } from 'react';
import {
	Container,
	Row,
	Col,
	Form,
	FormGroup,
	Label
} from 'reactstrap';
import { connect } from 'react-redux';
import { userLogin } from '../../redux/actions';
import { toast, ToastContainer } from 'react-toastify';
import FontAwesome from 'react-fontawesome';

import LoadingOverlay from '../../components/LoadingOverlay';

import './index.scss';


const LandingPage = (props) => {
	useEffect(() => {
		if (localStorage.getItem('data')) {
			window.location = '/adminAccount';
		}
		realignContent();
		window.onresize = realignContent;
		document.title = 'Admin';

	}, [])

	/**
	 * trigger this to realign the window content
	*/
	const realignContent = () => {
		const bodyContainer = document.getElementById('content');
		// const bodyContainer = document.getElementsByTagName('body')[0];
		const loginContainer = document.getElementById('user-login');

		if (bodyContainer.clientWidth >= 720) {
			const loginMargin = (bodyContainer.clientHeight - loginContainer.clientHeight - 100) / 2;
			loginContainer.style.marginTop = `${loginMargin}px`;
		} else {
			loginContainer.style.marginTop = '10px';
		}
	}
	const onLogin = (e) => {
		e.preventDefault();
		const { triggerLoginUser } = props;
		triggerLoginUser(user, password);
	}

	/**
	 * handle the login payload response
	 */
	const responseHandler = () => {
		const { login: { data: { code, message, data, user } } } = props;
		toast.dismiss();
		if (code === 100) {
			toast.success(message);
			// setup the admin access token and redirect to admin account
			localStorage.setItem('accessToken', data.accessToken);
			localStorage.setItem('user', data.user.name);

			props.router.push('/account');
		} else {
			toast.error("Failed authentication.");
		}
	}
	
	
	const onFormValid = () => {
		return user && password
	}


	const { fetching, login } = props;
	{ login && responseHandler() }
	return <section className='content' id='content'>
		{/* <LoadingOverlay fetching={fetching}/> */}
		<ToastContainer />
		<section className='transparent-overlay'></section>
		<br /><br /><br />
		{/* <HeaderComponent/><br/> */}
		<Container fluid>
			<Row>
				<Col md={4} sm={3} xs={2}></Col>
				<Col md={4} sm={6} xs={8}>
					<div className='text-center'>
						<h2 className='logo-text'>PluginFactory ReactJS Scaffold</h2>
					</div>
					<section className='user-login' id='user-login'>
						<Form>
							<FormGroup>
								<Label for="username">Username</Label><br />
								<input onChange={e => setUser(e.target.value)} className='custom-field login-field' placeholder='Username for user' />
							</FormGroup>
							<FormGroup>
								<Label for="username">Password</Label><br />
								<input onChange={e => setPassword(e.target.value)} type='password' className='custom-field login-field' placeholder='Password for user' />
							</FormGroup>
							<p className='text-center'>
								<button className="litnite-btn" onClick={onLogin} disabled={!onFormValid()}>LOGIN&nbsp;&nbsp;&nbsp;<FontAwesome name="chevron-right" /></button>
							</p>
						</Form>
						<br /><br /><br />
						<hr className='line-break' />
						<p className='text-center'>PluginFactory&copy;2019</p>
					</section>
				</Col>
				<Col md={4} sm={3} xs={2}></Col>
			</Row>
		</Container>
	</section>
}

// handles the outgoing dispatches
const mapDispatchToProps = dispatch => {
	return {
		triggerLoginUser: (email, password) => dispatch(userLogin({ email, password }))
	};
}

// handles incoming state changes
const mapStateToProps = state => {
	const { fetching, login } = state;
	return { fetching, login };
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
