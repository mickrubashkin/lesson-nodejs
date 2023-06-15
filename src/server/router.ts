import { EndPoints, Handler, HttpMethod } from './types';

export class Router {
  public endpoints: EndPoints;

  constructor() {
    this.endpoints = {};
  }

  public request(method: HttpMethod = HttpMethod.GET, path: string, handler: Handler) {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }

    const endPoint = this.endpoints[path];

    if (endPoint[method]) {
      throw new Error(`Endpoint ${path} already has ${method} method`);
    }

    endPoint[method] = handler;
  }

  public get(path: string, handler: Handler) {
    this.request(HttpMethod.GET, path, handler);
  }

  public post(path: string, handler: Handler) {
    this.request(HttpMethod.POST, path, handler);
  }

  public put(path: string, handler: Handler) {
    this.request(HttpMethod.PUT, path, handler);
  }

  public delete(path: string, handler: Handler) {
    this.request(HttpMethod.DELETE, path, handler);
  }

  public update(path: string, handler: Handler) {
    this.request(HttpMethod.UPDATE, path, handler);
  }

  public patch(path: string, handler: Handler) {
    this.request(HttpMethod.PATCH, path, handler);
  }
}
