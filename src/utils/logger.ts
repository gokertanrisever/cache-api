import winston from "winston";

// define the custom settings for each transport (console in this case)
const options: winston.LoggerOptions = {
  transports: [
		new winston.transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
      handleExceptions: true,
    }),
	],
};

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger(options);

if (process.env.NODE_ENV !== 'production') {
	logger.debug('Logging initialized at debug level');
}

export default logger;