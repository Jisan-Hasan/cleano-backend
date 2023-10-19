"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const signup = zod_1.z.object({
    body: zod_1.z
        .object({
        firstName: zod_1.z.string({ required_error: 'First name is required' }),
        lastName: zod_1.z.string().optional(),
        email: zod_1.z
            .string({ required_error: 'Please enter a valid email address' })
            .email(),
        password: zod_1.z
            .string({ required_error: 'Password is required' })
            .min(6, 'Password must be at least 6 characters long'),
    })
        .strict(),
});
const create = zod_1.z.object({
    body: zod_1.z
        .object({
        firstName: zod_1.z.string({ required_error: 'First name is required' }),
        lastName: zod_1.z.string().optional(),
        role: zod_1.z.enum(['admin', 'user']),
        email: zod_1.z
            .string({ required_error: 'Please enter a valid email address' })
            .email(),
        password: zod_1.z
            .string({ required_error: 'Password is required' })
            .min(6, 'Password must be at least 6 characters long'),
    })
        .strict(),
});
const login = zod_1.z.object({
    body: zod_1.z
        .object({
        email: zod_1.z
            .string({ required_error: 'Please enter a valid email address' })
            .email('Please enter a valid email address'),
        password: zod_1.z.string({ required_error: 'Password is required' }),
    })
        .strict(),
});
const changePassword = zod_1.z.object({
    body: zod_1.z
        .object({
        oldPassword: zod_1.z.string({ required_error: 'Old password is required' }),
        newPassword: zod_1.z
            .string({ required_error: 'New password is required' })
            .min(6, 'Password must be at least 6 characters long'),
    })
        .strict(),
});
exports.AuthValidation = {
    signup,
    login,
    changePassword,
    create,
};
