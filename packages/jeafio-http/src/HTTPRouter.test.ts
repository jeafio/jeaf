import { HTTPRouter } from './HTTPRouter';
import { HTTPRequest } from './HTTPRequest';
import { IncomingMessageFixture } from '../tests/fixtures/IncomingMessageFixture';
import { IncomingMessage } from 'http';
import { HTTPResponse } from './HTTPResponse';

describe('HTTPRouter', () => {
  it('should return an empty 404 response by default', async () => {
    const router = new HTTPRouter('/');
    const request = new HTTPRequest(IncomingMessageFixture as IncomingMessage);
    const response = await router.execute(request, {});
    expect(response.code).toBe(404);
  });

  it('should execute interceptor without returning response', async () => {
    const router = new HTTPRouter('/');
    const interceptor = jest.fn();
    router.addRequestInterceptor(interceptor);
    const request = new HTTPRequest(IncomingMessageFixture as IncomingMessage);
    const session = {};
    const response = await router.execute(request, session);
    expect(response.code).toBe(404);
    expect(interceptor).toHaveBeenCalledWith(request, session);
  });

  it('should execute multiple interceptor without returning response', async () => {
    const router = new HTTPRouter('/');
    const interceptorOne = jest.fn();
    const interceptorTwo = jest.fn();
    router.addRequestInterceptor(interceptorOne);
    router.addRequestInterceptor(interceptorTwo);
    const request = new HTTPRequest(IncomingMessageFixture as IncomingMessage);
    const session = {};
    const response = await router.execute(request, session);
    expect(response.code).toBe(404);
    expect(interceptorOne).toHaveBeenCalledWith(request, session);
    expect(interceptorTwo).toHaveBeenCalledWith(request, session);
  });

});

it('should return response from interceptor', async () => {
  const router = new HTTPRouter('/');
  const interceptor = jest.fn().mockReturnValue(new HTTPResponse());
  router.addRequestInterceptor(interceptor);
  const request = new HTTPRequest(IncomingMessageFixture as IncomingMessage);
  const session = {};
  const response = await router.execute(request, session);
  expect(response.code).toBe(200);
  expect(interceptor).toHaveBeenCalledWith(request, session);
});

it('should execute request handler', async () => {
  const router = new HTTPRouter('/');
  const handler = jest.fn().mockReturnValue(new HTTPResponse());
  router.addRequestHandler('GET', '/a/b/c', handler);
  const request = new HTTPRequest(IncomingMessageFixture as IncomingMessage);
  const session = {};
  const response = await router.execute(request, session);
  expect(response.code).toBe(200);
  expect(handler).toHaveBeenCalledWith(request, session);
});

it('should execute request handler when router has a prefixed path', async () => {
  const router = new HTTPRouter('/a');
  const handler = jest.fn().mockReturnValue(new HTTPResponse());
  router.addRequestHandler('GET', '/b/c', handler);
  const request = new HTTPRequest(IncomingMessageFixture as IncomingMessage);
  const session = {};
  const response = await router.execute(request, session);
  expect(response.code).toBe(200);
  expect(handler).toHaveBeenCalledWith(request, session);
});

it('should execute sub routers', async () => {
  const router = new HTTPRouter('/');
  const subRouter = new HTTPRouter('/a');
  const mockedResponse = new HTTPResponse();
  const handler = jest.fn().mockReturnValue(mockedResponse);
  subRouter.addRequestHandler('GET', '/b/c', handler);
  router.addRouter(subRouter);
  const request = new HTTPRequest(IncomingMessageFixture as IncomingMessage);
  const session = {};
  const response = await router.execute(request, session);
  expect(response).toBe(mockedResponse);
});

it('should ignore invalid handles', async () => {
  const router = new HTTPRouter('/');
  const handler = jest.fn().mockReturnValue(new HTTPResponse());
  router.addRequestHandler('GET', '/a/b/c2', handler);
  const request = new HTTPRequest(IncomingMessageFixture as IncomingMessage);
  const session = {};
  const response = await router.execute(request, session);
  expect(response.code).toBe(404);
  expect(handler).not.toHaveBeenCalledWith(request, session);
});

it('should ignore invalid sub routers', async () => {
  const router = new HTTPRouter('/');
  const subRouter = new HTTPRouter('/xyz');
  router.addRouter(subRouter);
  const request = new HTTPRequest(IncomingMessageFixture as IncomingMessage);
  const session = {};
  jest.spyOn(subRouter, 'execute');
  await router.execute(request, session);
  expect(subRouter.execute).not.toHaveBeenCalled();
});

it('should execute response interceptor', async () => {
  const router = new HTTPRouter('/');
  const mockedResponse = new HTTPResponse();
  const finalResponse = new HTTPResponse();
  const handler = jest.fn().mockReturnValue(mockedResponse);
  const interceptor = jest.fn().mockReturnValue(finalResponse);
  router.addRequestHandler('GET', '/a/b/c', handler);
  router.addResponseInterceptor(interceptor);
  const request = new HTTPRequest(IncomingMessageFixture as IncomingMessage);
  const session = {};
  const response = await router.execute(request, session);
  expect(response).toBe(finalResponse);
  expect(handler).toHaveBeenCalledWith(request, session);
  expect(interceptor).toHaveBeenCalledWith(request, mockedResponse, session);
});

it('should execute multiple response interceptor', async () => {
  const router = new HTTPRouter('/');
  const mockedResponse = new HTTPResponse();
  const finalResponse = new HTTPResponse();
  const handler = jest.fn().mockReturnValue(mockedResponse);
  const interceptor = jest.fn();
  const interceptorTwo = jest.fn().mockReturnValue(finalResponse);
  router.addRequestHandler('GET', '/a/b/c', handler);
  router.addResponseInterceptor(interceptor);
  router.addResponseInterceptor(interceptorTwo);
  const request = new HTTPRequest(IncomingMessageFixture as IncomingMessage);
  const session = {};
  const response = await router.execute(request, session);
  expect(response).toBe(finalResponse);
  expect(handler).toHaveBeenCalledWith(request, session);
  expect(interceptor).toHaveBeenCalledWith(request, mockedResponse, session);
  expect(interceptorTwo).toHaveBeenCalledWith(request, mockedResponse, session);
});