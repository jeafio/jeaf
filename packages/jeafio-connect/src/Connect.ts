import { HTTPCookie, HTTPRequestMethod, HTTPResponse } from '@jeafio/http';
import { Readable } from 'stream';

export class Connect {
  private headers: Record<string, string> = {};
  private queries: Record<string, string> = {};
  private cookies: HTTPCookie[] = [];
  private method: HTTPRequestMethod;
  private uri: string;

  constructor(method: HTTPRequestMethod, uri: string) {
    this.method = method;
    this.uri = uri;
  }

  public static get(uri: string): Connect {
    return new Connect('GET', uri);
  }

  public async send(body: Readable): Promise<HTTPResponse> {
    return new HTTPResponse();
  }

  public sendText(text: string): Promise<HTTPResponse> {
    return this.send(Readable.from(text));
  }

  public setJson(object: object): Promise<HTTPResponse> {
    this.setHeader('Content-Type', 'application/json');
    return this.sendText(JSON.stringify(object));
  }

  public addCookie(cookie: HTTPCookie): this {
    this.cookies.push(cookie);
    return this;
  }

  public setQuery(name: string, value: string | number | boolean): this {
    this.queries[name] = value.toString();
    return this;
  }

  public setHeader(name: string, value: string | number | boolean): this {
    this.headers[name] = value.toString();
    return this;
  }
}