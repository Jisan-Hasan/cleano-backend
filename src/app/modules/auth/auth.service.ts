import { User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { hashPassword } from '../../../shared/bcrypt';
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

export const AuthService = {
  signup,
};
