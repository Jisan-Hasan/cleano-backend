import { z } from 'zod';

const updateProfile = z.object({
  body: z
    .object({
      firstName: z.string().min(2).max(255).optional(),
      lastName: z.string().min(2).max(255).optional(),
      contractNo: z.string().max(15).optional(),
      houseNo: z.string().optional(),
      street: z.string().optional(),
      city: z.string().optional(),
      landmark: z.string().optional(),
      profileImage: z.string().optional(),
    })
    .strict(),
});

export const UserValidation = {
  updateProfile,
};
