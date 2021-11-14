import Axios, { AxiosRequestConfig } from 'axios';

import * as logging from './logging';

const axios = Axios.create({
  baseURL: 'http://localhost:3001',
});

const isAxiosError = Axios.isAxiosError;

export { axios, isAxiosError };

function requestAuth(config: AxiosRequestConfig) {
  const accessToken = window.localStorage.getItem('accessToken');

  if (accessToken !== null && config.headers) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
}

axios.interceptors.request.use(logging.requestLogger);
axios.interceptors.response.use(logging.responseLogger, logging.responseErrorLogger);

axios.interceptors.request.use(requestAuth);
