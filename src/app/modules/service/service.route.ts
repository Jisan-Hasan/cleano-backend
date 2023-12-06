import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceController } from './service.controller';
import { ServiceValidation } from './service.validation';

const router = express.Router();

router.post(
  '/',
  // auth(Role.admin),
  validateRequest(ServiceValidation.create),
  ServiceController.create
);

export const ServiceRoutes = router;
