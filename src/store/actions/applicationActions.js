import * as actionType from '../actionTypes';
import { axiosInstance } from '../../utils/RestClient';
import uuid from 'react-uuid';
import { setLoading } from './loader';
import { getSessionId, getUserUid } from '../../utils';

export const createApplication = (apps, navigate) => {
  let newAppUUID = uuid();

  return dispatch => {
    axiosInstance
      .post('/application', {
        app_uuid: newAppUUID,
        app_name: `application ${apps.length + 1}`,
        session_id: getSessionId(),
        user_uid: getUserUid(),
      })
      .then(() => {
        navigate(`/application/${newAppUUID}`);
      })
      .catch(err => console.log(err));
  };
};

export const getApplications = () => {
  return dispatch => {
    axiosInstance
      .get('/applicationList')
      .then(res => {
        if (res.status === 200 && Array.isArray(res.data.data)) {
          dispatch({
            type: actionType.SET_APPLICATION,
            value: res.data.data,
          });
        }
      })
      .catch(err => console.log(err));
    dispatch(setLoading(false));
  };
};

export const deleteApplication = app_uuid => {
  return dispatch => {
    axiosInstance
      .delete(`/application/delete/${app_uuid}`)
      .then(res => {
        dispatch(getApplications());
      })
      .catch(err => console.log(err));
  };
};

export const setApplicationActive = app_uuid => {
  return dispatch => dispatch(getApplication(app_uuid));
};

export const getApplication = app_uuid => {
  return dispatch => {
    axiosInstance
      .get(`/application/${app_uuid}`)
      .then(res => res.data)
      .then(data => {
        dispatch({
          type: actionType.SET_APPLICATION_ACTIVE,
          value: {
            app_uuid: data.data.app_uuid || null,
            app_name: data.data.app_name || '',
          },
        });
      })
      .catch(err => {
        console.log(err);
        // setting app_uuid only if API call has failure
        dispatch({
          type: actionType.SET_APPLICATION_ACTIVE,
          value: { app_uuid: app_uuid, app_name: '' },
        });
      });
  };
};

export const renameApplication = (app_uuid, value) => {
  return dispatch => {
    axiosInstance
      .put('/application/update', {
        app_uuid: app_uuid,
        app_name: value,
        session_id: getSessionId(),
        user_uid: getUserUid(),
      })
      .then(res => {
        dispatch(getApplication(app_uuid));
      })
      .catch(err => console.log(err));
  };
};

export const resetApplication = () => {
  return { type: actionType.RESET_APPLICATION };
};

export const resetApplicationActive = () => {
  return { type: actionType.RESET_APPLICATION_ACTIVE };
};
