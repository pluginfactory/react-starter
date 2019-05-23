import { SWITCH_NAVIGATION } from '../actions/actionTypes';


const defaultState= {
	active: 1
};

export default (state=defaultState, { type, active}) => {
	switch(type) {
		case SWITCH_NAVIGATION: 
			return Object.assign({}, state, { active });
		default: return state;
	}
}
