import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.patch(
  '/:email',
  validateRequest(UserValidation.updateProfile),
  UserController.updateProfile
);

router.get('/', UserController.getAll);
router.get('/:email', UserController.getSingle);

router.delete('/:email', UserController.deleteUser);

export const UserRoutes = router;
