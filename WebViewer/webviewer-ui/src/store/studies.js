const RECEIVE_STUDIES = '/studie/RECEIVE_STUDIES';
import axios from 'axios';
import validate from '../utils/validation';
import { receiveErrors } from './ui';

const initialState = {
  studies: [],
  level: 'study'
};

export const loadStudies = ({ filters }) => (dispatch, getState) => {
  const form = getState().forms.forms['search-study'];
  Object.keys(form).forEach(index => {
    debugger;
    if (form[index] === undefined || form[index] === '') {
      delete form[index];
    } else if (index === 'PatientName') {
      form[index] = `*${form.PatientName}*`;
    }
  });
  axios
    .get(`http://192.168.0.61:3000/studies`, {
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
      var level = '';
      if (action.studies.length) {
        debugger;
        level = action.studies[0].NumberofStudyRelatedSeries
          ? 'study'
          : action.studies[0].NumberofSeriesRelatedInstances
          ? 'serie'
          : 'instance';
      }
      return { ...state, studies: action.studies, level: level };

    default:
      return state;
  }
}

export default reducer;
