import { Command, Program } from '@jeafio/cli';
import { Container } from '@jeafio/dicontainer';
import { Logger } from '@jeafio/logger';
import { Profile } from '@jeafio/profile';
import { ApplicationConfig } from './ApplicationConfig';

export class Application extends Program {
  private readonly profileDirectory: string = './profiles';

  constructor(config?: ApplicationConfig) {
    super(config?.version);
    if (config) {
      if (config.profileDirectory) {
        this.profileDirectory = config.profileDirectory;
      }
    }
  }

  @Command('main [profiles]')
  private main(profiles: string): void {
    const profile = new Profile('./profiles', profiles.split(','));
    Container.registerInstance(Profile, profile);
    const logger = Container.resolve(Logger);
    logger.info('=========================================================================');
    logger.info(`  Starting application with profiles: ${profiles.split(',').join(', ')}`);
    logger.info('=========================================================================');
    this.onStart();
  }

  protected onStart(): void {
    return;
  }

  protected onShutdown(): void {
    return;
  }

  public async shutdown(): Promise<void> {
    this.onShutdown();
    return;
  }

  public static run(app: new (...args: any[]) => Application, args?: string[]): Application {
    const instance = Container.resolve(app);
    instance.run(args || process.argv);
    return instance;
  }
}
