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
exports.BlogController = void 0;
const http_status_1 = __importDefault(require('http-status'));
const pagination_1 = require('../../../constants/pagination');
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const pick_1 = __importDefault(require('../../../shared/pick'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const blog_constant_1 = require('./blog.constant');
const blog_service_1 = require('./blog.service');
const create = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.BlogService.create(req.body);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.CREATED,
      success: true,
      message: 'Blog created successfully',
      data: result,
    });
  })
);
const getAll = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(
      req.query,
      blog_constant_1.blogFilterableFields
    );
    const options = (0, pick_1.default)(
      req.query,
      pagination_1.paginationFields
    );
    const result = yield blog_service_1.BlogService.getAll(filters, options);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Blogs fetched successfully',
      data: result.data,
      meta: result.meta,
    });
  })
);
const getSingle = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.BlogService.getSingle(req.params.id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Blog fetched successfully',
      data: result,
    });
  })
);
const update = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.BlogService.update(
      req.params.id,
      req.body
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Blog updated successfully',
      data: result,
    });
  })
);
const deleteBlog = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.BlogService.deleteBlog(req.params.id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Blog deleted successfully',
      data: result,
    });
  })
);
exports.BlogController = {
  create,
  getAll,
  getSingle,
  update,
  deleteBlog,
};
