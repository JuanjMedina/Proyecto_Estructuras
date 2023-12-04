"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewareUser = exports.Middleware = void 0;
const firebase_confi_1 = require("../config/firebase-confi");
class Middleware {
    decodeToken(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                const decodeValue = yield (0, firebase_confi_1.verifyToken)(token);
                if (decodeValue === false)
                    throw new Error('Invalid Token');
                req.user = decodeValue;
                next();
            }
            catch (e) {
                console.log(e);
                res.status(500).json({ message: 'internal server error' });
            }
        });
    }
}
exports.Middleware = Middleware;
exports.middlewareUser = new Middleware();
