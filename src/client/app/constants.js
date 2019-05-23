/**
 * This file defines application level constants
 */
import { SERVER } from './statics';

export const SERVER_BASE_URL = SERVER;
export const APPLICATION_ROUTES = {
	// admin URLS
	USER_LOGIN: `${SERVER_BASE_URL}user/create`,
	BULK_UPLOAD: `${SERVER_BASE_URL}event/bulkUpload`,
	TOURNAMENT_CREATE: `${SERVER_BASE_URL}tournament/bulkUpload`,

};

export const navigationIndexer = {
	dashboard: 1,
	contactUs: 2,
};
