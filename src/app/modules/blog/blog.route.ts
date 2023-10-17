import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BlogController } from './blog.controller';
import { BlogValidation } from './blog.validation';

const router = express.Router();

router.post('/', validateRequest(BlogValidation.create), BlogController.create);

router.get('/', BlogController.getAll);
router.get('/:id', BlogController.getSingle);

router.patch(
  '/:id',
  validateRequest(BlogValidation.update),
  BlogController.update
);

router.delete('/:id', BlogController.deleteBlog);

export const BlogRoutes = router;
