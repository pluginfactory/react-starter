/**
 * action reducer for users listing admin page
 */
// import { APPLICATION_ROUTES } from '../../constants';
import { SUCCESS, ERROR } from '../actions/actionTypes';

const defaultState = {
	error: undefined,
	success: undefined,
};
/**
 * default state handler/reducer for entity
 */
export default (state = defaultState, {
	type,
	success,
	error,
}) => {
	switch (type) {
		case SUCCESS:
			return Object.assign({}, state, { success });
		case ERROR:
			return Object.assign({}, state, { error });
		default:
			return state;
	}
};
