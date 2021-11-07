/* eslint no-console: 0 */
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

declare global {
  interface Window {
    // You can use this global variable to disable the logger.
    __AXIOS_LOG_REQUESTS: boolean;
  }
}

const Colors = {
  GREEN: '#49cc90',
  BLUE: '#61affe',
  YELLOW: '#fcb900',
  RED: '#f93e3e',
  ORANGE: '#fca130',
  CYAN: '#50e3c2',
  PINK: '#ff0a54',
  WHITE: '#fff',
  GREY: '#808080',
};

const Emojis = {
  REQUEST: '🚀 ',
  SUCCESS: '👍 ',
  ERROR: '👎 ',
};

const MethodColors = {
  GET: Colors.BLUE,
  POST: Colors.GREEN,
  PUT: Colors.ORANGE,
  PATCH: Colors.CYAN,
  DELETE: Colors.RED,
};

const JSONColors = {
  KEY: '#46afe3',
  STRING: '#ff6ec7',
  NUMBER: Colors.GREEN,
  BOOLEAN: Colors.GREEN,
  NULL: Colors.GREY,
};

const StatusColors = {
  SUCCESS: '#008000',
  ERROR: '#ff0000',
};

const Styles = {
  ARROW: `color: ${Colors.WHITE}; font-weight: bold`,
  DURATION: `color: ${Colors.WHITE}; font-weight: normal`,
  BASE_URL: `color: ${Colors.GREY}; font-weight: bold`,
};

export function requestLogger(config: AxiosRequestConfig): AxiosRequestConfig {
  if (typeof window !== 'undefined' && window.__AXIOS_LOG_REQUESTS === false) {
    return config;
  }

  const method = config.method?.toUpperCase();
  const methodColor = MethodColors[method as keyof typeof MethodColors] ?? Colors.WHITE;
  const [query, queryStyles] = paramsToQueryStrWithStyles(config.params);

  const methodStyle = `color: ${methodColor}; font-weight: bold`;
  const urlStyle = `color: ${Colors.YELLOW}; font-weight: bold`;

  const args = [
    `${Emojis.REQUEST}%c${method} %c-> %c${config.baseURL}/%c${config.url}%c${query}`,
    methodStyle,
    Styles.ARROW,
    Styles.BASE_URL,
    urlStyle,
    Styles.BASE_URL,
    ...queryStyles,
  ];

  const logRequestBody = config.data !== undefined;

  if (logRequestBody) {
    console.groupCollapsed(...args);
    console.log(...stringifyWithStyles(config.data));
    console.groupEnd();
  } else {
    console.log(...args);
  }

  (config as { startTime: Date }).startTime = new Date();
  return config;
}

export function responseLogger(response: AxiosResponse): AxiosResponse<unknown> {
  if (typeof window !== 'undefined' && window.__AXIOS_LOG_REQUESTS === false) {
    return response;
  }

  const status = String(response.status);
  const url = `${response.config.baseURL}/${response.config.url}`;
  const queryStr = paramsToQueryStr(response.config.params);

  const size = bytesToString(Number(response.headers['content-length']));
  const duration = Date.now() - (response.config as { startTime: number }).startTime;
  const statusStyle = `color: ${StatusColors.SUCCESS}; font-weight: bold`;

  const args = [
    `${Emojis.SUCCESS}%c${status} ${response.statusText} %c[${duration}ms, ${size}] %c<- %c${url}${queryStr}`,
    statusStyle,
    Styles.DURATION,
    Styles.ARROW,
    Styles.BASE_URL,
  ];

  const logResponseBody =
    response.data !== undefined && Object.keys(response.data).length > 0;

  if (logResponseBody) {
    console.groupCollapsed(...args);
    console.log(...stringifyWithStyles(response.data));
    console.groupEnd();
  } else {
    console.log(...args);
  }

  return response;
}

export function responseErrorLogger(error: AxiosError): Promise<never> {
  if (typeof window !== 'undefined' && window.__AXIOS_LOG_REQUESTS === false) {
    return Promise.reject(error);
  }

  if (error.config === undefined) {
    return Promise.reject(error);
  }

  if (error.response) {
    const url = `${error.config.baseURL}/${error.config.url}`;
    const queryStr = paramsToQueryStr(error.config.params);
    const size = bytesToString(Number(error.response.headers['content-length']));
    const duration = Date.now() - (error.config as { startTime: number }).startTime;

    const { data, status, statusText } = error.response;
    const statusStyle = `color: ${StatusColors.ERROR}; font-weight: bold`;

    const args = [
      `${Emojis.ERROR}%c${status} ${statusText} %c[${duration}ms, ${size}] %c<- %c${url}${queryStr}`,
      statusStyle,
      Styles.DURATION,
      Styles.ARROW,
      Styles.BASE_URL,
    ];

    const logResponseBody = data !== undefined && Object.keys(data).length > 0;

    if (logResponseBody) {
      console.groupCollapsed(...args);
      console.log(...stringifyWithStyles(data));
      console.groupEnd();
    } else {
      console.log(...args);
    }
  } else {
    console.log(
      '%cError: %cServer did not respond.',
      `color: ${Colors.RED}`,
      `color: ${Colors.WHITE}`
    );
  }

  return Promise.reject(error);
}

