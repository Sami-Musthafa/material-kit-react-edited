import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await response.json();
  return data;
};

export const users = [...Array(24)].map((_, index) => ({
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
}));
