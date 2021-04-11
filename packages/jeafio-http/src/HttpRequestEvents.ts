import { HttpProgress } from './HttpProgress';

export interface HttpRequestEvents {
  upload: (progress: HttpProgress) => void;
  data: (progress: HttpProgress) => void;
  error: (err: Error) => void;
  done: (data: Uint8Array) => void;
}
