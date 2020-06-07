import express, {Application, Request, Response} from 'express';
import bodyParser from 'body-parser';

// import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";

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

app.get('/', (_request: Request, response: Response) => response.send('hello'));
// app.use((req, res, next) => {
//   res.locals.user = req.user;
//   next();
// });

/**
 * Primary app routes.
 */

/**
 * API examples routes.
 */

export default app;
