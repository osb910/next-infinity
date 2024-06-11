import type {Digit, ParseNumber} from './number';
import {P8n} from './types';

export type OneHundredCodes = ParseNumber<`1${0}${0 | 1 | 2 | 3}`>;
export type TwoHundredCodes = ParseNumber<`2${0}${Exclude<Digit, '9'>}` | 226>;
export type ThreeHundredCodes = ParseNumber<`3${0}${Exclude<
  Digit,
  '5' | '6' | '9'
>}`>;
export type FourHundredCodes = ParseNumber<`4${
  | `0${Digit}`
  | `1${Exclude<Digit, '9'>}`
  | `2${Exclude<Digit, '0' | '7'>}`
  | 31
  | 51}`>;
export type FiveHundredCodes = ParseNumber<
  `5${0}${Exclude<Digit, '9'>}` | 510 | 511
>;

export type StatusCodes =
  | OneHundredCodes
  | TwoHundredCodes
  | ThreeHundredCodes
  | FourHundredCodes
  | FiveHundredCodes;

export type CodeResponseMap = {
  100: 'Continue';
  101: 'Switching Protocols';
  102: 'Processing';
  103: 'Early Hints';
  200: 'OK';
  201: 'Created';
  202: 'Accepted';
  203: 'Non-Authoritative Information';
  204: 'No Content';
  205: 'Reset Content';
  206: 'Partial Content';
  207: 'Multi-Status';
  208: 'Already Reported';
  226: 'IM Used';
  300: 'Multiple Choices';
  301: 'Moved Permanently';
  302: 'Found';
  303: 'See Other';
  304: 'Not Modified';
  307: 'Temporary Redirect';
  308: 'Permanent Redirect';
  400: 'Bad Request';
  401: 'Unauthorized';
  402: 'Payment Required';
  403: 'Forbidden';
  404: 'Not Found';
  405: 'Method Not Allowed';
  406: 'Not Acceptable';
  407: 'Proxy Authentication Required';
  408: 'Request Timeout';
  409: 'Conflict';
  410: 'Gone';
  411: 'Length Required';
  412: 'Precondition Failed';
  413: 'Payload Too Large';
  414: 'URI Too Long';
  415: 'Unsupported Media Type';
  416: 'Range Not Satisfiable';
  417: 'Expectation Failed';
  418: "I'm a teapot";
  421: 'Misdirected Request';
  422: 'Unprocessable Entity';
  423: 'Locked';
  424: 'Failed Dependency';
  425: 'Too Early';
  426: 'Upgrade Required';
  428: 'Precondition Required';
  429: 'Too Many Requests';
  431: 'Request Header Fields Too Large';
  451: 'Unavailable For Legal Reasons';
  500: 'Internal Server Error';
  501: 'Not Implemented';
  502: 'Bad Gateway';
  503: 'Service Unavailable';
  504: 'Gateway Timeout';
  505: 'HTTP Version Not Supported';
  506: 'Variant Also Negotiates';
  507: 'Insufficient Storage';
  508: 'Loop Detected';
  510: 'Not Extended';
  511: 'Network Authentication Required';
};

export type CodeResponseValues = CodeResponseMap[StatusCodes];

export type ResponseValues<T extends keyof CodeResponseMap> = Pick<
  CodeResponseMap,
  T
>[T];

export interface SuccessResponse<T = any> extends Partial<P8n> {
  status: 'success';
  code: TwoHundredCodes;
  message: ResponseValues<TwoHundredCodes> | string;
  data?: T;
}

export interface NoticeWarningResponse<T = any> extends Partial<P8n> {
  status: 'notice' | 'warning';
  code: OneHundredCodes | ThreeHundredCodes;
  message: ResponseValues<OneHundredCodes | ThreeHundredCodes> | string;
  data?: T;
}

export interface ErrorResponse<T extends string = string> {
  status: 'error';
  code: FourHundredCodes | FiveHundredCodes;
  message: ResponseValues<FourHundredCodes | FiveHundredCodes> | string;
  errors?: Record<T, string | Array<string>>;
}
