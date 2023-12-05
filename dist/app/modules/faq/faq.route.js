'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.FAQRoutes = void 0;
const express_1 = __importDefault(require('express'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const faq_controller_1 = require('./faq.controller');
const faq_validation_1 = require('./faq.validation');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const user_1 = require('../../../enums/user');
const router = express_1.default.Router();
router.post(
  '/',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN),
  (0, validateRequest_1.default)(faq_validation_1.FAQValidation.create),
  faq_controller_1.FAQController.create
);
router.get('/', faq_controller_1.FAQController.getAll);
router.get('/:id', faq_controller_1.FAQController.getSingle);
router.patch(
  '/:id',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN),
  (0, validateRequest_1.default)(faq_validation_1.FAQValidation.update),
  faq_controller_1.FAQController.update
);
router.delete(
  '/:id',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN),
  faq_controller_1.FAQController.deleteFaq
);
exports.FAQRoutes = router;
