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
exports.AuthController = void 0;
const http_status_1 = __importDefault(require('http-status'));
const config_1 = __importDefault(require('../../../config'));
const jwtHelpers_1 = require('../../../helpers/jwtHelpers');
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const auth_service_1 = require('./auth.service');
const signup = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield auth_service_1.AuthService.signup(req.body);
    (0, sendResponse_1.default)(res, {
      statusCode: 201,
      success: true,
      message: 'Signup successful',
    });
  })
);
const createUser = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield auth_service_1.AuthService.signup(req.body);
    (0, sendResponse_1.default)(res, {
      statusCode: 201,
      success: true,
      message: 'Admin created successfully',
    });
  })
);
const login = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.login(req.body);
    // set refresh token into cookie
    // const cookieOptions = {
    //   secure: config.env === 'production',
    //   httpOnly: true,
    // };
    // res.cookie('refreshToken', result.refreshToken, cookieOptions);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Login successful',
      data: {
        accessToken: result.accessToken,
      },
    });
    res.send(result);
  })
);
const changePassword = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // get email from access token
    const { email } = jwtHelpers_1.jwtHelpers.verifyToken(
      req.headers.authorization,
      config_1.default.jwt.secret
    );
    yield auth_service_1.AuthService.changePassword(email, req.body);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Password changed successfully',
    });
  })
);
exports.AuthController = {
  signup,
  createUser,
  login,
  changePassword,
};
