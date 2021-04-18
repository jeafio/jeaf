# @jeafio/connect


[![Coverage Status](https://coveralls.io/repos/github/jeafio/connect/badge.svg?branch=master)](https://coveralls.io/github/jeafio/connect?branch=master)
[![Build Status](https://travis-ci.org/jeafio/connect.svg?branch=master)](https://travis-ci.org/jeafio/connect)
[![CodeFactor](https://www.codefactor.io/repository/github/jeafio/connect/badge)](https://www.codefactor.io/repository/github/jeafio/connect)
[![Known Vulnerabilities](https://snyk.io/test/github/jeafio/connect/badge.svg?targetFile=package.json)](https://snyk.io/test/github/jeafio/connect?targetFile=package.json)
![npm](https://img.shields.io/npm/v/@jeafio/connect)
![npm](https://img.shields.io/npm/dy/@jeafio/connect)

## Intro

This project provides a class based way to define HTTP clients for TypeScript projects. It uses decorators to add request metadata to classes and their methods. It is inspired by the popular [Feign Client](https://cloud.spring.io/spring-cloud-openfeign/reference/html/) library used for Java projects.

The decision for using classes instead of pure functions was mainly based on the polymorphic characteristics of classes. This makes it possible to inherit metadata and create complex yet easy to configure clients.

## Table of contents

- 🚀 [Getting Started](#getting-started)
- 📚 [Template Strings](#template-strings)
- 🌳 [Decorator inheritance](#decorator-inheritance)
- 🛠 [Middleware](#middleware)
- 🧰 [Decorator](#decorators)
  - 🔧 [@Request](#request)
  - 🔧 [@RequestBody](#requestbody)
  - 🔧 [@RequestHeader](#requestheader)
  - 🔧 [@RequestMiddleware](#requestmiddleware)
  - 🔧 [@RequestParam](#requestparam)
  - 🔧 [@RequestTimeout](#requestparam)
  - 🔧 [@RequestProgress](#requestprogress)

## Getting Started

To create a simple GET request against a defned path just add the _@Request_ decorator to a class that extends the _Connect_ class. Each request method should return a _HttpPromise_ object with the response objects type. The _HttpPromise_ will return a _HttpResponse_ object when the request is done executing.

```shell script
npm install --save @jeafio/connect
yarn install @jeafio/connect
```

```typescript
import { Connect, Request, HttpPromise } from '@jeafio/connect';

class UserClient extends Connect {
  @Request('GET', '/api/v1/users')
  public getUsers(): HttpPromise<User[]> {
    return;
  }
}
```

This client can then be used by creating an instance of it an calling the _getUsers_ method.

```typescript
const client = new UserClient();
await client.getUsers();
// => Returns a HttpResponse Object
```

## Template Strings

All decorators that accept strings and objects as a parameter can make use of template strings to use their arguments to build dynamic input data. The following example shows how to add a dynamic header that will use the content of the argument with the index 0 as its value.

```typescript
...
@RequestHeader('Content-Type', '{0}')
public getUsers(contentType: string): HttpPromise<User[]> {
    return;
}
...
client.getUsers('application/json')
// Results into => Content-Type: application/json
```

Whenever the template string contains of only a single template variable, the content of the argument with the given index is used instead of the template string. It is also possible to create strings of multiple template variables as the next example will show.

```typescript
...
@RequestBody('{0} {1} ({2})')
public getUsers(firstname: string, lastname: string, age: number): HttpPromise<User[]> {
    return;
}
...
client.getUsers('max', 'mustermann', 24)
// Results into => Body: max mustermann (24)
```

Template string can also be used to add dynamic data to JSON objects which is especially useful for building request bodies.

```typescript
...
@RequestBody({
  firstname: '{0}',
  lastname: '{1}',
  age: '{2}'
})
public getUsers(firstname: string, lastname: string, age: number): HttpPromise<User[]> {
    return;
}
...
client.getUsers('max', 'mustermann', 24)
// Results into => Body: {firstname: 'max', lastname: 'mustermann', age: 24}
```

## Decorator inheritance

Most decorators can be either set on the class itself or on its method. Decorators that are set on methods will **always overwrite** class based decorators. The following example shows how to set the request timeout to 1000 for all methods inside the _UserClient_ except _createUser_.

```typescript
@RequestTimeout(1000)
class UserClient extends Connect {
  @Request('GET', '/api/v1/users')
  public getUsers(): HttpPromise<User[]> {}

  @Request('POST', '/api/v1/users')
  @RequestTimeout(4000)
  public createUser(): HttpPromise<void> {}
}
```

As the jeafio/connect library uses the ES6 `class` and `extends` keyword for build prototypes. You can inherit the settings of other clients be extending from them. Following example will show how to use a base class to share configs across multiple clients.

```typescript
@RequestTimeout(1000)
@RequestHeader('Content-Type', 'application/json')
class BaseClient extends Connect {}

class UserClient extends BaseClient {
  @Request('GET', '/api/v1/users')
  public getUsers(): HttpPromise<User[]> {}
}

class ProviderClient extends BaseClient {
  @Request('GET', '/api/v1/providers')
  public getProviders(): HttpPromise<Provider[]> {}
}
```

It is also possible to change configs by overriding methods.

```typescript
class BaseClient extends Connect {
  @Request('GET', '/api/v1/users')
  @RequestTimeout(1000)
  public getUsers(): HttpPromise<User[]> {}
}

class UserClient extends BaseClient {
  @RequestTimeout(5000)
  public getUsers(): HttpPromise<User[]> {}
}
```

## Middleware

This project is designed by using the _Chain of Command_ pattern. This means that all processes are split in functions that executes after each other until one of them return false. After the first function returns false or the last function has been reached the response object will be returned. To make changes to a request or the response you can either add middleware functions before or after the request has been executed.

This example shows how to implement a middleware that will convert all JSON objects to strings before sending them to the server.

```typescript
// Define a function that accepts the request and response object.
async function jsonMiddleware(req: HttpRequest, res: HttpResponse): Promise<boolean> {
  // Check if the requests content should be a json
  if (req.header['Content-Type'] === 'application/json') {
    // Check if the body is an object
    if (typeof req.body === 'object') {
      // Convert the body and set it as the new body
      req.body = JSON.stringify(req.body);
    }
  }

  // Return true to execute the next middleware
  return true;
}

class UserClient extends Connect {
  @Request('POST', '/api/v1/users')
  @RequestMiddleware(jsonMiddleware)
  public createUsers(user: User): HttpPromise<void> {
    return;
  }
}
```

The request and response objects are mutable and will keep their reference during the entire execution of all middlewares. To execute a middleware after the server responded just set the second paramter of `@RequestMiddleware` to `false`.

```typescript
class UserClient extends Connect {
  @Request('POST', '/api/v1/users')
  @RequestMiddleware(jsonDecoderMiddleware, false)
  public createUsers(user: User): HttpPromise<void> {
    return;
  }
}
```

If you want to stop the request from executing you can return `false` in your middleware. Be advised that this can result in an empty response object.

## Decorators

This project uses Decorators as its main tool to configure the client. Following is a list of all decorators and their goal.

### @Request

The _@Request_ decorator is used to mark a method as a request method. It defines the requests method as well as its destination path. Valid request methods are `GET` `POST` `PUT` `PATCH` `DELETE` `HEAD` `OPTIONS`.

#### Parameters

| Params | Type              | Default | Usage                     |
| ------ | ----------------- | ------- | ------------------------- |
| method | HttpRequestMethod | -       | The request method to use |
| path   | `String`          | -       | The request path          |

#### Example

```typescript
class UserClient extends Connect {
  @Request('GET', '/api/v1/users')
  public getUsers(): HttpPromise<User[]> {
    return;
  }
}
```

### @RequestBody

To define the requests body or specify the argument which provides it, the _@RequestBody_ decorator can be used.

#### Parameters

| Params | Type                      | Default | Usage            |
| ------ | ------------------------- | ------- | ---------------- |
| body   | `String` `Object` `Array` | -       | The request body |

#### Example

```typescript
class UserClient extends Connect {
  // Sends the content of the argument with the index 0
  @Request('GET', '/api/v1/users')
  @RequestBody('{0}')
  public createUser(user: User): HttpPromise<void> {
    return;
  }
}
```

### @RequestHeader

Adds a request header with the given name and value.

#### Parameters

| Params | Type     | Default | Usage             |
| ------ | -------- | ------- | ----------------- |
| name   | `String` | -       | The headers name  |
| value  | `String` | -       | The headers value |

#### Example

```typescript
class UserClient extends Connect {
  @Request('GET', '/api/v1/users')
  @RequestHeader('Content-Type', 'application/json')
  public createUser(user: User): HttpPromise<void> {
    return;
  }
}
```

### @RequestMiddleware

Adds a request header with the given name and value.

#### Parameters

| Params     | Type             | Default | Usage                                            |
| ---------- | ---------------- | ------- | ------------------------------------------------ |
| middleware | `HttpMiddleware` | -       | The request middleware to add                    |
| pre        | `Boolean`        | true    | True if the middleware should execute on request |

#### Example

```typescript
class UserClient extends Connect {
  @Request('GET', '/api/v1/users')
  @RequestMiddleware(jsonMiddleware)
  public createUser(user: User): HttpPromise<void> {
    return;
  }
}
```

### @RequestParam

Adds a request param with the given name and value.

#### Parameters

| Params | Type     | Default | Usage                |
| ------ | -------- | ------- | -------------------- |
| name   | `String` | -       | The parameters name  |
| value  | `String` | -       | The parameters value |

#### Example

```typescript
class UserClient extends Connect {
  // /api/v1/users?page=10
  @Request('GET', '/api/v1/users')
  @RequestParam('page', '10')
  public createUser(user: User): HttpPromise<void> {
    return;
  }
}
```

### @RequestTimeout

Sets the time after a request counts as timed out and is aborted. To disable automatic timeouts set the value to 0

#### Parameters

| Params  | Type     | Default | Usage               |
| ------- | -------- | ------- | ------------------- |
| timeout | `Number` | 0       | The request timeout |

#### Example

```typescript
class UserClient extends Connect {
  // /api/v1/users?page=10
  @Request('GET', '/api/v1/users')
  @RequestTimeout(1000)
  public createUser(user: User): HttpPromise<void> {
    return;
  }
}
```

### @RequestProgress

To get information about the progress of either the download or upload progress you can mark a method argument with the _@RequestProgress_ decorator.

#### Example

```typescript
class UserClient extends Connect {
  // /api/v1/users?page=10
  @Request('GET', '/api/v1/download')
  public downloadFile(name: String, onProgress: (evt: ProgressEvent) => void): HttpPromise<Blob> {
    return;
  }
}

const client = new UserClient();
const file = await client.downloadFile('test.zip', (evt) => {
  console.log(`${evt.loaded} / ${evt.total}`);
});
```
