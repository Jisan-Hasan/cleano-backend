'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.serviceRelationalFieldsMapper =
  exports.serviceRelationalFields =
  exports.serviceSearchableFields =
  exports.serviceFilterableFields =
    void 0;
exports.serviceFilterableFields = [
  'searchTerm',
  'name',
  'description',
  'categoryId',
];
exports.serviceSearchableFields = ['name', 'categoryId'];
exports.serviceRelationalFields = ['categoryId'];
exports.serviceRelationalFieldsMapper = {
  categoryId: 'category',
};
