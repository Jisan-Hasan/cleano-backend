import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { ServiceRoutes } from '../modules/service/service.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    routes: AuthRoutes,
  },
  {
    path: '/user',
    routes: UserRoutes,
  },
  {
    path: '/category',
    routes: CategoryRoutes,
  },
  {
    path: '/service',
    routes: ServiceRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
