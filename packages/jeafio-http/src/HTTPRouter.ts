import { HTTPRequestInterceptor } from './HTTPRequestInterceptor';
import { HTTPResponseInterceptor } from './HTTPResponseInterceptor';
import { HTTPRequestHandler } from './HTTPRequestHandler';
import { HTTPRequestMethod } from './HTTPRequestMethod';
import { HTTPRequest } from './HTTPRequest';
import { HTTPSession } from './HTTPSession';
import { HTTPResponse } from './HTTPResponse';
import { matchPatch } from './functions/matchPatch';

export interface HTTPRouterHandler {
  method: HTTPRequestMethod;
  path: string;
  handler: HTTPRequestHandler;
  options?: HTTPRouterHandlerOptions;
}

export interface HTTPRouterHandlerOptions {
  requestInterceptor?: HTTPRequestInterceptor[];
  responseInterceptor?: HTTPRequestInterceptor[];
}

/**
 * The HTTPRouter handles HTTPRequests and pipes them
 * through a defined set of HTTPInterceptor and HTTPRequestHandler
 */
export class HTTPRouter {

  private readonly requestInterceptor: HTTPRequestInterceptor[] = [];
  private readonly requestHandler: (HTTPRouterHandler | HTTPRouter)[] = [];
  private readonly responseInterceptor: HTTPResponseInterceptor[] = [];
  private readonly path: string;

  constructor(path: string) {
    this.path = path === '/' ? '' : path;
  }

  public getPath(): string {
    return this.path;
  }

  /**
   * Adds an additional router to the router.
   * @param router
   */
  public addRouter(router: HTTPRouter): this {
    this.requestHandler.push(router);
    return this;
  }

  /**
   * Adds an request interceptor to the router.
   * @param interceptor
   */
  public addRequestInterceptor(interceptor: HTTPRequestInterceptor): this {
    this.requestInterceptor.push(interceptor);
    return this;
  }

  /**
   * Adds an request handler to the router.
   * @param method
   * @param path
   * @param handler
   * @param options
   */
  public addRequestHandler(method: HTTPRequestMethod, path: string, handler: HTTPRequestHandler, options?: HTTPRouterHandlerOptions): this {
    this.requestHandler.push({ method, path, handler, options });
    return this;
  }

  /**
   * Adds an response interceptor to the router.
   * @param interceptor
   */
  public addResponseInterceptor(interceptor: HTTPResponseInterceptor): this {
    this.responseInterceptor.push(interceptor);
    return this;
  }

  private async executeRequestInterceptors(req: HTTPRequest, session: HTTPSession): Promise<HTTPResponse | void> {
    for (const requestInterceptor of this.requestInterceptor) {
      const response = await requestInterceptor(req, session);
      if (response) {
        return response;
      }
    }
  }

  private async executeResponseInterceptors(req: HTTPRequest, res: HTTPResponse, session: HTTPSession): Promise<HTTPResponse> {
    for (const responseInterceptor of this.responseInterceptor) {
      const response = await responseInterceptor(req, res, session);
      if (response) {
        return response;
      }
    }
    return res;
  }

  private async executeRequestHandler(req: HTTPRequest, session: HTTPSession): Promise<HTTPResponse | void> {
    for (const requestHandler of this.requestHandler) {
      if (requestHandler instanceof HTTPRouter) {
        const routerPath = requestHandler.getPath();
        if (matchPatch(routerPath + '/*', req.getPath())) {
          return await requestHandler.execute(req, session);
        }
      } else {
        const prefixedPath = this.getPath();
        if (req.getMethod() === requestHandler.method && matchPatch(prefixedPath + requestHandler.path, req.getPath())) {
          return await requestHandler.handler(req, session);
        }
      }
    }
  }

  public async execute(req: HTTPRequest, session: HTTPSession): Promise<HTTPResponse> {
    let finalResponse;
    finalResponse = await this.executeRequestInterceptors(req, session);

    if (!finalResponse) {
      finalResponse = await this.executeRequestHandler(req, session);
    }

    if (!finalResponse) {
      finalResponse = new HTTPResponse().setCode(404);
    }

    return await this.executeResponseInterceptors(req, finalResponse, session);
  }
}