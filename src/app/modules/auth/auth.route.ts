import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(AuthValidation.signup),
  AuthController.signup
);

router.post(
  '/create-admin',
  validateRequest(AuthValidation.signup),
  AuthController.createAdmin
);

router.post(
  '/login',
  validateRequest(AuthValidation.login),
  AuthController.login
);

export const AuthRoutes = router;
