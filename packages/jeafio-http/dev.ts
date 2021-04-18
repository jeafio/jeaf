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



// Bare       => 1319114
// Fastify    => 1187312   1082890
// HTTPServer =>  906079    561600
// Express    =>  315681    304745

// TODO: https://en.wikipedia.org/wiki/Radix_tree
// TODO: https://www.npmjs.com/package/secure-json-parse
// TODO: https://www.npmjs.com/package/fast-json-stringify