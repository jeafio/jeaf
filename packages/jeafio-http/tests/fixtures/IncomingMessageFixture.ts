import { IncomingMessage } from 'http';

export const IncomingMessageFixture: Partial<IncomingMessage> = {
  url: '/a/b/c?a=1&b=2',
  method: 'GET',
  headers: {
    "user-agent": "PostmanRuntime/7.26.10",
    "accept": "*/*",
    "postman-token": "2f435d9e-d1c8-47c8-a1de-45b05bb5b81e",
    "host": "localhost:8080",
    "accept-encoding": "gzip, deflate, br",
    "connection": "keep-alive",
    "cookie": "a=b;c=d"
  }
};