import {
  GET_PARTIES,
  UPDATE_NEW_PARTY,
} from '../actions/parties';

const initialState = {
  parties: {
    past: { total: '', partyDetails: {} },
    upcoming: { total: '', partyDetails: {} },
  },
  currentParty: {},
  newParty: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PARTIES:
      return {
        ...state,
        parties: action.payload.parties,
      };
    case UPDATE_NEW_PARTY:
      return {
        ...state,
        newParty: {
          ...state.newParty,
          ...action.payload.details,
        },
      };
    default:
      return state;
  }
}

export default reducer;
