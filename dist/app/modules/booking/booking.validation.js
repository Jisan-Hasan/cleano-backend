'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.BookingValidation = void 0;
const zod_1 = require('zod');
const create = zod_1.z.object({
  body: zod_1.z
    .object({
      date: zod_1.z.string(),
      contractNo: zod_1.z.string(),
      houseNo: zod_1.z.string(),
      street: zod_1.z.string(),
      city: zod_1.z.string(),
      landmark: zod_1.z.string().optional(),
      userId: zod_1.z.string().uuid(),
      serviceId: zod_1.z.string().uuid(),
    })
    .strict(),
});
const update = zod_1.z.object({
  body: zod_1.z
    .object({
      date: zod_1.z.date().optional(),
      status: zod_1.z
        .enum(['pending', 'confirmed', 'completed', 'cancelled'])
        .optional(),
      contractNo: zod_1.z.string().optional(),
      houseNo: zod_1.z.string().optional(),
      street: zod_1.z.string().optional(),
      city: zod_1.z.string().optional(),
      landmark: zod_1.z.string().optional(),
      userId: zod_1.z.string().uuid().optional(),
      serviceId: zod_1.z.string().uuid().optional(),
    })
    .strict(),
});
exports.BookingValidation = {
  create,
  update,
};
