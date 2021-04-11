import { HttpStatusCode } from './HttpStatusCode';

export class HttpError {
  public readonly status: string;
  public readonly errors: string[];

  constructor(code: HttpStatusCode, errors: string[]) {
    this.status = HttpStatusCode[code];
    this.errors = errors;
  }
}
