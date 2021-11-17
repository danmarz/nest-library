import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class isAvailableMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.body.available) {
      next()
    }
    else {
      res.status(400).send('Book is not available for loan')
    }
      }
}
