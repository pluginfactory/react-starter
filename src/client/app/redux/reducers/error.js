import { ERROR } from '../actions/actionTypes';

const defaultState = { error: undefined };

export default (state=defaultState, {
	type,
	error,
}) => {
	switch(type) {
		case ERROR:
			return Object.assign({}, state, { error });
		default:
			return state;
	}
}