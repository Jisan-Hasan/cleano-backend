'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserValidation = void 0;
const zod_1 = require('zod');
const updateProfile = zod_1.z.object({
  body: zod_1.z
    .object({
      email: zod_1.z.string().email().optional(),
      role: zod_1.z.enum(['admin', 'user']).optional(),
      firstName: zod_1.z.string().min(2).max(255).optional(),
      lastName: zod_1.z.string().min(2).max(255).optional(),
      contractNo: zod_1.z.string().max(15).optional(),
      houseNo: zod_1.z.string().optional(),
      street: zod_1.z.string().optional(),
      city: zod_1.z.string().optional(),
      landmark: zod_1.z.string().optional(),
      profileImage: zod_1.z.string().optional(),
    })
    .strict(),
});
exports.UserValidation = {
  updateProfile,
};
