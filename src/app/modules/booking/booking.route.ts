import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookingController } from './booking.controller';
import { BookingValidation } from './booking.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(BookingValidation.create),
  BookingController.create
);

router.get('/', BookingController.getAll);
router.get('/:id', BookingController.getSingle);

export const BookingRoutes = router;
