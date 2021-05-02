import { ConnectRequest } from './ConnectRequest';

describe('ConnectRequest', function() {
  let connect: ConnectRequest;

  beforeEach(() => {
    connect = new ConnectRequest('GET', '/a');
  });

  it('should set request param', function() {
    connect.setParam('q', '1234');
    expect(connect.getParam('q')).toBe('1234');
  });

  it('should return all request params', function() {
    connect.setParam('q', '1234');
    connect.setParam('t', 'abcd');
    expect(connect.getParams()).toEqual({
      'q': '1234',
      't': 'abcd'
    });
  });
});