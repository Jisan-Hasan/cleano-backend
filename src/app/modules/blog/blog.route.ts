import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BlogController } from './blog.controller';
import { BlogValidation } from './blog.validation';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BlogValidation.create),
  BlogController.create
);

router.get('/', BlogController.getAll);
router.get('/:id', BlogController.getSingle);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BlogValidation.update),
  BlogController.update
);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BlogController.deleteBlog);

export const BlogRoutes = router;
