import dotenv from 'dotenv';
dotenv.config();
export const CONSTANTS = {
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  POSTGRES: {
    DATABASE: process.env.DB_NAME || 'zendalona',
    USERNAME: process.env.DB_USER || 'world_map_explorer',
    PASSWORD: process.env.DB_PASSWORD || 'password',
    HOST: process.env.DB_HOST || 'localhost',
    PORT: Number(process.env.DB_PORT) || 5432,
  },
  NODE_ENV: process.env.NODE_ENV || 'dev',
};
