import { Injectable, NestMiddleware, RequestMethod } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Requesting from`, req.url);
    next();
  }
}

// Example of functional middleware(used in case where no members or other methods are being initiated further.)
// export function UsersMiddleware(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   console.log(`Requesting from`, req.url);
//   next();
// }
