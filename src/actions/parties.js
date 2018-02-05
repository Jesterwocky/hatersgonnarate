import { parties } from './_testData.js';

export const GET_PARTIES = 'GET_PARTIES';
export const UPDATE_NEW_PARTY = 'UPDATE_NEW_PARTY';

export function getParties() {
  return {
    type: GET_PARTIES,
    payload: {
      parties,
    },
  };
}

export function updateNewParty(details) {
  return {
    type: UPDATE_NEW_PARTY,
    payload: {
      details,
    },
  };
}
