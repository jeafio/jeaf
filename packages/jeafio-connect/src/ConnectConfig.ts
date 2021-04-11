import { ConnectRequestConfig } from './ConnectRequestConfig';

export type ConnectConfig = Omit<ConnectRequestConfig, 'requestPath' | 'requestBody'>;
