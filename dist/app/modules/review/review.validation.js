"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z
        .object({
        comment: zod_1.z.string(),
        rating: zod_1.z.number().min(1).max(5),
        userId: zod_1.z.string().uuid(),
        serviceId: zod_1.z.string().uuid(),
    })
        .strict(),
});
const update = zod_1.z.object({
    body: zod_1.z
        .object({
        comment: zod_1.z.string().optional(),
        rating: zod_1.z.number().min(1).max(5).optional(),
    })
        .strict(),
});
exports.ReviewValidation = {
    create,
    update,
};
