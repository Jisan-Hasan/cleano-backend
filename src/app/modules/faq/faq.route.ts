import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FAQController } from './faq.controller';
import { FAQValidation } from './faq.validation';

const router = express.Router();

router.post('/', validateRequest(FAQValidation.create), FAQController.create);

router.get('/', FAQController.getAll);

export const FAQRoutes = router;
