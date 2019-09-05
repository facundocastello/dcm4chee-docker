const RECEIVE_ERRORS = "ui/errors";

const initialState = {
  errors: {}
};

export const receiveErrors = errors => {
  return {
    type: RECEIVE_ERRORS,
    errors: errors
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ERRORS:
      return { ...state, errors: action.errors };

    default:
      return state;
  }
};
