import { axiosInstance } from '../../utils/RestClient';
import * as actionType from '../actionTypes';

export const getPreviewStructure = (app_uuid, view_uuid) => {
  return async dispatch => {
    try {
      const response = await axiosInstance.get(`/compList/${view_uuid}`);
      const data = response.data?.data || [];

      const layouts = data.map(obj => ({
        name: obj.comp_name,
        props: JSON.parse(obj.properties),
        metaData: JSON.parse(obj.meta_data),
        comp_uuid: obj.comp_uuid,
      }));

      return dispatch({
        type: actionType.SET_PREVIEW_STRUCTURE,
        value: {
          app_uuid: app_uuid,
          view_uuid: view_uuid,
          layouts: layouts,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const resetPreviewStructure = () => {
  return { type: actionType.RESET_PREVIEW_STRUCTURE };
};
