import { Booking } from '@prisma/client';
import prisma from '../../../shared/prisma';

const create = async (payload: Booking): Promise<Booking> => {
  const result = await prisma.booking.create({
    data: payload,
    include: {
      user: true,
      service: true,
    },
  });

  return result;
};

export const BookingService = {
  create,
};
