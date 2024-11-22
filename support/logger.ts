import winston from 'winston';

// Create the logger
const logger = winston.createLogger({
  level: 'info', // You can adjust this to 'debug', 'warn', 'error' based on your needs
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    }),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({
      filename: 'logs/test-results.log',
      format: winston.format.simple(),
    }),
  ],
});

export default logger;
