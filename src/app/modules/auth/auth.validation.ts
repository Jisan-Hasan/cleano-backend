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

const create = z.object({
  body: z
    .object({
      firstName: z.string({ required_error: 'First name is required' }),
      lastName: z.string().optional(),
      role: z.enum(['admin', 'user']),
      email: z
        .string({ required_error: 'Please enter a valid email address' })
        .email(),
      password: z
        .string({ required_error: 'Password is required' })
        .min(6, 'Password must be at least 6 characters long'),
    })
    .strict(),
});

const login = z.object({
  body: z
    .object({
      email: z
        .string({ required_error: 'Please enter a valid email address' })
        .email('Please enter a valid email address'),
      password: z.string({ required_error: 'Password is required' }),
    })
    .strict(),
});

const changePassword = z.object({
  body: z
    .object({
      oldPassword: z.string({ required_error: 'Old password is required' }),
      newPassword: z
        .string({ required_error: 'New password is required' })
        .min(6, 'Password must be at least 6 characters long'),
    })
    .strict(),
});

export const AuthValidation = {
  signup,
  login,
  changePassword,
  create,
};
