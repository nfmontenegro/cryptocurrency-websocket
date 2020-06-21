import bodyParser from "body-parser";
import express, {Application, Response, Request, NextFunction} from "express";

import {user} from "./routes";
import errorResponseMessage from "./util/response-parser";

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

app.use((error: any, _req: Request, res: Response, _next: NextFunction): any => {
  const errorMessage = errorResponseMessage(error, 500);
  return res.status(500).send(errorMessage);
});

export {app};
