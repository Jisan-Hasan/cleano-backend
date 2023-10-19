import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FAQController } from './faq.controller';
import { FAQValidation } from './faq.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(FAQValidation.create),
  FAQController.create
);

router.get('/', FAQController.getAll);
router.get('/:id', FAQController.getSingle);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(FAQValidation.update),
  FAQController.update
);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), FAQController.deleteFaq);

export const FAQRoutes = router;
