/**
 * the only generic error and success reducer for the notifications
 * @author gaurav sharma
 * @since 14th March 2019
 */
import { ERROR, SUCCESS } from '../actions/actionTypes';

const defaultState = {
	success: undefined,
	error: undefined,
};

export default (state = defaultState, {
	type,
	success,
	error,
}) => {
	switch (type) {
		case ERROR:
			return Object.assign({}, state, { error });
		case SUCCESS:
			return Object.assign({}, state, { success });
		default:
			return state;
	}
};
