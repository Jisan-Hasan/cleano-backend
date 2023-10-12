export const bookingFilterableFields = [
  'searchTerm',
  'contractNo',
  'landmark',
  'userId',
  'serviceId',
  'city',
  'street',
];

export const bookingSearchableFields = [
  'contractNo',
  'landmark',
  'userId',
  'serviceId',
  'city',
  'street',
];

export const bookingRelationalFields = ['userId', 'serviceId'];

export const bookingRelationalFieldsMapper: { [key: string]: string } = {
  userId: 'user',
  serviceId: 'service',
};
