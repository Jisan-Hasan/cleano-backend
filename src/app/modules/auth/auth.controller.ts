import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const signup = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.signup(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: result,
  });
});

const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  const { token } = req.params;
  const result = await AuthService.verifyEmail(token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: result,
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
  await AuthService.changePassword(req?.user?.email, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully',
  });
});

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  const result = await AuthService.forgotPassword(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: result,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;
  const result = await AuthService.resetPassword(token, password);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: result,
  });
});

const verifyToken = catchAsync(async (req: Request, res: Response) => {
  const { token } = req.params;
  const result = await AuthService.verifyToken(token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: result,
  });
});

export const AuthController = {
  signup,
  login,
  changePassword,
  verifyEmail,
  forgotPassword,
  resetPassword,
  verifyToken,
};
