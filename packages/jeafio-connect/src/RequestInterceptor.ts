import { HTTPRequest, HTTPResponse } from '@jeafio/http';

export type RequestInterceptor = (req: HTTPRequest) => HTTPResponse | void;