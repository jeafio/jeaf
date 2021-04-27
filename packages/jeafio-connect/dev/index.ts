import { Connect } from '../src/Connect';
import { HTTPCookie } from '@jeafio/http';


(async () => {
  const response = await Connect.get('/api/v1')
    .setHeader('Content-Type', 'application/json')
    .addCookie(new HTTPCookie('a', 'b'))
    .setQuery('t', new Date().getTime())
    .sendText('Text');

  response.getBody()
})();