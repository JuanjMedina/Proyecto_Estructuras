/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { LoginController } from '../controllers/loginController'
 import { middlewareUser } from '../middellwares'
export const createLoginRouter = ({
  notesModel
}: {
  notesModel: any
}): Router => {
  const loginController = new LoginController({ notesModel })
  const notesRouter = Router()

  notesRouter.get(
    '/',
    middlewareUser.decodeToken,
    loginController.getTokentoUser
  )

  return notesRouter
}
