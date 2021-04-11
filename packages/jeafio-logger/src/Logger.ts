import { createLogger, LeveledLogMethod, Logger as WinstonLogger, LoggerOptions } from 'winston';

export class Logger {
  private readonly logger: WinstonLogger;

  constructor(config: LoggerOptions) {
    this.logger = createLogger(config);
    this.error = this.logger.error.bind(this.logger);
    this.debug = this.logger.debug.bind(this.logger);
    this.warn = this.logger.warn.bind(this.logger);
    this.info = this.logger.info.bind(this.logger);
  }
}

export interface Logger {
  debug: LeveledLogMethod;
  error: LeveledLogMethod;
  warn: LeveledLogMethod;
  info: LeveledLogMethod;
}
