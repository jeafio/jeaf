export class HTTPResponse {
  public code: number;

  constructor() {
    this.code = 200;
  }

  public setCode(code: number): this {
    this.code = code;
    return this;
  }
}