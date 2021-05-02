import { Connect } from '../src/Connect';
import { ConnectRequest } from '../src/ConnectRequest';


(async () => {
  const response = await Connect.get('/api/{name}', 'A');
  console.log(response);
})();