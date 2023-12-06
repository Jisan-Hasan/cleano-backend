export const serviceFilterableFields: string[] = [
  'searchTerm',
  'name',
  'description',
];

export const serviceSearchableFields: string[] = ['name', 'categoryId'];

export const serviceRelationalFields: string[] = ['categoryId'];

export const serviceRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'category',
};
