import * as EventEmitter from 'events';
import { Server as ServerHttp, createServer as createServerHttp } from 'http';

import { Handler, HttpMethod, Request, Response } from './types';
import { Router } from './router';

export class Server {
  private server: ServerHttp;
  private emitter: EventEmitter;
  private middlewares: Handler[];

  constructor() {
    this.emitter = new EventEmitter();
    this.server = this.createServer();
    this.middlewares = [];
  }

  public use(middleware: Handler) {
    this.middlewares.push(middleware);
  }

  public listen(port: number, callback: () => void) {
    this.server.listen(port, callback)
  }

  private createServer() {
    return createServerHttp((req: Request, res: Response) => {
      let body = "";

      req.on('data', (chunk) => {
        body += chunk;
      });

      req.on('end', () => {
        if (body) {
          req.body = JSON.parse(body);
        }

        this.middlewares.forEach((middleware: Handler) => middleware(req, res));
        const emitted = this.emitter.emit(
          this.getRoutMask(req.pathname, HttpMethod[req.method]),
          req,
          res
        );

        if (!emitted) {
          res.end();
        }
      });
    });
  }

  public addRouter(router: Router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endPoint = router.endpoints[path];
      Object.keys(endPoint).forEach((method: HttpMethod) => {
        this.emitter.on(
          this.getRoutMask(path, method),
          (req: Request, res: Response) => {
            const handler = endPoint[method];
            handler(req, res);
          }
        );
      });
    });
  }

  private getRoutMask(path: string, method: HttpMethod) {
    return `[${path}]:[${method}]`;
  }
}
