"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRelationalFieldsMapper = exports.reviewRelationalFields = exports.reviewSearchableFields = exports.reviewFilterableFields = void 0;
exports.reviewFilterableFields = [
    'searchTerm',
    'comment',
    'rating',
    'userId',
    'serviceId',
];
exports.reviewSearchableFields = [
    'comment',
    'rating',
    'userId',
    'serviceId',
];
exports.reviewRelationalFields = ['userId', 'serviceId'];
exports.reviewRelationalFieldsMapper = {
    userId: 'user',
    serviceId: 'service',
};
