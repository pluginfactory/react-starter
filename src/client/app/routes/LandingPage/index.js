/**
 * @desc this is the admin component of the application.
 * @author gaurav sharma
 */
import React, { Component } from 'react';
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

class LandingPage extends Component {
	constructor(props) {
		super(props);

		this.realignContent = this.realignContent.bind(this);
		this.onLogin = this.onLogin.bind(this);
		this.responseHandler = this.responseHandler.bind(this);
	}

	/**
	 * trigger this to realign the window content
	*/
	realignContent() {
		const bodyContainer = document.getElementById('content');
		// const bodyContainer = document.getElementsByTagName('body')[0];
		const loginContainer = document.getElementById('user-login');

		if (bodyContainer.clientWidth >= 720) {
			const loginMargin = (bodyContainer.clientHeight - loginContainer.clientHeight -100)/2;
			loginContainer.style.marginTop = `${loginMargin}px`;
		} else {
			loginContainer.style.marginTop='10px';
		}
	}

	componentDidMount() {
		this.realignContent();
		window.onresize = this.realignContent;

		document.title = 'Admin';
	}

	onLogin(e) {
		e.preventDefault();
		const { triggerLoginUser } = this.props;

		triggerLoginUser(this.userUname.value, this.userPass.value);
	}

	/**
	 * handle the login payload response
	 */
	responseHandler() {
		const { login: { data: { code, message, data, user } } } = this.props;
		toast.dismiss();
		if (code === 100) {
			toast.success(message);
			// setup the admin access token and redirect to admin account
			localStorage.setItem('accessToken', data.accessToken);
			localStorage.setItem('user', data.user.name);

			this.props.router.push('/account');
		} else {
			toast.error("Failed authentication.");
		}
	}

	componentWillMount() {
		if (localStorage.getItem('data')) {
			window.location = '/adminAccount';
		}
	}

	render() {
		const { fetching, login } = this.props;
		{ login && this.responseHandler() }
		return <section className='content' id='content'>
			{/* <LoadingOverlay fetching={fetching}/> */}
			<ToastContainer />
			<section className='transparent-overlay'></section>
			<br/><br/><br/>
			{/* <HeaderComponent/><br/> */}
			<Container fluid>
				<Row>
					<Col md={4} sm={3} xs={2}></Col>
					<Col md={4} sm={6} xs={8}>
						<p className='text-center'>
							<h2 className='logo-text'>Beat-Box Admin</h2>
						</p>
						<section className='user-login' id='user-login'>
							<Form>
								<FormGroup>
									<Label for="username">Username</Label><br/>
									<input ref={userUname => this.userUname = userUname} className='custom-field login-field' placeholder='Username for user'/>
								</FormGroup>
								<FormGroup>
									<Label for="username">Password</Label><br/>
									<input ref={userPass => this.userPass = userPass} type='password' className='custom-field login-field' placeholder='Password for user'/>
								</FormGroup>
								<p className='text-center'>
									<button className="litnite-btn" onClick={this.onLogin}>LOGIN&nbsp;&nbsp;&nbsp;<FontAwesome name="chevron-right"/></button>
								</p>
							</Form>
							<br/><br/><br/>
							<hr className='line-break'/>
							<p className='text-center'>BeatBox&copy;2019</p>
						</section>
					</Col>
					<Col md={4} sm={3} xs={2}></Col>
				</Row>
			</Container>
		</section>
	}
}

// handles the outgoing dispatches
const mapDispatchToProps = dispatch => {
	return {
		triggerLoginUser: (email, password) => dispatch(userLogin({email, password}))
	};
}

// handles incoming state changes
const mapStateToProps = state => {
	const { fetching, login } = state;
	return { fetching, login };
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
