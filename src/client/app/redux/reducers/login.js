import { LOGIN_PAYLOAD } from '../actions/actionTypes';


const defaultState=null;

export default (state=defaultState, { type, response={}, status}) => {
	switch(type) {
		case LOGIN_PAYLOAD: {
			return response;
		};
		default: return state;
	}
}
