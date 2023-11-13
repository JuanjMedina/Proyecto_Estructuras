import { verifyToken } from '../config/firebase-confi'
import { Request as ExpressRequest, Response, NextFunction } from 'express'

interface Request extends ExpressRequest {
  user?: any
}

export class Middleware {
  async decodeToken (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.authorization?.split(' ')[1]
      const decodeValue = await verifyToken(token)
      if (decodeValue === false) throw new Error('Invalid Token')
      req.user = decodeValue
      next()
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'internal server error' })
    }
  }
}

export const middlewareUser = new Middleware()
