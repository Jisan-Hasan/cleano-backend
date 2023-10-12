/* eslint-disable @typescript-eslint/no-explicit-any */
import { Booking, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  bookingRelationalFields,
  bookingRelationalFieldsMapper,
  bookingSearchableFields,
} from './booking.constant';
import { IBookingFilterRequest } from './booking.interface';

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

const getAll = async (
  filters: IBookingFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Booking[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: bookingSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (bookingRelationalFields.includes(key)) {
          return {
            [bookingRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.BookingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.booking.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? { [sortBy]: sortOrder }
        : {
            createdAt: 'desc',
          },
    include: {
      user: true,
      service: true,
    },
  });

  const total = await prisma.booking.count({ where: whereConditions });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

export const BookingService = {
  create,
  getAll,
};
