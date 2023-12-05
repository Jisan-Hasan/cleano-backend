'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.CategoryController = void 0;
const http_status_1 = __importDefault(require('http-status'));
const pagination_1 = require('../../../constants/pagination');
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const pick_1 = __importDefault(require('../../../shared/pick'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const category_constant_1 = require('./category.constant');
const category_service_1 = require('./category.service');
const create = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.CategoryService.create(req.body);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.CREATED,
      success: true,
      message: 'Category created successfully',
      data: result,
    });
  })
);
const getAll = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(
      req.query,
      category_constant_1.categoryFilterableFields
    );
    const options = (0, pick_1.default)(
      req.query,
      pagination_1.paginationFields
    );
    const result = yield category_service_1.CategoryService.getAll(
      filters,
      options
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Categories fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  })
);
const getSingle = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.CategoryService.getSingle(
      req.params.id
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Category fetched successfully',
      data: result,
    });
  })
);
const update = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.CategoryService.update(
      req.params.id,
      req.body
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Category updated successfully',
      data: result,
    });
  })
);
const deleteCategory = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.CategoryService.deleteCategory(
      req.params.id
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.NO_CONTENT,
      success: true,
      message: 'Category deleted successfully',
      data: result,
    });
  })
);
exports.CategoryController = {
  create,
  getAll,
  getSingle,
  update,
  deleteCategory,
};
