import { HTTPResponse } from '@jeafio/http';
import { ConnectRequest } from './ConnectRequest';
import { makeRequest } from './functions/makeRequest';
import { HTTPIncomingResponse } from '@jeafio/http/src/HTTPIncomingResponse';

export class Connect extends ConnectRequest {

  public static get(uri: string): Connect {
    return new this('GET', uri);
  }

  public static post(uri: string): ConnectRequest {
    return new this('POST', uri);
  }

  public static put(uri: string): ConnectRequest {
    return new this('PUT', uri);
  }

  public static patch(uri: string): ConnectRequest {
    return new this('PATCH', uri);
  }

  public static delete(uri: string): ConnectRequest {
    return new this('DELETE', uri);
  }

  public static trace(uri: string): ConnectRequest {
    return new this('TRACE', uri);
  }

  public static options(uri: string): ConnectRequest {
    return new this('OPTIONS', uri);
  }

  public async send(): Promise<HTTPIncomingResponse> {
    return makeRequest(this);
  }
}