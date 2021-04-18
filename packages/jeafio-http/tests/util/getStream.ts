import { Readable } from 'stream';

export function getStream(stream: Readable | undefined): Promise<string> {
  return new Promise((resolve) => {
    if (!stream) {
      resolve('');
    } else {
      let data = '';
      stream.on('data', (chunk) => {
        data += chunk;
      }).on('end', () => resolve(data));
    }
  });
}