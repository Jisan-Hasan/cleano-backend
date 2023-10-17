import { z } from 'zod';

const create = z.object({
  body: z
    .object({
      title: z.string(),
      description: z.string(),
      image: z.string().optional(),
    })
    .strict(),
});

const update = z.object({
  body: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      image: z.string().optional(),
    })
    .strict(),
});

export const BlogValidation = {
  create,
  update,
};
