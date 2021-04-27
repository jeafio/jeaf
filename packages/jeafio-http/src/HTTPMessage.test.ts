import { HTTPMessage } from './HTTPMessage';
import { getStream } from '../tests/util/getStream';
import { Readable } from 'stream';

describe('HTTPMessage', function() {

  let message: HTTPMessage;

  beforeEach(() => {
    message = new HTTPMessage();
  });

  it('should set header', () => {
    message.setHeader('X-Test-Header', '1234');
    expect(message.getHeader('X-Test-Header')).toBe('1234');
  });

  it('should delete header by name', () => {
    message.setHeader('X-Test-Header', '1234');
    expect(message.getHeader('X-Test-Header')).toBe('1234');
    message.deleteHeader('X-Test-Header');
    expect(message.getHeader('X-Test-Header')).toBeUndefined();
  });

  it('should return headers', () => {
    message.setHeader('X-Test-Header', '1234');
    expect(message.getHeaders()).toEqual({
      'X-Test-Header': '1234',
    });
  });

  it('should return true if headers exists', () => {
    message.setHeader('X-Test-Header', '1234');
    expect(message.hasHeader('X-Test-Header')).toBe(true);
  });

  it('should return false if headers exists', () => {
    expect(message.hasHeader('X-Test-Header')).toBe(false);
  });

  it('should set body as text', async () => {
    message.setText('1234');
    const body = await getStream(message.getBody());
    expect(body).toBe('1234');
  });

  it('should set body as json', async () => {
    message.setJson({ data: '1234' });
    const body = await getStream(message.getBody());
    expect(body).toBe('{"data":"1234"}');
  });

  it('should set body as stream', async () => {
    const stream = Readable.from('1234');
    message.setBody(stream);
    const body = await getStream(message.getBody());
    expect(body).toBe('1234');
  });

  it('should return undefined if no body is set', async function() {
    expect(await message.getText()).toBeUndefined();
    expect(await message.getJSON()).toBeUndefined();
    expect(message.getBody()).toBeUndefined();
  });

});