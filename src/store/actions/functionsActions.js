import * as actionType from '../actionTypes';
import { axiosInstance } from '../../utils/RestClient';
import { setLoading } from './loader';

export const getFunctions = () => {
  return dispatch => {
    axiosInstance
      .get('/functionList/')
      .then(res => {
        if (res.status === 200 && Array.isArray(res.data.data)) {
          dispatch({
            type: actionType.SET_FUNCTIONS,
            value: res.data.data.map(funcObj => ({
              func_uuid: funcObj.func_uuid,
              key_name: funcObj.key_name,
              desc: funcObj.desc,
              input_param: JSON.parse(funcObj.input_param),
              output_param: JSON.parse(funcObj.output_param),
            })),
          });
        }
      })
      .catch(err => console.log(err));
    dispatch(setLoading(false));
  };
};

export const resetFunctions = () => {
  return { type: actionType.RESET_FUNCTIONS };
};
