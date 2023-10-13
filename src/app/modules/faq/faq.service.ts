/* eslint-disable @typescript-eslint/no-explicit-any */
import { FAQ, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { faqSearchableFields } from './faq.constant';
import { IFaqFilterRequest } from './faq.interface';

const create = async (payload: FAQ): Promise<FAQ> => {
  const result = await prisma.fAQ.create({ data: payload });

  return result;
};

const getAll = async (
  filters: IFaqFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<FAQ[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: faqSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.FAQWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.fAQ.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
  });

  const total = await prisma.fAQ.count({ where: whereConditions });

  return { meta: { total, page, limit }, data: result };
};

export const FAQService = {
  create,
  getAll,
};
