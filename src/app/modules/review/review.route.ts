import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from './review.controller';
import { ReviewValidation } from './review.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(ReviewValidation.create),
  ReviewController.create
);

router.get('/', ReviewController.getAll);

export const ReviewRoutes = router;
