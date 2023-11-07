'use strict'
const __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt (value) { return value instanceof P ? value : new P(function (resolve) { resolve(value) }) }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled (value) { try { step(generator.next(value)) } catch (e) { reject(e) } }
    function rejected (value) { try { step(generator.throw(value)) } catch (e) { reject(e) } }
    function step (result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected) }
    step((generator = generator.apply(thisArg, _arguments || [])).next())
  })
}
Object.defineProperty(exports, '__esModule', { value: true })
exports.UserController = void 0
class UserController {
  constructor ({ notesModel }) {
    this.CreateUser = (req, res) => __awaiter(this, void 0, void 0, function * () {
      try {
        const newPerson = yield this.notesModel.createUser({ data: req.body })
        res.status(201).json(newPerson)
      } catch (e) {
        res.status(400).json({ message: 'error' })
      }
    })
    this.getAllUser = (_req, res) => __awaiter(this, void 0, void 0, function * () {
      try {
        const allUsers = yield this.notesModel.getAllUser()
        res.status(200).json(allUsers)
      } catch (e) {
        res.status(400).json({ message: 'error' })
      }
    })
    this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function * () {
      try {
        const { id } = req.params
        yield this.notesModel.deleteUser({ id })
        res.status(200).json({ message: 'User deleted' })
      } catch (e) {
        res.status(400).json({ message: 'error' })
      }
    })
    this.notesModel = notesModel
  }
}
exports.UserController = UserController
