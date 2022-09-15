import * as actionType from '../actionTypes';

const initialState = {
  error: false,
  isLoading: false,
  errorMsg: '',
  dummy: [],
};

const loading = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_LOADER: {
      return {
        ...state,
        isLoading: action.value,
        dummy: action.data,
      };
    }
    case actionType.SET_ERROR: {
      return {
        ...state,
        error: action.value,
      };
    }
    case actionType.SET_ERROR_MSG: {
      return {
        ...state,
        errorMsg: action.value,
      };
    }
    case actionType.LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
};
export default loading;
