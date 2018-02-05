import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from '../../actions/modals/modals';

const initialState = {
  modalName: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        modalName: action.payload.modalName,
        data: action.payload.data,
      };
    case CLOSE_MODAL:
      return {
        modalName: null,
        data: {},
      };
    default:
      return state;
  }
}

export default reducer;
