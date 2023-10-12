import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceController } from './service.controller';
import { ServiceValidation } from './service.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(ServiceValidation.create),
  ServiceController.create
);

router.get('/', ServiceController.getAll);
router.get('/:id', ServiceController.getSingle);

router.patch(
  '/:id',
  validateRequest(ServiceValidation.update),
  ServiceController.update
);

router.delete('/:id', ServiceController.deleteService);

export const ServiceRoutes = router;
