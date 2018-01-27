import { user } from './_testData.js';

export const GET_USER = 'GET_USER';
export const UPDATE_USER = 'UPDATE_USER';

export function getUser() {
  return {
    type: GET_USER,
    payload: {
      user
    }
  };
}

export function updateUser(data) {
  return {
    type: GET_USER,
    payload: {
      user: data
    }
  };
}
