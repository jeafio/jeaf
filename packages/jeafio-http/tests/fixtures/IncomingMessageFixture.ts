import { MockedMessage } from '../util/MockedMessage';
import { IncomingMessage } from 'http';
import { HTTPRequestMethod } from '../../src/HTTPRequestMethod';

export const IncomingMessageFixture: (method?: HTTPRequestMethod) => IncomingMessage = (method: HTTPRequestMethod = 'GET') => {
  const message = new MockedMessage();
  message.url = '/a/b/c?a=1&b=2';
  message.method = method;
  message.body = Buffer.from('{"name": "test"}')
  message.headers = {
    'user-agent': 'PostmanRuntime/7.26.10',
    'accept': '*/*',
    'postman-token': '2f435d9e-d1c8-47c8-a1de-45b05bb5b81e',
    'host': 'localhost:8080',
    'accept-encoding': 'gzip, deflate, br',
    'connection': 'keep-alive',
    'cookie': 'a=b;c=d',
  }
  return message as unknown as IncomingMessage;
};
