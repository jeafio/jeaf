import { HTTPRequest } from '@jeafio/http';
import { RequestInterceptor } from './RequestInterceptor';
import { ResponseInterceptor } from './ResponseInterceptor';

export class ConnectRequest extends HTTPRequest {

  protected readonly params: Record<string, string> = {};
  protected readonly requestInterceptors: RequestInterceptor[] = [];
  protected readonly responseInterceptors: ResponseInterceptor[] = [];

  public setParam(name: string, value: string): this {
    this.params[name] = value;
    return this;
  }

  public getParam(name: string): string | undefined {
    return this.params[name];
  }

  public getParams(): Record<string, string> {
    return { ...this.params };
  }

  public addRequestInterceptor(int: RequestInterceptor): this {
    this.requestInterceptors.push(int);
    return this;
  }

  public addResponseInterceptor(int: ResponseInterceptor): this {
    this.responseInterceptors.push(int);
    return this;
  }
}