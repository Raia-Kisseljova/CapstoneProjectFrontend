import Axios from 'axios';

import * as logging from './logging';

const axios = Axios.create({
  baseURL: 'http://localhost:3001',
});

const isAxiosError = Axios.isAxiosError;

export { axios, isAxiosError };

axios.interceptors.request.use(logging.requestLogger);
axios.interceptors.response.use(logging.responseLogger, logging.responseErrorLogger);
