import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { comparePassword, hashPassword } from '../../../shared/bcrypt';
import prisma from '../../../shared/prisma';
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
  //   save to database
  const result = await prisma.user.create({
    data: payload,
  });

  return result;
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

export const AuthService = {
  signup,
  login,
  changePassword,
};
