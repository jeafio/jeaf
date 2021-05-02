import { Readable } from 'stream';
import { HTTPRequestMethod } from '@jeafio/http';

export class MockedMessage extends Readable {
  public declare body: Buffer;
  public declare url: string;
  public declare method: HTTPRequestMethod;
  public declare headers: Record<string, string | string[]>;
  public declare statusCode: number;

  private sent = false;

  _read(): void {
    if (!this.sent) {
      this.sent = true;
      this.push(Buffer.from(this.body));
    } else {
      this.push(null);
    }
  }
}