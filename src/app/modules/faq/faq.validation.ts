import { z } from 'zod';

const create = z.object({
  body: z
    .object({
      question: z.string(),
      answer: z.string(),
    })
    .strict(),
});

const update = z.object({
  body: z
    .object({
      question: z.string().optional(),
      answer: z.string().optional(),
    })
    .strict(),
});

export const FAQValidation = {
  create,
  update,
};
