import bodyParser from "body-parser";
import express, {Application} from "express";

import {user} from "./routes";
import {errorHandler} from "./middlewares";

// Create Express server
const app: Application = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

/**
 * Primary app routes.
 */
app.use("/api/v1", user);

app.use(errorHandler);

export {app};
