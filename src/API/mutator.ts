import {z} from 'zod';

import {baseUrl} from './client';
import {getResponseSchema} from './responseSchemaRegistry.generated';

const getRequestUrl = (url: string): string => {
  const base = baseUrl.replace(/\/$/, '');
  let path: string;
  if (url.startsWith('http://') || url.startsWith('https://')) {
    const start = url.indexOf('/', 8);
    path = start >= 0 ? url.slice(start) : '/';
  } else {
    path = url;
  }

  return `${base}${path}`;
};

const parseResponse = async (res: Response): Promise<unknown> => {
  const contentType = res.headers.get('content-type');
  if (contentType?.includes('application/json')) {
    const text = await res.text();
    if (!text) return null;
    try {
      return JSON.parse(text) as unknown;
    } catch {
      return text;
    }
  }

  return res.text();
};

function getPathnameFromUrl(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    const start = url.indexOf('/', 8);
    const path = start >= 0 ? url.slice(start) : '/';
    const q = path.indexOf('?');
    return q >= 0 ? path.slice(0, q) : path;
  }

  const q = url.indexOf('?');
  return q >= 0 ? url.slice(0, q) : url;
}

export type MutatorError = Error & {status?: number; info?: unknown};

export const customFetch = async <T>(url: string, options: RequestInit): Promise<T> => {
  const requestUrl = getRequestUrl(url);
  const res = await fetch(requestUrl, options);
  const data = await parseResponse(res);

  if (!res.ok) {
    const err = new Error(res.statusText || `HTTP ${res.status}`) as MutatorError;
    err.status = res.status;
    err.info = data;
    throw err;
  }

  const method = options.method ?? 'GET';
  const pathname = getPathnameFromUrl(url);
  const schema = getResponseSchema(method, pathname);

  if (schema) {
    const result = schema.safeParse(data);
    if (!result.success) {
      const pretty = z.prettifyError(result.error);
      const err = new Error(`Response validation failed:\n${pretty}`) as MutatorError;
      err.status = res.status;
      err.info = {readable: pretty, issues: result.error.issues, raw: data};
      throw err;
    }

    return result.data as T;
  }

  return data as T;
};
