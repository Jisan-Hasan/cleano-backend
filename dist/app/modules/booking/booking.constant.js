'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.bookingRelationalFieldsMapper =
  exports.bookingRelationalFields =
  exports.bookingSearchableFields =
  exports.bookingFilterableFields =
    void 0;
exports.bookingFilterableFields = [
  'searchTerm',
  'contractNo',
  'landmark',
  'userId',
  'serviceId',
  'city',
  'street',
];
exports.bookingSearchableFields = [
  'contractNo',
  'landmark',
  'userId',
  'serviceId',
  'city',
  'street',
];
exports.bookingRelationalFields = ['userId', 'serviceId'];
exports.bookingRelationalFieldsMapper = {
  userId: 'user',
  serviceId: 'service',
};
