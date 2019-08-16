/**
 * @desc this is the admin component of the application.
 * @author gaurav sharma
 */
import React, { Component } from 'react';
import {
	Container,
	Row,
	Col,
} from 'reactstrap';
import { connect } from 'react-redux';
import { userLogin } from '../../redux/actions';
import { toast, ToastContainer } from 'react-toastify';
import FontAwesome from 'react-fontawesome';
import BackgroundImage from '../../assets/images/background.png';

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

		if (bodyContainer && loginContainer) {
			if (bodyContainer.clientWidth >= 720) {
				const loginMargin = (bodyContainer.clientHeight - loginContainer.clientHeight -100)/2;
				loginContainer.style.marginTop = `${loginMargin}px`;
			} else {
				loginContainer.style.marginTop='10px';
			}
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
			<Container fluid className='landing-page'>
				<Row className='landing-page'>
					<Col md={12} className='landing-page'>
						<img src={BackgroundImage} width='100%' height='100%'/>
					</Col>
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
