import { FAQ } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
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

export const FAQController = {
  create,
};
