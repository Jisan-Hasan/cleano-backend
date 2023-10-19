"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAQValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z
        .object({
        question: zod_1.z.string(),
        answer: zod_1.z.string(),
    })
        .strict(),
});
const update = zod_1.z.object({
    body: zod_1.z
        .object({
        question: zod_1.z.string().optional(),
        answer: zod_1.z.string().optional(),
    })
        .strict(),
});
exports.FAQValidation = {
    create,
    update,
};
