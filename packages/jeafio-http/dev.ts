import { HTTPServer } from './src/HTTPServer';
import { HTTPRouter } from './src/HTTPRouter';
import { HTTPResponse } from './src/HTTPResponse';
import { HTTPCookie } from './src/HTTPCookie';

const router = new HTTPRouter('/');

router.post('/', async (req) => {
  return new HTTPResponse(200)
    .setJson({ success: true, request: await req.getJSON() })
    .addCookie(new HTTPCookie('jwt', '1234'))
    .addCookie(new HTTPCookie('jwt2', '1234'));
});


const server = new HTTPServer(router);
server.listen(8080);