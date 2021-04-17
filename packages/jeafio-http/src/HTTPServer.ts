import { createServer, Server, IncomingMessage, ServerResponse } from 'http';
import { HTTPRouter } from './HTTPRouter';
import { HTTPRequest } from './HTTPRequest';

export class HTTPServer {
  private server: Server;
  private router: HTTPRouter;

  constructor() {
    this.server = createServer(this.handleRequests.bind(this));
    this.router = new HTTPRouter('/');
  }

  private async handleRequests(req: IncomingMessage, res: ServerResponse): Promise<void> {
    res.writeHead(404);
    const request = new HTTPRequest(req);
    const session = {};
    const response = await this.router.execute(request, session);
    const statusCode = response.getStatusCode();
    const headers = response.getHeaders();

    res.writeHead(statusCode, headers);

    res.end();
  }

  public listen(port: number, host?: string): void {
    this.server.listen(port, host);
  }
}