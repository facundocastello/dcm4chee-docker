const RECEIVE_FORM_VALUE = "forms/RECEIVE_FORM_VALUE";

const initialState = {
  forms: {}
};

export const receiveFormValue = (form, input) => {
  return {
    type: RECEIVE_FORM_VALUE,
    form: form,
    input: input
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_FORM_VALUE:
      return {
        ...state,
        forms: {
          ...state.forms,
          [action.form]: {
            ...state.forms[action.form],
            ...action.input
          }
        }
      };

    default:
      return state;
  }
};
