import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const updateProfile = async (email: string, payload: Partial<User>) => {
  const result = await prisma.user.update({
    where: {
      email,
    },
    data: payload,
  });

  return result;
};

export const UserService = {
  updateProfile,
};
