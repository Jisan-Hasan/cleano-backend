import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BlogController } from './blog.controller';
import { BlogValidation } from './blog.validation';

const router = express.Router();

router.post('/', validateRequest(BlogValidation.create), BlogController.create);

router.get('/', BlogController.getAll);
router.get('/:id', BlogController.getSingle);

export const BlogRoutes = router;
