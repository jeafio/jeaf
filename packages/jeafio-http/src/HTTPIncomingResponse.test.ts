import { HTTPIncomingResponse } from './HTTPIncomingResponse';
import { IncomingMessageFixture } from '../tests/fixtures/IncomingMessageFixture';

describe('HTTPIncomingResponse', function() {
  let response: HTTPIncomingResponse;

  beforeEach(() => {
    response = new HTTPIncomingResponse(IncomingMessageFixture('GET'));
  });

  it('should return multiple cookies', function() {
    expect(response.getCookies()).toEqual([
      {
        "config": {},
        "name": "a",
        "value": "b"
      },
      {
        "config": {},
        "name": "c",
        "value": "d"
      }
    ]);
  });

  it('should return empty array if no cookies are set', function() {
    const message = IncomingMessageFixture('GET');
    delete message.headers['set-cookie'];
    const response = new HTTPIncomingResponse(message);
    expect(response.getCookies());
  });

  it('should return single cookie', function() {
    const message = IncomingMessageFixture('GET');
    message.headers['set-cookie'] = ['a=b'];
    const response = new HTTPIncomingResponse(message);
    expect(response.getCookies());
  });

  it('should have status code in response', function() {
    expect(response.getStatusCode()).toBe(200);
  });

  it('should return original response', function() {
    const message = IncomingMessageFixture('GET');
    const response = new HTTPIncomingResponse(message);
    expect(response.getResponse()).toBe(message);
  });
});