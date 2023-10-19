import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
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

const createUser = catchAsync(async (req: Request, res: Response) => {
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
  // const cookieOptions = {
  //   secure: config.env === 'production',
  //   httpOnly: true,
  // };

  // res.cookie('refreshToken', result.refreshToken, cookieOptions);

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

const changePassword = catchAsync(async (req: Request, res: Response) => {
  // get email from access token
  const { email } = jwtHelpers.verifyToken(
    req.headers.authorization as string,
    config.jwt.secret as string
  );

  await AuthService.changePassword(email, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully',
  });
});

export const AuthController = {
  signup,
  createUser,
  login,
  changePassword,
};
