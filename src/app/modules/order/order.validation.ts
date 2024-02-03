import { z } from 'zod';

// ** Place Order Validation Schema ** //
const placeOrder = z.object({
  body: z
    .object({
      pickup_details: z
        .object({
          first_name: z.string().min(2).max(50),
          last_name: z.string().min(2).max(50).optional(),
          email: z.string().email(),
          phone: z
            .string()
            .min(10)
            .regex(/^\d+$/, {
              message: 'Phone number must be numeric',
            })
            .max(15),
          address1: z.string().min(2).max(100),
          address2: z.string().max(100).optional(),
          note: z.string().max(100).optional(),
          date: z.string(),
          time: z.string(),
        })
        .strict(),

      services: z.array(
        z
          .object({
            id: z.string(),
            quantity: z.number().int(),
          })
          .strict()
      ),
      paymentMethod: z.enum(['cash', 'card']),
    })
    .strict(),
});

// ** Export all Order validation schemas ** //
export const OrderValidation = {
  placeOrder,
};
