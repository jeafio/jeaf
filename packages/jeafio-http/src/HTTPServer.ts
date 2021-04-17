import { createServer, Server, IncomingMessage, ServerResponse } from 'http';

export class HTTPServer {
  private server: Server;

  constructor() {
    this.server = createServer(this.handleRequests.bind(this));
  }

  private handleRequests(req: IncomingMessage, res: ServerResponse): void {
    res.writeHead(404);
    res.end();
  }

  public listen(port: number, host?: string) {
    this.server.listen(port, host);
  }
}