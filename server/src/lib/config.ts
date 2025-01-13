import dotenv from 'dotenv';

dotenv.config();

/**
 * MongoDB URI
 * @type string
 * @description MongoDB connection URI
 * @default mongodb://localhost:27017/event-management-platform
 */
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/event-management-platform';

/**
 * Port
 * @type number
 * @description Port number
 * @default 3000
 */
export const PORT = process.env.PORT || 3000;

/**
 * JWT Secret
 * @type string
 * @description JWT secret
 * @default 'secret'
 */
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';

/**
 * JWT expiration
 * @type string
 * @description JWT expiration
 * @default 7d
 */
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '7d';

/**
 * Node environment
 * @type string
 * @description Node environment
 * @default development
 */
export const NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Client URL
 * @type string
 * @description Client URL
 * @default http://localhost:5173
 */
export const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';