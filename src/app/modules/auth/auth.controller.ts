import { User } from '@prisma/client';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const signup = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.signup(req.body);

  sendResponse<User>(res, {
    statusCode: 201,
    success: true,
    message: 'Signup successful',
    data: result,
  });
});

export const AuthController = {
  signup,
};
