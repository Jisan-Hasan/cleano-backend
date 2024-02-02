import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { OrderService } from './order.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';

// ** Place Order Controller ** //
const placeOrder = catchAsync(async (req: Request, res: Response) => {
  // destructure payload from request body
  const { pickup_details, services, paymentMethod } = req.body;

  // get user id from request object
  const { userId } = req.user as JwtPayload;

  const result = await OrderService.placeOrder(
    userId,
    pickup_details,
    services,
    paymentMethod
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order placed successfully',
    data: result,
  });
});

export const OrderController = {
  placeOrder,
};
