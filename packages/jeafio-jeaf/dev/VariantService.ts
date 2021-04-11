import { Application } from '../src/Application';
import { Autowired, Component } from '@jeafio/dicontainer';
import { Logger } from '@jeafio/logger';
import { Value } from '@jeafio/profile';
import { ComponentScan } from '../src/decorator/ComponentScan';

@Component()
@ComponentScan(['./config'])
export class VariantService extends Application {
  @Autowired()
  private declare logger: Logger;

  @Value('application.name')
  private declare variantName: string;

  protected onStart(): void {
    this.logger.info('APPLICATION STARTED');
    this.logger.info(this.variantName);
  }

  protected onShutdown(): void {
    this.logger.info('APPLICATION SHUTDOWN');
  }
}

const app = Application.run(VariantService, ['', '', 'local,db']);
app.shutdown();
