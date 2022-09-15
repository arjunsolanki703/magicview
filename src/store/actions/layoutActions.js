import { axiosInstance } from '../../utils/RestClient';
import uuid from 'react-uuid';
import * as actionType from '../actionTypes';
import { getSessionId, getUserUid } from '../../utils';

export const createView = (views, app_uuid, cloneName) => {
  let newAppUUID = uuid();

  return dispatch => {
    axiosInstance
      .post('/view', {
        app_uuid,
        view_uuid: newAppUUID,
        view_name: 'view' + views.length,
        session_id: getSessionId(),
        user_uid: getUserUid(),
      })
      .then(async res => {
        dispatch(getAllViews(app_uuid, views));
      })
      .catch(err => console.log(err));
  };
};

export const getAllViews = (app_uuid, prevViews) => {
  return dispatch => {
    axiosInstance
      .get('/viewList/' + app_uuid)
      .then(async res => {
        if (prevViews) {
          let newViews = res.data.data.map(view => {
            let prevData = prevViews.find(prev => {
              return prev.view_uuid === view.view_uuid;
            });

            if (prevData) {
              return {
                ...prevData,
              };
            } else {
              return {
                view_uuid: view.view_uuid,
                view_name: view.view_name,
                editMode: false,
                isOpen: false,
                isUpdated: false,
                layouts: [],
              };
            }
          });

          dispatch({ type: actionType.SET_VIEW, value: newViews });
        } else {
          dispatch({
            type: actionType.SET_VIEW,
            value: res.data.data.map(view => ({
              view_uuid: view.view_uuid,
              view_name: view.view_name,
              editMode: false,
              isOpen: false,
              isUpdated: false,
              layouts: [],
            })),
          });
        }
      })
      .catch(err => console.log(err));
  };
};

export const deleteView = (app_uuid, view_uuid, pointer, views) => {
  return dispatch => {
    axiosInstance
      .delete('/view/delete/' + view_uuid + '/')
      .then(async res => {
        pointer === view_uuid && setPointerTo(null);
        dispatch(getAllViews(app_uuid, views));
      })
      .catch(err => console.log(err));
  };
};

export const toggleEditMode = (views, view_uuid, value) => {
  return {
    type: actionType.SET_VIEW,
    value: views.map(view => ({
      ...view,
      editMode: view.view_uuid === view_uuid ? value : false,
    })),
  };
};

export const renameView = (views, view_uuid, value, app_uuid) => {
  return dispatch => {
    axiosInstance
      .put('/view/update', {
        app_uuid: app_uuid,
        view_uuid: view_uuid,
        view_name: value,
        session_id: getSessionId(),
        user_uid: getUserUid(),
      })
      .then(async res => {
        dispatch({
          type: actionType.SET_VIEW,
          value: views.map(view => ({
            ...view,
            view_name: view.view_uuid === view_uuid ? value : view.view_name,
            editMode: view.view_uuid === view_uuid ? false : view.editMode,
          })),
        });
      })
      .catch(err => console.log(err));
  };
};

export const openCloseView = (views, view_uuid, value) => {
  let isViewInEdit = false; // flag to check if component needs to be fetched
  views.forEach(view => {
    if (view.view_uuid === view_uuid && view.isUpdated) {
      isViewInEdit = true;
    }
  });

  return async dispatch => {
    try {
      if (value && !isViewInEdit) {
        const response = await axiosInstance.get(`/compList/${view_uuid}`);
        const data = response.data?.data || [];

        views.forEach(view => {
          if (view.view_uuid === view_uuid) {
            view.layouts = data.map(obj => ({
              name: obj.comp_name,
              props: JSON.parse(obj.properties),
              metaData: JSON.parse(obj.meta_data),
              selected: false,
              comp_uuid: obj.comp_uuid,
            }));
          }
        });
      }

      return dispatch({
        type: actionType.SET_VIEW,
        value: views.map(view => ({
          ...view,
          isOpen: view.view_uuid === view_uuid ? value : view.isOpen,
        })),
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const addLayoutsToView = (views, view_uuid, value) => {
  return {
    type: actionType.SET_VIEW,
    value: views.map(view => {
      if (view.view_uuid !== view_uuid) {
        return view;
      } else {
        const updatedView = {
          ...view,
          isUpdated: true,
          layouts: view.layouts.map(obj => ({ ...obj, selected: false })),
        };
        updatedView.layouts.push({
          name: value.name,
          props: JSON.parse(JSON.stringify(value.props)),
          metaData: JSON.parse(JSON.stringify(value.metaData)),
          selected: true,
          comp_uuid: null,
        });
        return updatedView;
      }
    }),
  };
};

export const changeLayoutProps = views => {
  return {
    type: actionType.SET_VIEW,
    value: views,
  };
};

export const setPointerTo = view_uuid => {
  return {
    type: actionType.SET_VIEW_POINTER,
    value: view_uuid,
  };
};

export const saveView = (app_uuid, views, viewObj) => {
  return async dispatch => {
    try {
      const requestComponent = viewObj.layouts.map(obj => ({
        comp_name: obj.name,
        meta_data: JSON.stringify(obj.metaData),
        properties: JSON.stringify(obj.props),
        comp_uuid: obj.comp_uuid || uuid(),
        is_add: obj.comp_uuid ? false : true,
      }));

      await axiosInstance.post('/component', {
        app_uuid,
        view_uuid: viewObj.view_uuid,
        components: requestComponent,
        session_id: getSessionId(),
        user_uid: getUserUid(),
      });

      return dispatch({
        type: actionType.SET_VIEW,
        value: views.map(view => {
          if (view.view_uuid !== viewObj.view_uuid) {
            return view;
          } else {
            return {
              ...view,
              isUpdated: false,
              layouts: view.layouts.map((layout, i) => {
                layout.comp_uuid = requestComponent[i].comp_uuid;
                return layout;
              }),
            };
          }
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const resetView = () => {
  return { type: actionType.RESET_VIEW };
};

export const resetViewPointer = () => {
  return { type: actionType.RESET_VIEW_POINTER };
};
