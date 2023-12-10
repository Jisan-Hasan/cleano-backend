import { Role } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(AuthValidation.signup),
  AuthController.signup
);

router.get('/verify-email/:token', AuthController.verifyEmail);

router.post(
  '/login',
  validateRequest(AuthValidation.login),
  AuthController.login
);

router.post(
  '/change-password',
  auth(Role.admin, Role.super_admin, Role.user),
  validateRequest(AuthValidation.changePassword),
  AuthController.changePassword
);

router.post(
  '/forgot-password',
  validateRequest(AuthValidation.forgotPassword),
  AuthController.forgotPassword
);

router.post(
  '/reset-password/:token',
  validateRequest(AuthValidation.resetPassword),
  AuthController.resetPassword
);

router.get('/verify-token/:token', AuthController.verifyToken);

export const AuthRoutes = router;
