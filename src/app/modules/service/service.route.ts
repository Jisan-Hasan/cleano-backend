import { Role } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceController } from './service.controller';
import { ServiceValidation } from './service.validation';

const router = express.Router();

router.post(
  '/',
  auth(Role.admin),
  validateRequest(ServiceValidation.create),
  ServiceController.create
);

router.get('/:id', ServiceController.getById);

router.get('/', ServiceController.getAll);

router.patch(
  '/:id',
  auth(Role.admin),
  validateRequest(ServiceValidation.update),
  ServiceController.updateById
);

export const ServiceRoutes = router;
