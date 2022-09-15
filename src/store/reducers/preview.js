import * as actionType from '../actionTypes';

const initialState = {
  structure: {
    app_uuid: null,
    view_uuid: null,
    layouts: [],
  },
};

const preview = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_PREVIEW_STRUCTURE: {
      return {
        ...state,
        structure: action.value,
      };
    }
    case actionType.RESET_PREVIEW_STRUCTURE: {
      return { ...state, structure: initialState.structure };
    }
    default:
      return state;
  }
};

export default preview;
