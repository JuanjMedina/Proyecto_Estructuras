import { verifyToken } from '../config/firebase-confi'
import { Request as ExpressRequest, Response, NextFunction } from 'express'
import { notesModel } from '../models/mySql/notesModel'
// import { createAccessToken } from '../libs/jwt'

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
      await notesModel.createUser({ data: decodeValue })
      // const createToken = await createAccessToken({ id: decodeValue.user_id })
      // console.log(createToken)
      // res.cookie('token', createToken, {
      //   httpOnly: true,
      //   secure: true,
      //   sameSite: 'strict'
      // })
      // res.cookie('token', decodeValue.user_id)
      next()
    } catch (e) {
      res.status(500).json({ message: 'internal server error' })
    }
  }

  async validateToken (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.cookies
      console.log(token)
      next()
    } catch (e) {
      res.status(500).json({ message: 'internal server error' })
    }
  }
}

export const middlewareUser = new Middleware()
