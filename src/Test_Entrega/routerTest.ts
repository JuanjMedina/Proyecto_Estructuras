import { Router } from 'express'

import { doubleLinkedListFunction, queueFunction, stackFunction } from './Controller/controller'

export const createTestRouter = Router()
createTestRouter.get('/stack', stackFunction)

createTestRouter.get('/queue', queueFunction)

createTestRouter.get('/doubleLinkedList', doubleLinkedListFunction)
