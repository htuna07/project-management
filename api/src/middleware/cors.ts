import { Request, Response, NextFunction } from 'express';

// use app.enableCors() instead
export namespace MiddleWares {
  export function cors(req: Request, res: Response, next: NextFunction) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    );

    // Request headers you wish to allow
    res.setHeader(
      'Access-Control-Allow-Headers',
      '*',
    );

    next();
  }
}
