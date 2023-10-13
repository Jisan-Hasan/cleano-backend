import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FAQController } from './faq.controller';
import { FAQValidation } from './faq.validation';

const router = express.Router();

router.post('/', validateRequest(FAQValidation.create), FAQController.create);

router.get('/', FAQController.getAll);
router.get('/:id', FAQController.getSingle);

router.patch(
  '/:id',
  validateRequest(FAQValidation.update),
  FAQController.update
);

export const FAQRoutes = router;
