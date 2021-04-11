import { HttpMessage } from './HttpMessage';

describe('HttpMessage', () => {
  let message: HttpMessage;

  beforeEach(() => {
    message = new HttpMessage();
  });

  it('should set the value of a header', () => {
    message.setHeader('Content-Type', 'application/json');
    expect(message.getHeader('Content-Type')).toBe('application/json');
  });

  it('should delete a header', () => {
    message.setHeader('Content-Type', 'application/json');
    expect(message.getHeader('Content-Type')).toBe('application/json');
    message.removeHeader('Content-Type');
    expect(message.getHeader('Content-Type')).toBeUndefined();
  });

  it('should return true if a header exists', () => {
    message.setHeader('Content-Type', 'application/json');
    expect(message.hasHeader('Content-Type')).toBe(true);
  });

  it('should return false if a header does not exist', () => {
    expect(message.hasHeader('Content-Type')).toBe(false);
  });

  it('should return all headers', () => {
    message.setHeader('Content-Type', 'application/json');
    message.setHeader('Content-Length', 1000);
    expect(message.getAllHeaders()).toEqual({
      'Content-Type': 'application/json',
      'Content-Length': '1000',
    });
  });

  it('should convert numbers to strings when settings headers', () => {
    message.setHeader('Content-Length', 1234);
    expect(message.getHeader('Content-Length')).toBe('1234');
  });

  it('should set the value of a parameter', () => {
    message.setParameter('filter', 'abc');
    expect(message.getParameter('filter')).toBe('abc');
  });

  it('should delete a parameter', () => {
    message.setParameter('filter', 'abc');
    expect(message.getParameter('filter')).toBe('abc');
    message.removeParameter('filter');
    expect(message.getParameter('filter')).toBeUndefined();
  });

  it('should return true if a parameter exists', () => {
    message.setParameter('filter', 'abc');
    expect(message.hasParameter('filter')).toBe(true);
  });

  it('should return false if a parameter does not exist', () => {
    expect(message.hasParameter('filter')).toBe(false);
  });

  it('should return all parameters', () => {
    message.setParameter('filter', 'abc');
    message.setParameter('t', '1234');
    expect(message.getAllParameters()).toEqual({
      filter: 'abc',
      t: '1234',
    });
  });

  it('should convert numbers to strings when settings parameters', () => {
    message.setParameter('filter', 1234);
    expect(message.getParameter('filter')).toBe('1234');
  });
});
