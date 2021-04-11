import { HttpRequest } from '@jeafio/http/src/HttpRequest';
import { HttpRequestMethod, RequestPath } from '@jeafio/http';
import { Connect } from './src/Connect';

export * from './src/Connect';

interface RequestConfig {
  method: HttpRequestMethod;
  path: string;
}

const connect = new Connect();

function createRequest(config: RequestConfig): Promise<HttpRequest> {}

class UserClient {
  public getUsers(): Promise<HttpRequest> {
    return connect.createRequest({
      method: 'GET',
      path: '/api/users',
    });
  }
}
