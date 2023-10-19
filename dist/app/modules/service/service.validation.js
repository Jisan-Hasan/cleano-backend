"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z.string(),
        description: zod_1.z.string(),
        price: zod_1.z.number().positive(),
        availability: zod_1.z.boolean().optional(),
        categoryId: zod_1.z.string().uuid(),
    })
        .strict(),
});
const update = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        price: zod_1.z.number().positive().optional(),
        availability: zod_1.z.boolean().optional(),
        categoryId: zod_1.z.string().uuid().optional(),
    })
        .strict(),
});
exports.ServiceValidation = {
    create,
    update,
};
