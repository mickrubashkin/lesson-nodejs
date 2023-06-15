import { Request, Response } from "../types";

export const parseJson = (req: Request, res: Response) => {
  res.writeHead(200, {
    "Content-type": "application/json"
  });
  res.send = (data) => {
    res.end(JSON.stringify(data));
  }
};
