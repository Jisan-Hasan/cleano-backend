import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { comparePassword, hashPassword } from '../../../shared/bcrypt';
import prisma from '../../../shared/prisma';

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

type IPayload = {
  email: string;
  password: string;
};

const login = async (payload: IPayload) => {
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

export const AuthService = {
  signup,
  login,
};
