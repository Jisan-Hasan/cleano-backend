'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require('express'));
const user_1 = require('../../../enums/user');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const blog_controller_1 = require('./blog.controller');
const blog_validation_1 = require('./blog.validation');
const router = express_1.default.Router();
router.post(
  '/',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN),
  (0, validateRequest_1.default)(blog_validation_1.BlogValidation.create),
  blog_controller_1.BlogController.create
);
router.get('/', blog_controller_1.BlogController.getAll);
router.get('/:id', blog_controller_1.BlogController.getSingle);
router.patch(
  '/:id',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN),
  (0, validateRequest_1.default)(blog_validation_1.BlogValidation.update),
  blog_controller_1.BlogController.update
);
router.delete(
  '/:id',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN),
  blog_controller_1.BlogController.deleteBlog
);
exports.BlogRoutes = router;
