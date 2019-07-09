import axios from 'axios';
import { DASHBOARD_PAYLOAD } from './actionTypes';
import {
	fetchAction,
	error,
} from '.';
import { APPLICATION_ROUTES } from '../../constants';

const headers = {
	'Content-Type': 'application/json',
	Authorization: localStorage.adminAccessToken,
};

export default () => (dispatch) => {
	dispatch(fetchAction({ fetching: true }));

	axios.post(APPLICATION_ROUTES.DASHBOARD_STATISTICS, {}, { headers })
		.then((response) => {
			const { data: { data, code, message } } = response;
			if (code === 100) {
				dispatch({ type: DASHBOARD_PAYLOAD, statistics: data });
			} else {
				/**
				 * @todo handler for errors
				 */
				dispatch(error({ error: message }));
			}
			dispatch(fetchAction({ fetching: false }));
		}).catch((err) => {
			/**
			 * @todo handle the error
			 */
			dispatch(error({ error: 'Error while fetching the statistics data.' }));
			dispatch(fetchAction({ fetching: false }));
		});
};