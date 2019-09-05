const RECEIVE_SAMPLE = '/sample/RECEIVE_SAMPLE';
import validate from '../utils/validation';
import { receiveErrors } from './ui';

const initialState = {
  samples: []
};

export const receiveSample = samples => ({
  type: RECEIVE_SAMPLE,
  samples: samples
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_SAMPLE:
      return { ...state, samples: action.samples };

    default:
      return state;
  }
}

export default reducer;
