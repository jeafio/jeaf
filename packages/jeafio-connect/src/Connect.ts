import { ConnectRequest } from './ConnectRequest';
import { makeRequest } from './functions/makeRequest';
import { HTTPResponse } from '@jeafio/http';

export class Connect extends ConnectRequest {

  public static get(uri: string): Connect {
    return new this('GET', uri);
  }

  public static post(uri: string): Connect {
    return new this('POST', uri);
  }

  public static put(uri: string): Connect {
    return new this('PUT', uri);
  }

  public static patch(uri: string): Connect {
    return new this('PATCH', uri);
  }

  public static delete(uri: string): Connect {
    return new this('DELETE', uri);
  }

  public static trace(uri: string): Connect {
    return new this('TRACE', uri);
  }

  public static options(uri: string): Connect {
    return new this('OPTIONS', uri);
  }

  public async send(): Promise<HTTPResponse> {
    let response;

    for (const interceptor of this.requestInterceptors) {
      response = await interceptor(this);
      if (response) {
        break;
      }
    }

    if (!response) {
      response = await makeRequest(this);
    }

    for (const interceptor of this.responseInterceptors) {
      const earlyResponse = await interceptor(this, response);
      if (earlyResponse) {
        return earlyResponse;
      }
    }

    return response;
  }
}