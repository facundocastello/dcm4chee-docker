const RECEIVE_STUDIES = '/studie/RECEIVE_STUDIES';
import axios from 'axios';
import validate from '../utils/validation';
import { receiveErrors } from './ui';

const initialState = {
  studies: []
};

export const loadStudies = ({ filters }) => (dispatch, getState) => {
  const form = getState().forms.forms['search-study'];
  form.PatientName = form.PatientName && `*${form.PatientName}*`;
  axios
    .get(`http://192.168.0.27:3000/studies`, {
      params: { ...form, ...filters }
    })
    .then(res => {
      dispatch(receiveStudies(res.data));
    });
};

export const receiveStudies = studies => ({
  type: RECEIVE_STUDIES,
  studies: studies
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_STUDIES:
      return { ...state, studies: action.studies };

    default:
      return state;
  }
}

export default reducer;
