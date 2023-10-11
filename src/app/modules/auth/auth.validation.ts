import { z } from 'zod';

const signup = z.object({
  body: z
    .object({
      firstName: z.string({ required_error: 'First name is required' }),
      lastName: z.string().optional(),
      email: z
        .string({ required_error: 'Please enter a valid email address' })
        .email(),
      password: z
        .string({ required_error: 'Password is required' })
        .min(6, 'Password must be at least 6 characters long'),
    })
    .strict(),
});

export const AuthValidation = {
  signup,
};
