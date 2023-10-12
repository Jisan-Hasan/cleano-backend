import { z } from 'zod';

const createOrUpdate = z.object({
  body: z
    .object({
      title: z
        .string()
        .min(3, 'Title must be at least 3 characters long')
        .max(30, 'Title must be at most 30 characters long'),
    })
    .strict(),
});

export const CategoryValidation = {
  createOrUpdate,
};
