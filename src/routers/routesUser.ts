import { Router } from 'express'
import { UserController } from '../controllers/userController'

export const createUserRouter = ({
  notesModel
}: {
  notesModel: any
}): Router => {
  const userController = new UserController({ notesModel })
  const notesRouter = Router()

  notesRouter.get('/', userController.getAllUser)

  notesRouter.post('/', userController.CreateUser)

  notesRouter.get('/:id')

  notesRouter.delete('/:id', userController.deleteUser)

  return notesRouter
}
