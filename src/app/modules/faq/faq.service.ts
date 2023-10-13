import { FAQ } from '@prisma/client';
import prisma from '../../../shared/prisma';

const create = async (payload: FAQ): Promise<FAQ> => {
  const result = await prisma.fAQ.create({ data: payload });

  return result;
};

export const FAQService = {
  create,
};
