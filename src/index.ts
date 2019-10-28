import { app } from './app/app';
import { config } from './app/app.config';
import { logger } from './app/app.logger';

logger.info('Starting application ...');
app.init(config.server.port);
