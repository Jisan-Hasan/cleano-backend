import { Role } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './order.controller';
import { OrderValidation } from './order.validation';

const router = express.Router();

// ** Place Order Route ** //
router.post(
  '/place-order',
  validateRequest(OrderValidation.placeOrder),
  auth(Role.user),
  OrderController.placeOrder
);

//** Get All Orders From a user */
router.get(
  '/get-orders/user',
  auth(Role.user, Role.admin, Role.super_admin),
  OrderController.getUserOrders
);

export const OrderRoutes = router;
