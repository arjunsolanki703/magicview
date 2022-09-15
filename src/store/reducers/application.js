import * as actionType from '../actionTypes';

const initialState = {
  applications: [],
  activeApplication: { app_uuid: null, app_name: '' },
};

const application = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_APPLICATION: {
      return {
        ...state,
        applications: action.value,
      };
    }
    case actionType.SET_APPLICATION_ACTIVE: {
      return {
        ...state,
        activeApplication: action.value,
      };
    }
    case actionType.RESET_APPLICATION: {
      return { ...state, applications: initialState.applications };
    }
    case actionType.RESET_APPLICATION_ACTIVE: {
      return {
        ...state,
        activeApplication: initialState.activeApplication,
      };
    }
    default:
      return state;
  }
};
export default application;
