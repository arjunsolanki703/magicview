import * as actionType from '../actionTypes';

export const setLoading = value => {
  return {
    type: actionType.SET_LOADER,
    value: value,
  };
};

export const setError = value => {
  return {
    type: actionType.SET_ERROR,
    value: value,
  };
};

export const setErrorMessage = value => {
  return {
    type: actionType.SET_ERROR_MSG,
    value: value,
  };
};
