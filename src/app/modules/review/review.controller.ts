import { Review } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { reviewFilterableFields } from './review.constant';
import { ReviewService } from './review.service';

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.create(req.body);

  sendResponse<Review>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Review created successfully',
    data: result,
  });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, reviewFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await ReviewService.getAll(filters, options);

  sendResponse<Review[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingle = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getSingle(req.params.id);

  sendResponse<Review>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review fetched successfully',
    data: result,
  });
});

const update = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.update(req.params.id, req.body);

  sendResponse<Review>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review updated successfully',
    data: result,
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.deleteReview(req.params.id);

  sendResponse<Review>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review deleted successfully',
    data: result,
  });
});

export const ReviewController = {
  create,
  getAll,
  getSingle,
  update,
  deleteReview,
};
