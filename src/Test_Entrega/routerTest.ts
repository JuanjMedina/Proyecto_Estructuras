import { Router } from 'express'

import { doubleLinkedListFunction, priorityQueueFunction, queueFunction, stackFunction, findNotesFunction } from './Controller/controller'

export const createTestRouter = Router()
createTestRouter.get('/stack', stackFunction)

createTestRouter.get('/queue', queueFunction)

createTestRouter.get('/doubleLinkedList', doubleLinkedListFunction)

createTestRouter.get('/priorityQueue', priorityQueueFunction)

createTestRouter.get('/AVL', findNotesFunction)
