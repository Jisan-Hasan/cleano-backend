'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.BlogValidation = void 0;
const zod_1 = require('zod');
const create = zod_1.z.object({
  body: zod_1.z
    .object({
      title: zod_1.z.string(),
      description: zod_1.z.string(),
      image: zod_1.z.string().optional(),
    })
    .strict(),
});
const update = zod_1.z.object({
  body: zod_1.z
    .object({
      title: zod_1.z.string().optional(),
      description: zod_1.z.string().optional(),
      image: zod_1.z.string().optional(),
    })
    .strict(),
});
exports.BlogValidation = {
  create,
  update,
};
