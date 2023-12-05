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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const config_1 = __importDefault(require('../../../config'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const jwtHelpers_1 = require('../../../helpers/jwtHelpers');
const bcrypt_1 = require('../../../shared/bcrypt');
const prisma_1 = __importDefault(require('../../../shared/prisma'));
const signup = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    // check if email already exists
    const existingUser = yield prisma_1.default.user.findUnique({
      where: {
        email: payload.email,
      },
    });
    //   throw error if email already exists
    if (existingUser) {
      throw new ApiError_1.default(
        http_status_1.default.CONFLICT,
        'Email already exists'
      );
    }
    // hash user password
    payload.password = yield (0, bcrypt_1.hashPassword)(payload.password);
    //   save to database
    const result = yield prisma_1.default.user.create({
      data: payload,
    });
    return result;
  });
const login = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    // check if user exists
    const user = yield prisma_1.default.user.findUnique({
      where: {
        email: payload.email,
      },
    });
    //   throw error if user does not exist
    if (!user) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'User does not exist with this email'
      );
    }
    //  compare password
    const isPasswordMatched = yield (0, bcrypt_1.comparePassword)(
      payload.password,
      user.password
    );
    //  throw error if password does not match
    if (!isPasswordMatched) {
      throw new ApiError_1.default(
        http_status_1.default.UNAUTHORIZED,
        'Invalid password'
      );
    }
    //  generate access token
    const accessToken = jwtHelpers_1.jwtHelpers.createToken(
      { email: user.email, role: user.role },
      config_1.default.jwt.secret,
      config_1.default.jwt.expires_in
    );
    //  generate refresh token
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken(
      { email: user.email, role: user.role },
      config_1.default.jwt.refresh_secret,
      config_1.default.jwt.refresh_expires_in
    );
    // return accessToken and refreshToken
    return { accessToken, refreshToken };
  });
const changePassword = (email, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // check if old password and new password are same
    if (payload.oldPassword === payload.newPassword) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'New password cannot be same as old password'
      );
    }
    // check if user exists
    const user = yield prisma_1.default.user.findUnique({
      where: {
        email,
      },
    });
    //   throw error if user does not exist
    if (!user) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'User does not exist with this email'
      );
    }
    // compare old password
    const isPasswordMatched = yield (0, bcrypt_1.comparePassword)(
      payload.oldPassword,
      user.password
    );
    // throw error if password does not match
    if (!isPasswordMatched) {
      throw new ApiError_1.default(
        http_status_1.default.UNAUTHORIZED,
        "Current password doesn't match"
      );
    }
    // hash new password
    const newPassword = yield (0, bcrypt_1.hashPassword)(payload.newPassword);
    // update password
    const result = yield prisma_1.default.user.update({
      where: {
        email,
      },
      data: {
        password: newPassword,
      },
    });
    if (!result) {
      throw new ApiError_1.default(
        http_status_1.default.INTERNAL_SERVER_ERROR,
        "Can't Update Password. Try again later"
      );
    }
    return;
  });
exports.AuthService = {
  signup,
  login,
  changePassword,
};
