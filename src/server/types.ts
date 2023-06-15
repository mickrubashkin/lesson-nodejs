import { IncomingMessage, ServerResponse } from 'http';

export interface Request extends IncomingMessage {
  body: Record<string, unknown>;
  params: Record<string, unknown>;
  pathname: string;
}

export interface Response extends ServerResponse {
  send: (data: Record<string, unknown>) => void;
}

export type Handler = (request: Request, response: Response) => void;

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  UPDATE = 'UPDATE',
  PATCH = 'PATCH'
}

export type PathMethods = {
  [key in HttpMethod]: Handler;
}

// Финальный тип для endpoints
export type EndPoints = Record<string, PathMethods> | {};
