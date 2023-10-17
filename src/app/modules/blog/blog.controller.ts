import { Blog } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { blogFilterableFields } from './blog.constant';
import { BlogService } from './blog.service';

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.create(req.body);

  sendResponse<Blog>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, blogFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await BlogService.getAll(filters, options);

  sendResponse<Blog[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getSingle = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.getSingle(req.params.id);

  sendResponse<Blog>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog fetched successfully',
    data: result,
  });
});

const update = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.update(req.params.id, req.body);

  sendResponse<Blog>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog updated successfully',
    data: result,
  });
});

export const BlogController = {
  create,
  getAll,
  getSingle,
  update,
};
