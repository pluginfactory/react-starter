/**
 * @desc this is the admin component of the application.
 * @author gaurav sharma
 */
import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { userLogin } from '../../redux/actions';
import { toast, ToastContainer } from 'react-toastify';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import LoadingOverlay from '../../components/LoadingOverlay';

import './index.scss';


const LandingPage = (props) => {
	const [user, setUser] = useState("")
	const [password, setPassword] = useState("")

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
			const loginMargin = (bodyContainer.clientHeight - loginContainer.clientHeight - 80) / 2;
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
	return <section className='content' id='content' >
		{/* <LoadingOverlay fetching={fetching}/> */}
		<ToastContainer />
		<section className='transparent-overlay'></section>
		<br /><br /><br />
		{/* <HeaderComponent/><br/> */}
		<section className='form-container'>

			<div className='text-center'>
				<h2 className='logo-text'>PluginFactory ReactJS Scaffold</h2>
			</div>
			<section className='user-login' id='user-login'>

				<label htmlFor="username">Username</label><br />
				<input onChange={e => setUser(e.target.value)} className='custom-field login-field' placeholder='Username for user' />

				<label htmlFor="username">Password</label><br />
				<input onChange={e => setPassword(e.target.value)} type='password' className='custom-field login-field' placeholder='Password for user' />

				<p className='text-center'>
					<button className="litnite-btn" onClick={onLogin} disabled={!onFormValid()}><span className="content-center">
						LOGIN&nbsp;<ChevronRightIcon />
					</span></button>
				</p>

				<br /><br /><br />
				<hr className='line-break' />
				<p className='text-center'>PluginFactory&copy;2019</p>
			</section>

		</section>
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
