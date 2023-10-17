/* eslint-disable @typescript-eslint/no-explicit-any */
import { Blog, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { blogSearchableFields } from './blog.constant';
import { IBlogFilterRequest } from './blog.interface';

const create = async (payload: Blog): Promise<Blog> => {
  const result = await prisma.blog.create({
    data: payload,
  });

  return result;
};

const getAll = async (
  filters: IBlogFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Blog[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: blogSearchableFields.map(field => ({
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
        return {
          [key]: {
            equals: (filterData as any)[key],
          },
        };
      }),
    });
  }

  const whereConditions: Prisma.BlogWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.blog.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
  });

  const total = await prisma.blog.count({ where: whereConditions });

  return { meta: { total, page, limit }, data: result };
};

const getSingle = async (id: string): Promise<Blog> => {
  const result = await prisma.blog.findUnique({
    where: { id },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  return result;
};

const update = async (id: string, payload: Partial<Blog>): Promise<Blog> => {
  const result = await prisma.blog.update({
    where: { id },
    data: payload,
  });

  return result;
};

const deleteBlog = async (id: string): Promise<Blog> => {
  const result = await prisma.blog.delete({
    where: { id },
  });

  return result;
};

export const BlogService = {
  create,
  getAll,
  getSingle,
  update,
  deleteBlog,
};
