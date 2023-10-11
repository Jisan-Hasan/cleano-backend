import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const signup = async (payload: User) => {
  const result = await prisma.user.create({
    data: payload,
  });

  return result;
};

export const AuthService = {
  signup,
};
