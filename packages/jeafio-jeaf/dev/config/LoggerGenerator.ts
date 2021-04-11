import { Component, Generator } from '@jeafio/dicontainer';
import { Logger } from '@jeafio/logger';
import { format, transports } from 'winston';

@Component()
class LoggerGenerator extends Logger {
  @Generator()
  public generateLogger(): Logger {
    const colorizer = format.colorize();
    return new Logger({
      level: 'debug',
      transports: [
        new transports.Console({
          format: format.combine(
            format.timestamp(),
            format.simple(),
            format.printf((msg) => {
              const logLevel = colorizer.colorize(
                msg.level,
                `${msg.level.toUpperCase()}${new Array(5 - msg.level.length).fill(' ').join('')}`,
              );
              return `[${logLevel}] ${msg.timestamp} ${msg.message}`;
            }),
          ),
        }),
      ],
    });
  }
}
