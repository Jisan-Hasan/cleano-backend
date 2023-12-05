'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require('express'));
const user_1 = require('../../../enums/user');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const user_controller_1 = require('./user.controller');
const user_validation_1 = require('./user.validation');
const router = express_1.default.Router();
router.patch(
  '/:email',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.USER,
    user_1.ENUM_USER_ROLE.ADMIN,
    user_1.ENUM_USER_ROLE.SUPER_ADMIN
  ),
  (0, validateRequest_1.default)(
    user_validation_1.UserValidation.updateProfile
  ),
  user_controller_1.UserController.updateProfile
);
router.get('/', user_controller_1.UserController.getAll);
router.get('/:email', user_controller_1.UserController.getSingle);
router.delete(
  '/:email',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.ADMIN,
    user_1.ENUM_USER_ROLE.SUPER_ADMIN
  ),
  user_controller_1.UserController.deleteUser
);
exports.UserRoutes = router;
