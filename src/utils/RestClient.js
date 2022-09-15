import { config } from '../constants';
import axios from 'axios';
import { clearAppSessionData, getSessionId } from './index';

const axiosInstance = axios.create({
  baseURL: config.apiNetworkInterface,
});

//interceptors to add token dynamically to any request
axiosInstance.interceptors.request.use(
  requestConfig => {
    const session_id = getSessionId();
    if (session_id) {
      requestConfig.headers['Authorization'] = `Bearer ${session_id}`;
    }
    return requestConfig;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      clearAppSessionData();
      window.location = '/';
    }
    return Promise.reject(error.response);
  }
);

export { axiosInstance };
