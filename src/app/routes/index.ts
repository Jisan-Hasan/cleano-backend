import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BlogRoutes } from '../modules/blog/blog.route';
import { BookingRoutes } from '../modules/booking/booking.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { FAQRoutes } from '../modules/faq/faq.route';
import { ReviewRoutes } from '../modules/review/review.route';
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
  {
    path: '/booking',
    routes: BookingRoutes,
  },
  {
    path: '/faq',
    routes: FAQRoutes,
  },
  {
    path: '/review',
    routes: ReviewRoutes,
  },
  {
    path: '/blog',
    routes: BlogRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
