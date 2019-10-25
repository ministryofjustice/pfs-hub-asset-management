const { createLogger, format, transports } = require('winston');

const { combine, timestamp, json } = format;

const logger = createLogger({
  level: 'debug',
  format: combine(timestamp(), json()),
  defaultMeta: {
    service: 'asset-management',
  },
  transports: [new transports.Console({ format: format.logstash() })],
});

module.exports = logger;
