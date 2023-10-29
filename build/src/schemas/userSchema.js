"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMovie = void 0;
const zod_1 = require("zod");
const personSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8).max(100),
    age: zod_1.z.number().int().min(18).max(100),
    isSubscribed: zod_1.z.boolean(),
    isVerified: zod_1.z.boolean(),
    createdAt: zod_1.z.date().default(() => new Date()),
    updatedAt: zod_1.z.date().default(() => new Date()),
    deletedAt: zod_1.z.date().nullable()
});
function validateMovie(input) {
    return personSchema.safeParse(input);
}
exports.validateMovie = validateMovie;
