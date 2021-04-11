import { getClassConfig } from './functions/getClassConfig';
import { ConnectConfig } from './ConnectConfig';
import { getRequestConfig } from './functions/getRequestConfig';

export class Connect {
  constructor() {
    this.createRequests();
  }

  private createRequests() {
    const requests = Reflect.getMetadata('http:requests', this.constructor);
    const classConfig = getClassConfig(this.constructor);
    for (const propertyKey of requests) {
      (this as Record<string, unknown>)[propertyKey] = this.buildRequest(classConfig, propertyKey);
    }
  }

  private buildRequest(classConfig: ConnectConfig, propertyKey: string) {
    const requestConfig = getRequestConfig(classConfig, this.constructor, propertyKey);
    console.log(requestConfig);
  }
}
