/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { LoginController } from '../controllers/loginController'

export const createLoginRouter = ({
  notesModel
}: {
  notesModel: any
}): Router => {
  const loginController = new LoginController({ notesModel })
  const notesRouter = Router()

  notesRouter.post('/', loginController.getTokentoUser)

  return notesRouter
}
