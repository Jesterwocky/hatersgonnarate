// action types
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

// action creators
function openModalAction(modalName, data = {}) {
  return {
    type: OPEN_MODAL,
    payload: {
      modalName,
      data
    }
  };
}

function closeModalAction() {
  return { type: CLOSE_MODAL };
}

// action dispatchers
export function openModal(dispatch, modalName, data) {
  dispatch(openModalAction(modalName, data));
}

export function closeModal(dispatch) {
  dispatch(closeModalAction);
}
