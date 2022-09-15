import * as actionType from '../actionTypes';

const initialState = {
  views: [],
  pointingView: null,
};

const layout = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_VIEW: {
      return {
        ...state,
        views: action.value,
      };
    }
    case actionType.SET_VIEW_POINTER: {
      return {
        ...state,
        pointingView: action.value,
      };
    }
    case actionType.RESET_VIEW: {
      return { ...state, views: initialState.views };
    }
    case actionType.RESET_VIEW_POINTER: {
      return { ...state, pointingView: initialState.pointingView };
    }
    default:
      return state;
  }
};
export default layout;
