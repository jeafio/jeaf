import { Connect } from '../src/Connect';
import { HttpPromise } from '../src/http/HttpPromise';
import { Request } from '../src/decorator/Request';
import { RequestProgress } from '../src/decorator/RequestProgress';
import { RequestBody } from '../src/decorator/RequestBody';

interface User {
  id: number;
  username: string;
}

class UserClient extends Connect {
  @Request('POST', '/')
  @RequestBody('ABCDE')
  public async getUsers(@RequestProgress() upload: (ev: ProgressEvent) => void): HttpPromise<User[]> {
    return null as any;
  }
}

(async () => {
  const client = new UserClient();
  const users = await client.getUsers((ev) => {
    console.log('UPLOAD');
  });
  console.log(users);
})();
