import bodyParser from 'body-parser';
import express, {Application} from 'express';

import {user} from './routes';

// Controllers (route handlers);

// import * as apiController from './controllers/api';

// API keys and Passport configuration

// Create Express server
const app: Application = express();

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// app.use((req, res, next) => {
//   res.locals.user = req.user;
//   next();
// });

/**
 * Primary app routes.
 */
app.use('/api/v1', user);

export {app};
