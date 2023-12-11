/* eslint-disable @typescript-eslint/no-explicit-any */
import { Service } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { serviceSearchableFields } from './service.constant';
import { IServiceFilterRequest } from './service.interface';

const create = async (payload: Service): Promise<Service> => {
  const result = await prisma.service.create({
    data: payload,
  });

  return result;
};

const getAll = async (
  filters: IServiceFilterRequest,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Service[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  // sorting
  let orderBy = {};
  if (sortBy && sortOrder) {
    orderBy = {
      [sortBy]: sortOrder,
    };
  } else {
    orderBy = {
      createdAt: 'desc',
    };
  }

  const andConditions = [];

  // searching;
  if (searchTerm) {
    andConditions.push({
      OR: serviceSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  //filtering
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // get data according to pagination and filtering
  const result = await prisma.service.findMany({
    where: whereConditions,
    orderBy,
    skip,
    take: limit,
  });

  // get total count of data
  const total = await prisma.service.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getById = async (id: string): Promise<Service> => {
  const result = await prisma.service.findUnique({
    where: {
      id,
    },
  });

  // throw error if result is null
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }

  return result;
};

export const ServiceService = {
  create,
  getAll,
  getById,
};
