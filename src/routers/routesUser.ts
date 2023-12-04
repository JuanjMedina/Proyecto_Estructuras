/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { UserController } from '../controllers/userController'

export const createUserRouter = ({
  notesModel
}: {
  notesModel: any
}): Router => {
  const userController = new UserController({ notesModel })
  const userRouter = Router()

  userRouter.get('/', userController.getAllUser)

  userRouter.post('/', userController.CreateUser)

  userRouter.get('/:id')

  userRouter.delete('/:id', userController.deleteUser)

  return userRouter
}
