'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const auth_route_1 = require('../modules/auth/auth.route');
const blog_route_1 = require('../modules/blog/blog.route');
const booking_route_1 = require('../modules/booking/booking.route');
const category_route_1 = require('../modules/category/category.route');
const faq_route_1 = require('../modules/faq/faq.route');
const review_route_1 = require('../modules/review/review.route');
const service_route_1 = require('../modules/service/service.route');
const user_route_1 = require('../modules/user/user.route');
const router = express_1.default.Router();
const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    routes: auth_route_1.AuthRoutes,
  },
  {
    path: '/user',
    routes: user_route_1.UserRoutes,
  },
  {
    path: '/category',
    routes: category_route_1.CategoryRoutes,
  },
  {
    path: '/service',
    routes: service_route_1.ServiceRoutes,
  },
  {
    path: '/booking',
    routes: booking_route_1.BookingRoutes,
  },
  {
    path: '/faq',
    routes: faq_route_1.FAQRoutes,
  },
  {
    path: '/review',
    routes: review_route_1.ReviewRoutes,
  },
  {
    path: '/blog',
    routes: blog_route_1.BlogRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
