import { Connect } from '../src/Connect';


(async () => {
  const response = await Connect.get('/api/{name}')
    .setHost('localhost')
    .setPort(8080)
    .addRequestInterceptor(req => {
      req.setQuery('q', '1224');
    }).send();
  console.log(response);
})();