import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { HTTPRouter } from './HTTPRouter';
import { HTTPIncomingRequest } from './HTTPIncomingRequest';

export class HTTPServer {
  private readonly server: Server;
  private readonly router: HTTPRouter;

  constructor(router: HTTPRouter) {
    this.server = createServer(this.handleRequests.bind(this));
    this.router = router;
  }

  private async handleRequests(req: IncomingMessage, res: ServerResponse): Promise<void> {
    res.writeHead(404);
    const request = new HTTPIncomingRequest(req);
    const session = {};
    const response = await this.router.execute(request, session);
    const statusCode = response.getStatusCode();

    const cookies = response.getCookies();

    if (cookies.length > 0) {
      response.setHeader('Set-Cookie', cookies.map((cookie) => cookie.toString()))
    }

    const headers = response.getHeaders();

    res.writeHead(statusCode, headers);

    const body = response.getBody();
    if (body) {
      body.pipe(res);
    } else {
      res.end();
    }
  }

  public getServer(): Server {
    return this.server;
  }

  public listen(port: number, host?: string): void {
    this.server.listen(port, host);
  }
}