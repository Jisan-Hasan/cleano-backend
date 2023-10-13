/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Review } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  reviewRelationalFields,
  reviewRelationalFieldsMapper,
  reviewSearchableFields,
} from './review.constant';
import { IReviewFilterRequest } from './review.interface';

const create = async (payload: Review): Promise<Review> => {
  const result = await prisma.review.create({
    data: payload,
  });

  return result;
};

const getAll = async (
  filters: IReviewFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Review[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: reviewSearchableFields.map(field => ({
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
        if (reviewRelationalFields.includes(key)) {
          return {
            [reviewRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.ReviewWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.review.findMany({
    where: whereConditions,
    skip,
    take: limit,
    include: {
      service: true,
      user: true,
    },
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
  });

  const total = await prisma.review.count({
    where: whereConditions,
  });

  return {
    meta: {
      limit,
      page,
      total,
    },
    data: result,
  };
};

const getSingle = async (id: string): Promise<Review> => {
  const result = await prisma.review.findUnique({
    where: {
      id,
    },
    include: {
      service: true,
      user: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
  }

  return result;
};

const update = async (
  id: string,
  payload: Partial<Review>
): Promise<Review> => {
  const result = await prisma.review.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

export const ReviewService = {
  create,
  getAll,
  getSingle,
  update,
};
