import { Request, Response } from '../types';

export const parseUrl = (baseUrl: string) => (req: Request, res: Response) => {
  const url = new URL(req.url, baseUrl);
  const params = {};
  url.searchParams.forEach((value, key) => (params[key] = value));

  req.pathname = url.pathname;
  req.params = params;
};
