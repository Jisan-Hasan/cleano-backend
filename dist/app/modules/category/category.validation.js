'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CategoryValidation = void 0;
const zod_1 = require('zod');
const createOrUpdate = zod_1.z.object({
  body: zod_1.z
    .object({
      title: zod_1.z
        .string()
        .min(3, 'Title must be at least 3 characters long')
        .max(30, 'Title must be at most 30 characters long'),
    })
    .strict(),
});
exports.CategoryValidation = {
  createOrUpdate,
};
