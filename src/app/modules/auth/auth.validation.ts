import { z } from 'zod';

const signup = z.object({
  body: z
    .object({
      name: z.string({ required_error: 'Name is required' }),
      email: z
        .string({ required_error: 'Please enter a valid email address' })
        .email(),
      password: z
        .string({ required_error: 'Password is required' })
        .min(6, 'Password must be at least 6 characters long')
        .max(20, 'Password must be at most 20 characters long'),
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

const forgotPassword = z.object({
  body: z
    .object({
      email: z.string({ required_error: 'Email is required' }).email(),
    })
    .strict(),
});

const resetPassword = z.object({
  body: z
    .object({
      password: z
        .string({ required_error: 'Password is required' })
        .min(6, 'Password must be at least 6 characters long'),
    })
    .strict(),
});

export const AuthValidation = {
  signup,
  login,
  changePassword,
  forgotPassword,
  resetPassword,
};
