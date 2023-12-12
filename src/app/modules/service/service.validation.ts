import { z } from 'zod';

const create = z.object({
  body: z
    .object({
      image: z.string().startsWith('data:image'),
      title: z.string(),
      description: z.string().optional(),
      price: z.number().positive(),
      isAvailable: z.boolean().optional(),
    })
    .strict(),
});

const update = z.object({
  body: z
    .object({
      image: z.string().startsWith('data:image').optional(),
      title: z.string().optional(),
      description: z.string().optional(),
      price: z.number().positive().optional(),
      isAvailable: z.boolean().optional().optional(),
    })
    .strict(),
});

export const ServiceValidation = {
  create,
  update,
};
