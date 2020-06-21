import {app} from "./app";
import logger from "./util/logger";
import {ENVIRONMENT, PORT} from "./util/secrets";

/**
 * Start Express server.
 */
const server = app.listen(PORT, (): void => {
  logger.info(`  App is running at http://localhost:${PORT} in ${ENVIRONMENT} mode ${ENVIRONMENT}`);
  logger.info("  Press CTRL-C to stop\n");
});

export default server;
