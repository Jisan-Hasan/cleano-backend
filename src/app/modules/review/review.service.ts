import { Review } from '@prisma/client';
import prisma from '../../../shared/prisma';

const create = async (payload: Review): Promise<Review> => {
  const result = await prisma.review.create({
    data: payload,
  });

  return result;
};

export const ReviewService = {
  create,
};
