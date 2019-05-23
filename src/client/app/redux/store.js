/**
 * The application store
 * @author gaurav sharma
 * @since 9th January 2019
 */

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers';

// enhances combines all the middlewares.
const enhancer = process.env.NODE_ENV === 'production' ? applyMiddleware(thunk) : applyMiddleware(thunk, createLogger());

export default (initialState = {}) => createStore(combineReducers({
	fetching: reducers.fetchReducer,
	login: reducers.loginReducer,
	events: reducers.eventsReducer,
	tournaments: reducers.tournamentReducer,
	navigation: reducers.navigationReducer,
	error: reducers.errorReducer,
	routing: routerReducer,
}), initialState, enhancer);
