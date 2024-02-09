import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

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

//** Get All Orders From a user */
const getUserOrders = catchAsync(async (req: Request, res: Response) => {
  // destructure page and limit from query
  const paginationOptions = pick(req.query, paginationFields);

  // get user id from request object
  const { userId } = req.user as JwtPayload;

  const result = await OrderService.getUserOrders(userId, paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User orders fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

//** Get Specific Order Details */
const getOrderDetailsById = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;

  const result = await OrderService.getOrderDetailsById(orderId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order details fetched successfully',
    data: result,
  });
});

//** Export Order Controllers */
export const OrderController = {
  placeOrder,
  getUserOrders,
  getOrderDetailsById,
};
