import {app} from './app';
import logger from './util/logger';
import {ENVIRONMENT} from './util/secrets';

/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), (): void => {
  logger.info(`  App is running at http://localhost:%d in ${ENVIRONMENT} mode`, app.get('port'));
  logger.info('  Press CTRL-C to stop\n');
});

export default server;
