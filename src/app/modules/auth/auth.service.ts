import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { comparePassword, hashPassword } from '../../../shared/bcrypt';
import prisma from '../../../shared/prisma';
import { sendEmail } from '../../../utils/sendMail';
import { IChangePasswordPayload, ILoginPayload } from './auth.interface';

const signup = async (payload: User) => {
  // check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  //   throw error if email already exists
  if (existingUser) {
    throw new ApiError(httpStatus.CONFLICT, 'Email already exists');
  }
  // hash user password
  payload.password = await hashPassword(payload.password);

  // prepare token for email verification
  const verificationToken = jwtHelpers.createToken(
    { email: payload.email, password: payload.password, name: payload.name },
    config.email_verification_secret as Secret,
    config.email_verify_expires_in as string
  );

  // prepare verification link
  const verificationLink = `<p>Please verify you email.</p><a href="${config.client_url}/verify-email?token=${verificationToken}">Verify</a>`;
  // send email verification link
  sendEmail(payload.email, 'Verify your email', verificationLink);

  return 'An verification link has been sent to your email. Please verify your email to login';
};

const verifyEmail = async (token: string) => {
  const decodedToken = jwtHelpers.verifyToken(
    token,
    config.email_verification_secret as Secret
  );

  const { email, password, name } = decodedToken;

  // find user with the email
  const isUserExists = await prisma.user.findUnique({ where: { email } });

  if (isUserExists) {
    throw new ApiError(httpStatus.CONFLICT, 'User already verified');
  }

  // prepare user data
  const userData = {
    email,
    password,
    name,
  };

  // save user
  const result = await prisma.user.create({ data: userData });

  if (!result) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Can't verify email and Signup Unsuccessful. Try again Later"
    );
  }

  return 'Email Verification Successful';
};

const login = async (payload: ILoginPayload) => {
  // check if user exists
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  //   throw error if user does not exist
  if (!user) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'User does not exist with this email'
    );
  }

  //  compare password
  const isPasswordMatched = await comparePassword(
    payload.password,
    user.password
  );
  //  throw error if password does not match
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid password');
  }

  //  generate access token
  const accessToken = jwtHelpers.createToken(
    { email: user.email, role: user.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  //  generate refresh token
  const refreshToken = jwtHelpers.createToken(
    { email: user.email, role: user.role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  // return accessToken and refreshToken
  return { accessToken, refreshToken };
};

const changePassword = async (
  email: string,
  payload: IChangePasswordPayload
) => {
  // check if old password and new password are same
  if (payload.oldPassword === payload.newPassword) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'New password cannot be same as old password'
    );
  }
  // check if user exists
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  //   throw error if user does not exist
  if (!user) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'User does not exist with this email'
    );
  }

  // compare old password
  const isPasswordMatched = await comparePassword(
    payload.oldPassword,
    user.password
  );

  // throw error if password does not match
  if (!isPasswordMatched) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Current password doesn't match"
    );
  }

  // hash new password
  const newPassword = await hashPassword(payload.newPassword);

  // update password
  const result = await prisma.user.update({
    where: {
      email,
    },
    data: {
      password: newPassword,
    },
  });

  if (!result) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Can't Update Password. Try again later"
    );
  }

  return;
};

const forgotPassword = async (email: string) => {
  // check if user exists with the email
  const isUserExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  //   throw error if email already exists
  if (!isUserExists) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'User does not exist with this email'
    );
  }

  // prepare token for email verification
  const resetToken = jwtHelpers.createToken(
    { email: email },
    config.forgot_password_secret as Secret,
    config.forgot_password_secret_expires_in as string
  );

  // prepare reset-password link
  const resetPasswordLink = `<p>Reset your account password.</p><a href="${config.client_url}/reset-password?token=${resetToken}">Reset Password</a>`;
  // send email reset-password link
  sendEmail(email, 'Reset Cleano Account Password', resetPasswordLink);

  return 'An reset-password link has been sent to your email.';
};

const resetPassword = async (token: string, newPassword: string) => {
  // decode jwt token
  const decodedToken = jwtHelpers.verifyToken(
    token,
    config.forgot_password_secret as Secret
  );

  const { email } = decodedToken;

  // find user with the email
  const isUserExists = await prisma.user.findUnique({ where: { email } });
  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No User Found with this Email');
  }

  // hash-password
  const hashedPassword = await hashPassword(newPassword);

  // update user password
  const result = await prisma.user.update({
    where: {
      email,
    },
    data: {
      password: hashedPassword,
    },
  });

  if (!result) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Can't update password. Please try again."
    );
  }

  return 'Password reset successfully';
};

const verifyToken = async (token: string) => {
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Token is required');
  }
  const result = await jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret
  );

  if (!result) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token');
  }

  return 'Authorized User Token';
};

export const AuthService = {
  signup,
  login,
  changePassword,
  verifyEmail,
  forgotPassword,
  resetPassword,
  verifyToken,
};
