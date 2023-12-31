import { FAQ } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { faqFilterableFields } from './faq.constant';
import { FAQService } from './faq.service';

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await FAQService.create(req.body);

  sendResponse<FAQ>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'FAQ created successfully',
    data: result,
  });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, faqFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await FAQService.getAll(filters, options);

  sendResponse<FAQ[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FAQs fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingle = catchAsync(async (req: Request, res: Response) => {
  const result = await FAQService.getSingle(req.params.id);

  sendResponse<FAQ>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FAQ fetched successfully',
    data: result,
  });
});

const update = catchAsync(async (req: Request, res: Response) => {
  const result = await FAQService.update(req.params.id, req.body);

  sendResponse<FAQ>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FAQ updated successfully',
    data: result,
  });
});

const deleteFaq = catchAsync(async (req: Request, res: Response) => {
  const result = await FAQService.deleteFaq(req.params.id);

  sendResponse<FAQ>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FAQ deleted successfully',
    data: result,
  });
});

export const FAQController = {
  create,
  getAll,
  getSingle,
  update,
  deleteFaq,
};
