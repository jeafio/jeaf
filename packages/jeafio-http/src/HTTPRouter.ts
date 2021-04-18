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
  requestInterceptors?: HTTPRequestInterceptor[];
  responseInterceptors?: HTTPResponseInterceptor[];
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

  public get(path: string, handler: HTTPRequestHandler, options?: HTTPRouterHandlerOptions): this {
    return this.addRequestHandler('GET', path, handler, options);
  }

  public post(path: string, handler: HTTPRequestHandler, options?: HTTPRouterHandlerOptions): this {
    return this.addRequestHandler('POST', path, handler, options);
  }

  public put(path: string, handler: HTTPRequestHandler, options?: HTTPRouterHandlerOptions): this {
    return this.addRequestHandler('PUT', path, handler, options);
  }

  public delete(path: string, handler: HTTPRequestHandler, options?: HTTPRouterHandlerOptions): this {
    return this.addRequestHandler('DELETE', path, handler, options);
  }

  public patch(path: string, handler: HTTPRequestHandler, options?: HTTPRouterHandlerOptions): this {
    return this.addRequestHandler('PATCH', path, handler, options);
  }

  public trace(path: string, handler: HTTPRequestHandler, options?: HTTPRouterHandlerOptions): this {
    return this.addRequestHandler('TRACE', path, handler, options);
  }

  public options(path: string, handler: HTTPRequestHandler, options?: HTTPRouterHandlerOptions): this {
    return this.addRequestHandler('OPTIONS', path, handler, options);
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

  private async executeRequestInterceptors(requestInterceptors: HTTPRequestInterceptor[], req: HTTPRequest, session: HTTPSession): Promise<HTTPResponse | void> {
    for (const requestInterceptor of requestInterceptors) {
      const response = await requestInterceptor(req, session);
      if (response) {
        return response;
      }
    }
  }

  private async executeResponseInterceptors(responseInterceptors: HTTPResponseInterceptor[], req: HTTPRequest, res: HTTPResponse, session: HTTPSession): Promise<HTTPResponse> {
    for (const responseInterceptor of responseInterceptors) {
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
          if (requestHandler.options?.requestInterceptors) {
            const response = await this.executeRequestInterceptors(requestHandler.options.requestInterceptors, req, session);
            if (response) {
              return response;
            }
          }
          const response = await requestHandler.handler(req, session);

          if (requestHandler.options?.responseInterceptors) {
            return await this.executeResponseInterceptors(requestHandler.options.responseInterceptors, req, response, session);
          }
          return response;
        }
      }
    }
  }

  public async execute(req: HTTPRequest, session: HTTPSession): Promise<HTTPResponse> {
    let finalResponse;
    finalResponse = await this.executeRequestInterceptors(this.requestInterceptor, req, session);

    if (!finalResponse) {
      finalResponse = await this.executeRequestHandler(req, session);
    }

    if (!finalResponse) {
      finalResponse = new HTTPResponse(404);
    }

    return await this.executeResponseInterceptors(this.responseInterceptor, req, finalResponse, session);
  }
}