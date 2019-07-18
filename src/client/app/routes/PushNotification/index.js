/**
 * post details page
 * @author gaurav sharma
 * @since 16th January 2019
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { APPLICATION_ROUTES, navigationIndexer } from '../../constants';
import {
	genericHitEndpoint,
	switchNavigation,
	nullifyError,
	nullifySuccess,
} from '../../redux/actions';
import './index.scss';
/**
 * This component is used for push notification
 */
class PushNotification extends Component {

	constructor(props) {
		super(props);
	}
	componentWillMount() {
		const { triggerSwitchNavigation, triggerGenericHitEndpoint } = this.props;
		triggerSwitchNavigation(navigationIndexer.notifications);
		triggerGenericHitEndpoint();
	}
	/**
	 * Things to do on component update.
	 */
	componentDidUpdate() {
		document.title = 'Push Notifications';
	}
	componentDidMount() {
		document.title = 'Push Notifications';
	}

	render() {
		const {
			props: {
				notifications: {
					error,
					success,
				},
				triggerGenericHitEndpoint,
				triggerNullifyError,
				triggerNullifySuccess,
			},
		} = this;

		if (error) {
			toast.dismiss();
			triggerNullifyError();
			toast.error(error);
		}
		if (success) {
			toast.dismiss();
			triggerNullifySuccess();
			toast.success(success);
		}
		return <section>
			<ToastContainer />
			<section className='container-fluid'>
				<h1>Push Notifications</h1>
				<input ref={title => this.title = title} type='text' className='form-control' placeholder='Title for the notification'/>
				<input ref={subtitle => this.subtitle = subtitle} type='text' className='form-control' placeholder='Text for the notification' /><br/>
				<button className='btn btn-primary' onClick={() => {
					triggerGenericHitEndpoint(this.title.value, this.subtitle.value)
				}}>Send</button>
			</section>
		</section>;
	}
};

/**
 * the available dispath functions
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => {
	return {
		triggerGenericHitEndpoint: (title, subtitle) => dispatch(genericHitEndpoint({
			endpoint: APPLICATION_ROUTES.PUSH_NOTIFICATIONS,
			payload: { title, subtitle },
			customDispatchers: [() => alert('Sent the push notifiation alert to the background service.')],
		})),
		triggerSwitchNavigation: active => dispatch(switchNavigation({ active })),
		triggerNullifyError: () => dispatch(nullifyError()),
		triggerNullifySuccess: () => dispatch(nullifySuccess()),
	};
};

const mapStateToProps = state => {
	const { fetching, notifications } = state;
	return { fetching, notifications };
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PushNotification);