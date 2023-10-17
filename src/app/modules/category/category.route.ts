import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(CategoryValidation.createOrUpdate),
  CategoryController.create
);

router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getSingle);

router.patch(
  '/:id',
  validateRequest(CategoryValidation.createOrUpdate),
  CategoryController.update
);

router.delete('/:id', CategoryController.deleteCategory);

export const CategoryRoutes = router;
