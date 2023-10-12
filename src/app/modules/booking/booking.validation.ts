import { z } from 'zod';

const create = z.object({
  body: z
    .object({
      date: z.string(),
      contractNo: z.string(),
      houseNo: z.string(),
      street: z.string(),
      city: z.string(),
      landmark: z.string().optional(),
      userId: z.string().uuid(),
      serviceId: z.string().uuid(),
    })
    .strict(),
});

const update = z.object({
  body: z
    .object({
      date: z.date().optional(),
      contractNo: z.string().optional(),
      houseNo: z.string().optional(),
      street: z.string().optional(),
      city: z.string().optional(),
      landmark: z.string().optional(),
      userId: z.string().uuid().optional(),
      serviceId: z.string().uuid().optional(),
    })
    .strict(),
});

export const BookingValidation = {
  create,
  update,
};
