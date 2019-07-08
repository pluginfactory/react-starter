/**
 * This file defines application level constants
 */
import { SERVER } from './statics';

export const SERVER_BASE_URL = SERVER;
export const APPLICATION_ROUTES = {
	// admin URLS
	ADMIN_LOGIN: `${SERVER_BASE_URL}admin/authenticate`,
	USERS_LIST: `${SERVER_BASE_URL}admin/listUsers`,
	DELETE_USER: `${SERVER_BASE_URL}admin/deleteUser`,
	BLOCK_USER: `${SERVER_BASE_URL}admin/blockUser`,
	DASHBOARD_STATISTICS: `${SERVER_BASE_URL}admin/statistics`,
	PUSH_NOTIFICATIONS: `${SERVER_BASE_URL}admin/globalNotification`,
};

export const navigationIndexer = {
	dashboard: 1,
	users: 2,
	transaction: 3,
	notifications: 4,
	news: 5,
};
