/**
 * Сгенерировано scripts/generate-response-registry.mjs. Вручную не править. Запуск: yarn apigen
 */
import type {z} from 'zod';

import {
  GetDownloadFileResponse,
  GetDownloadStatusResponse,
  GetExtractInfoResponse,
  StartDownloadResponse,
} from './generated/endpoints/download/download.zod';

type ZodSchema = z.ZodType<unknown>;

const responseSchemaMap: Record<string, ZodSchema> = {
  'GET /extract_info': GetExtractInfoResponse,
  'GET /download': StartDownloadResponse,
  'GET /download/status': GetDownloadStatusResponse,
  'GET /download/file': GetDownloadFileResponse,
};

function normalizePath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 1) return '/' + segments.slice(0, -1).join('/');
  return pathname;
}

export function getResponseSchema(method: string, pathname: string): ZodSchema | undefined {
  const path = normalizePath(pathname);
  const key = `${method.toUpperCase()} ${path}`;
  return responseSchemaMap[key];
}
