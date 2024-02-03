/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { getNewOrderNumber, getOrderServices } from './order.utils';

// ** Place Order Service ** //
const placeOrder = async (
  userId: string,
  pickup_details: any,
  services: any,
  paymentMethod: any
) => {
  const orderNumber = await getNewOrderNumber();

  const { orderServices, total } = await getOrderServices(services);

  // initiate transaction
  const result = await prisma.$transaction(async transactionClient => {
    // create new order in database
    const order = await transactionClient.order.create({
      data: {
        orderNumber,
        user_id: userId,
        total: total,
      },
      select: {
        id: true,
        orderNumber: true,
      },
    });

    // create order items in database
    await transactionClient.orderItem.createMany({
      data: orderServices.map((service: any) => ({
        order_id: order.id,
        name: service.name,
        price: service.price,
        quantity: service.quantity,
        service_id: service.service_id,
      })),
    });

    // create pickup details in database
    await transactionClient.pickupDetails.create({
      data: {
        order_id: order.id,
        address: pickup_details.address,
        ...pickup_details,
      },
    });

    // create payment in database
    await transactionClient.payment.create({
      data: {
        order_id: order.id,
        method: paymentMethod,
        amount: total,
      },
    });

    return order;
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Order could not be placed');
  }

  return result;
};

//** Get All Orders From a user */
const getUserOrders = async (
  userId: string,
  paginationOptions: IPaginationOptions
) => {
  // destructure page and limit from pagination options
  const { page, limit, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const orders = await prisma.order.findMany({
    where: {
      user_id: userId,
    },
    select: {
      id: true,
      orderNumber: true,
      createdAt: true,
      total: true,
      payment: {
        select: {
          method: true,
          is_paid: true,
        },
      },
      status: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    skip,
    take: limit,
  });

  // get total count of orders
  const total = await prisma.order.count({
    where: {
      user_id: userId,
    },
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: orders,
  };
};

//** Export Order Service */
export const OrderService = {
  placeOrder,
  getUserOrders,
};
