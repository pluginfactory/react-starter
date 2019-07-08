/**
 * action reducer for dashboard admin page
 */
import {
	DASHBOARD_PAYLOAD
} from '../actions/actionTypes';

const defaultState = {
	statistics: undefined
};

export default (state=defaultState, { type, statistics=undefined }) => {
	switch(type) {
		case DASHBOARD_PAYLOAD:
			return Object.assign({}, state, { statistics });
		default:
			return state;
	}
}