import {isValidObjectId} from 'mongoose';

export const getModelQuery = (
  id: string,
  {
    slugProp = 'slug',
    numberProp = 'id',
  }: {slugProp?: string; numberProp?: string} = {}
) => {
  const isObjectId = isValidObjectId(id);
  const isNumber = /^\d+$/.test(id);
  return {
    [isObjectId ? '_id' : isNumber ? numberProp : slugProp]: isObjectId
      ? id
      : isNumber
      ? +id
      : {$regex: `^${id}`, $options: 'i'},
  };
};
