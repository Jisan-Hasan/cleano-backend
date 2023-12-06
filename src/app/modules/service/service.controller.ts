import { Service } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ServiceService } from './service.service';

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceService.create(req.body);

  sendResponse<Service>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Service created successfully',
    data: result,
  });
});

export const ServiceController = {
  create,
};
