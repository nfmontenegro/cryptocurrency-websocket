import dotenv from 'dotenv';
import fs from 'fs';

import {logger} from '../app';

if (fs.existsSync('.env')) {
  logger.info('Using .env file to supply config environment variables');
  dotenv.config({path: '.env'});
} else {
  logger.info('Using .env.example file to supply config environment variables');
  dotenv.config({path: '.env.example'}); // you can delete this after you create your own .env file!
}

export const ENVIRONMENT = process.env.NODE_ENV;

if (!ENVIRONMENT) {
  logger.info('No client secret. Set SESSION_SECRET environment variable.');
  process.exit(1);
}
