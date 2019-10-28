import * as mysql from 'mysql';
import { config } from './app.config';
import { logger } from './app.logger';

class Database {
  public connect() {
    const connection = mysql.createConnection({
      host: config.database.host,
      user: config.database.username,
      password: config.database.password,
      database: config.database.name,
      port: config.database.port
    });

    connection.connect((err: any) => {
      if (err) {
        throw new Error('error connecting: ' + err.stack);
      }

      logger.info('connected as id ' + connection.threadId);
    });

    return connection;
  }
}

export const database = new Database();
