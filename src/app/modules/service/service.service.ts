import { Service } from '@prisma/client';
import prisma from '../../../shared/prisma';

const create = async (payload: Service): Promise<Service> => {
  const result = await prisma.service.create({
    data: payload,
    include: {
      category: true,
    },
  });

  return result;
};

export const ServiceService = {
  create,
};
