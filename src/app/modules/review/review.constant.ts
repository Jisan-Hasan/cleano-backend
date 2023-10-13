export const reviewFilterableFields: string[] = [
  'searchTerm',
  'comment',
  'rating',
  'userId',
  'serviceId',
];

export const reviewSearchableFields: string[] = [
  'comment',
  'rating',
  'userId',
  'serviceId',
];

export const reviewRelationalFields = ['userId', 'serviceId'];

export const reviewRelationalFieldsMapper: { [key: string]: string } = {
  userId: 'user',
  serviceId: 'service',
};
