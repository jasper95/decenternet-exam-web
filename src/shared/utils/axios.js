import axios from 'axios';
import store from 'shared/redux/store';
import { unauthorize } from 'shared/redux/auth/reducer';
import { showError } from 'shared/redux/app/reducer';

const axiosInstance = axios
  .create({
    baseURL: '/api',
  });

axiosInstance.interceptors.request.use((config) => {
  config.headers['x-csrf-token'] = store.getState().auth.csrf;
  config.headers.Authorization = `Basic ${Buffer.from(
    `${process.env.REACT_APP_API_USERNAME}:${process.env.REACT_APP_API_PASSWORD}`,
  ).toString('base64')}`;

  return config;
}, err => Promise.reject(err));

axiosInstance.interceptors.response.use(response => response.data, (error) => {
  const { response } = error;
  if (response.status === 401) {
    store.dispatch(unauthorize());
  } else if (response.status === 500) {
    store.dispatch(showError({ message: 'Something went wrong' }));
  } else if (response.status === 400) {
    store.dispatch(showError({ message: response.data.message }));
  }
  // Do something with response error
  return Promise.reject(error);
});

export default axiosInstance;
