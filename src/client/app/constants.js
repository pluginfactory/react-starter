/**
 * This file defines application level constants
 */
import { SERVER } from './statics';

export const SERVER_BASE_URL = SERVER;
export const APPLICATION_ROUTES = {
	// admin URLS
	ADMIN_LOGIN: `${SERVER_BASE_URL}admin/authenticate`,
	DASHBOARD_STATISTICS: `${SERVER_BASE_URL}admin/statistics`,
	USERS_LIST: `${SERVER_BASE_URL}admin/listUsers`,
	DELETE_USER: `${SERVER_BASE_URL}admin/deleteUser`,
	BLOCK_USER: `${SERVER_BASE_URL}admin/blockUser`,
	TRANSACTION_LIST: `${SERVER_BASE_URL}admin/transaction`,
	PUSH_NOTIFICATIONS: `${SERVER_BASE_URL}admin/globalNotification`,
	NEWS_CREATE: `${SERVER_BASE_URL}admin/news`,
};

export const navigationIndexer = {
	dashboard: 1,
	users: 2,
	transaction: 3,
	pushNotification: 4,
	news: 5,
	constants: 6,
};
