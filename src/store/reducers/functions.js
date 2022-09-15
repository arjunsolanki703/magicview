import * as actionType from '../actionTypes';

const initialState = {
  functions: [],
};

const functions = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_FUNCTIONS: {
      return {
        ...state,
        functions: action.value,
      };
    }
    case actionType.RESET_FUNCTIONS: {
      return { ...state, functions: initialState.functions };
    }
    default:
      return state;
  }
};

export default functions;
