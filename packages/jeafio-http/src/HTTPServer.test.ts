import { HTTPServer } from './HTTPServer';
import { HTTPRouter } from './HTTPRouter';
import request from 'supertest';
import { HTTPResponse } from './HTTPResponse';
import { HTTPCookie } from './HTTPCookie';

describe('HTTPServer', () => {

  it('should start node http server on listen', () => {
    const router = new HTTPRouter('/');
    const server = new HTTPServer(router);
    const nodeServer = server.getServer();
    jest.spyOn(nodeServer, 'listen').mockImplementation();
    server.listen(8080, 'localhost');
    expect(nodeServer.listen).toHaveBeenCalledWith(8080, 'localhost');
  });

  it('should return 404 by default', (done) => {
    const router = new HTTPRouter('/');
    const server = new HTTPServer(router).getServer();
    request(server)
      .get('/')
      .expect(404, done);
  });

  it('should return json on a simple get request', (done) => {
    const router = new HTTPRouter('/');
    router.get('/', async () => new HTTPResponse(200).setJson({hello: 'world'}));
    const server = new HTTPServer(router).getServer();
    request(server)
      .get('/')
      .expect('Content-Type', 'application/json')
      .expect('{"hello":"world"}')
      .expect(200, done);
  });

  it('should send custom headers', (done) => {
    const router = new HTTPRouter('/');
    router.get('/', async () => new HTTPResponse(200).setHeader('X-Test', '1234'));
    const server = new HTTPServer(router).getServer();
    request(server)
      .get('/')
      .expect('X-Test', '1234')
      .expect(200, done);
  });

  it('should set cookies', (done) => {
    const router = new HTTPRouter('/');
    router.get('/', async () => new HTTPResponse(200).addCookie(new HTTPCookie('jwt', '1234')));
    const server = new HTTPServer(router).getServer();
    request(server)
      .get('/')
      .expect('set-cookie', 'jwt=1234;')
      .expect(200, done);
  });
});