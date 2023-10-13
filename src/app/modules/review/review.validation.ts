import { z } from 'zod';

const create = z.object({
  body: z
    .object({
      comment: z.string(),
      rating: z.number().min(1).max(5),
      userId: z.string().uuid(),
      serviceId: z.string().uuid(),
    })
    .strict(),
});

const update = z.object({
  body: z
    .object({
      comment: z.string().optional(),
      rating: z.number().min(1).max(5).optional(),
    })
    .strict(),
});

export const ReviewValidation = {
  create,
  update,
};
