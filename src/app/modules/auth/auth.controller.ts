import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const signup = catchAsync(async (req: Request, res: Response) => {
  await AuthService.signup(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Signup successful',
  });
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  req.body.role = 'admin';
  await AuthService.signup(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Admin created successfully',
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', result.refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successful',
    data: {
      accessToken: result.accessToken,
    },
  });

  res.send(result);
});

export const AuthController = {
  signup,
  createAdmin,
  login,
};