function paramsToQueryStr(params?: Record<string, unknown>): string {
  if (!params) {
    return '';
  }

  const paramsKeys = Object.keys(params);
  if (paramsKeys.length === 0) {
    return '';
  }

  const queryParams = paramsKeys.map(key => `${key}=${params[key]}`);
  return '?' + queryParams.join('&');
}

/**
 * Does the equivalent of paramsToQueryStr, but also surrounds each parameter's key and
 * value with special console characters '%c' to apply styles.
 */
function paramsToQueryStrWithStyles(
  params?: Record<string, unknown>
): [query: string, styles: string[]] {
  if (!params) {
    return ['', []];
  }

  const paramsKeys = Object.keys(params);
  if (paramsKeys.length === 0) {
    return ['', []];
  }

  const queryParams = paramsKeys.map(key => `%c${key}%c=%c${params[key]}%c`);
  const styles = queryParams.reduce<string[]>(acc => {
    acc.push(
      `color: ${Colors.YELLOW}; font-weight: bold`,
      Styles.BASE_URL,
      `color: ${Colors.PINK}; font-weight: bold`,
      Styles.BASE_URL
    );
    return acc;
  }, []);

  const queryStr = '?' + queryParams.join('&');
  return [queryStr, styles];
}

// TODO: doesn't work correctly if JSON.stringify 'space' set to 0.
function stringifyWithStyles(data: Record<string, unknown>): string[] {
  const styles: string[] = [];
  const json = JSON.stringify(data, null, 2);

  const keyValueRegExp = '("\\w+"): ?("?.*"?[^,\\n])?';
  const stringRegExp = '("[\\w\\s]+")';
  const numberRegExp = '(-?[0-9.][0-9.]*)';
  const booleanRegExp = '(true|false)';
  const nullRegExp = '(null)';

  const jsonWithStyles = json.replace(
    new RegExp(
      `${keyValueRegExp}|${stringRegExp}|${numberRegExp}|${booleanRegExp}|${nullRegExp}`,
      'g'
    ),
    (_, key, value, string, number, boolean, null_) => {
      // Matching primitives, which are elements inside an array.
      if (string) {
        styles.push(`color: ${JSONColors.STRING}`, `color: revert`);
        return `%c${string}%c`;
      }

      if (number) {
        styles.push(`color: ${JSONColors.NUMBER}`, `color: revert`);
        return `%c${number}%c`;
      }

      if (boolean) {
        styles.push(`color: ${JSONColors.BOOLEAN}`, `color: revert`);
        return `%c${boolean}%c`;
      }

      if (null_) {
        styles.push(`color: ${JSONColors.NULL}`, `color: revert`);
        return `%c${null_}%c`;
      }

      // Matching a key: value pair.
      styles.push(`color: ${JSONColors.KEY}`, `color: revert`);

      if (value.includes('"')) {
        styles.push(`color: ${JSONColors.STRING}`, `color: revert`);
        return `%c${key}%c: %c${value}%c`;
      }

      if (!isNaN(value)) {
        styles.push(`color: ${JSONColors.NUMBER}`, `color: revert`);
        return `%c${key}%c: %c${value}%c`;
      }

      if (value === 'true' || value === 'false') {
        styles.push(`color: ${JSONColors.BOOLEAN}`, `color: revert`);
        return `%c${key}%c: %c${value}%c`;
      }

      if (value === 'null') {
        styles.push(`color: ${JSONColors.NULL}`, `color: revert`);
        return `%c${key}%c: %c${value}%c`;
      }

      return `%c${key}%c: ${value}`;
    }
  );

  return [jsonWithStyles, ...styles];
}

function bytesToString(bytes: number): string | number {
  const sizes = ['b', 'kb', 'mb', 'gb'];

  for (let i = 1; i < sizes.length; i++) {
    if (bytes < Math.pow(1024, i)) {
      return Math.ceil(bytes / Math.pow(1024, i - 1)) + sizes[i - 1];
    }
  }

  return bytes;
}

//// function isNumArray(val: unknown): val is number[] {
////   return Array.isArray(val) && val.length > 0 && val.every(Number);
//// }

//// function isStrArray(val: unknown): val is string[] {
////   return Array.isArray(val) && val.length > 0 && val.every(el => String(el) === el);
//// }

////
//// Change how stringified array of numbers | strings should look.
//// By default each number goes on a different line, which makes the output too long.
////
//// function replacer(key: string, value: unknown): string | unknown {
////   if (isNumArray(value) || isStrArray(value)) {
////     return '[' + value.join(', ') + ']';
////   }
////   return value;
//// }
