import * as dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  BASE_URL: process.env.BASE_URL || 'https://www.udacity.com',
  USERNAME: process.env.USERNAME || 'default_user',
  PASSWORD: process.env.PASSWORD || 'default_password',
};
