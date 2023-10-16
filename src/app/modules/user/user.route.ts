import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.patch(
  '/update/:email',
  validateRequest(UserValidation.updateProfile),
  UserController.updateProfile
);

router.get('/', UserController.getAll);
router.get('/:email', UserController.getSingle);

export const UserRoutes = router;
