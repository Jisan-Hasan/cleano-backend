'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require('express'));
const user_1 = require('../../../enums/user');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const auth_controller_1 = require('./auth.controller');
const auth_validation_1 = require('./auth.validation');
const router = express_1.default.Router();
router.post(
  '/signup',
  (0, validateRequest_1.default)(auth_validation_1.AuthValidation.signup),
  auth_controller_1.AuthController.signup
);
router.post(
  '/create-user',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.ADMIN,
    user_1.ENUM_USER_ROLE.SUPER_ADMIN
  ),
  (0, validateRequest_1.default)(auth_validation_1.AuthValidation.create),
  auth_controller_1.AuthController.createUser
);
router.post(
  '/login',
  (0, validateRequest_1.default)(auth_validation_1.AuthValidation.login),
  auth_controller_1.AuthController.login
);
router.post(
  '/change-password',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.ADMIN,
    user_1.ENUM_USER_ROLE.USER,
    user_1.ENUM_USER_ROLE.SUPER_ADMIN
  ),
  (0, validateRequest_1.default)(
    auth_validation_1.AuthValidation.changePassword
  ),
  auth_controller_1.AuthController.changePassword
);
exports.AuthRoutes = router;
