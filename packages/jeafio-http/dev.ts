import {createServer} from 'http';

const server = createServer((req) => {
  console.log(req);
});
server.listen(8080);


