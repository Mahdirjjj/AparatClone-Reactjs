import axios from 'axios';
import { getAuth } from 'utils/auth';
import { BASE_URL } from './constants';

const request = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

request.interceptors.request.use(
  // eslint-disable-next-line func-names
  function(config) {
    const auth = getAuth();

    if (auth && config.url !== '/login') {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `${auth.token_type} ${auth.access_token}`;
    }

    return config;
  },
  // eslint-disable-next-line func-names
  function(error) {
    return Promise.reject(error);
  },
);

export default request;
