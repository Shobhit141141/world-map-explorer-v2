/**
 * @file db.ts
 * @description This file is responsible for setting up and configuring the connection to the PostgreSQL database using Sequelize.
 */

import dotenv from 'dotenv';
import { CONSTANTS } from './constants';
import { logger, logSuccess } from '../utils/logger';
import { Sequelize } from 'sequelize';
import pg from 'pg';
dotenv.config();

/**
 * @constant {Sequelize} sequelize - An instance of Sequelize configured to connect to the PostgreSQL database.
 * @property {string} database - The name of the PostgreSQL database.
 * @property {string} username - The username for the PostgreSQL database.
 * @property {string} password - The password for the PostgreSQL database.
 * @property {string} host - The host address of the PostgreSQL database.
 * @property {number} port - The port number for the PostgreSQL database.
 * @property {string} dialect - The SQL dialect of the database.
 * @property {object} dialectModule - The module for the PostgreSQL dialect.
 * @property {boolean} logging - Flag to enable/disable logging.
 * @property {object} dialectOptions - Additional options for the PostgreSQL dialect.
 * @property {object} dialectOptions.ssl - SSL configuration for the PostgreSQL connection.
 * @property {boolean} dialectOptions.ssl.require - Flag to require SSL.
 * @property {boolean} dialectOptions.ssl.rejectUnauthorized - Flag to reject unauthorized SSL certificates.
 */

/**
 * Authenticates the Sequelize instance and logs the connection status.
 * If the connection is successful, it logs a success message.
 * If the connection fails, it logs an error message.
 * 
 * @returns {Promise<void>} - A promise that resolves when the database is authenticated and synchronized.
 */


const sequelize = new Sequelize({
  database: CONSTANTS.POSTGRES.DATABASE,
  username: CONSTANTS.POSTGRES.USERNAME,
  password: CONSTANTS.POSTGRES.PASSWORD,
  host: CONSTANTS.POSTGRES.HOST,
  port: Number(CONSTANTS.POSTGRES.PORT) || 5432,
  dialect: 'postgres',
  dialectModule: pg,
  logging: false,
  dialectOptions: {
    ssl: {
      require: false,
      rejectUnauthorized: false,
    },
  },
});

sequelize
  .authenticate()
  .then(() => {
    logger(' Postgres ', 'Database connected successfully', '##1e8de3', '#FFFFFF');
    return sequelize;
  })
  .then(() => {
    logSuccess('Database synchronized');
  })
  .catch((err) => {
    console.error(
      'Error connecting to PostgreSQL or synchronizing the database:',
      err as Error,
    );
  });

export default sequelize;
