import * as appRoot from 'app-root-path';
import * as winston from 'winston';

export const logger = winston.createLogger({
  exceptionHandlers: [
    new winston.transports.File({ filename: `${appRoot}/logs/exceptions.log` })
  ],
  exitOnError: false,
  transports: [
    new winston.transports.File({
      level: 'info',
      format: winston.format.json(),
      filename: `${appRoot}/logs/infos.log`,
      handleExceptions: true,
      maxsize: 5242880, // 5MB
      maxFiles: 50
    }),
    new winston.transports.Console({
      handleExceptions: true
    })
  ]
});
