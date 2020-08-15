import bodyParser from "body-parser";
import express, {Application} from "express";
import cors from "cors";
import morgan from "morgan";

import userRoutes from "./routes/user";
import postRoutes from "./routes/post";
import {errorHandler} from "./middlewares";

// Create Express server
const app: Application = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

/**
 * Primary app routes.
 */
app.use("/api/v1", userRoutes);
app.use("/api/v1", postRoutes);

app.use(errorHandler);

export {app};
