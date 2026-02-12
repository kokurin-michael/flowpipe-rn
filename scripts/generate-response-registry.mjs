/**
 * Генерирует src/API/responseSchemaRegistry.generated.ts из OpenAPI-спека.
 * Запускайте после Orval, чтобы сгенерированные endpoint .zod.ts уже существовали.
 *
 * Использование:
 *   node scripts/generate-response-registry.mjs
 *   node scripts/generate-response-registry.mjs ./openapi.json
 *   OPENAPI_SPEC_URL=https://... node scripts/generate-response-registry.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CLIENT_PATH = path.join(ROOT, 'src', 'API', 'client.ts');
const GENERATED_ENDPOINTS = path.join(ROOT, 'src', 'API', 'generated', 'endpoints');

/**
 * Читает baseUrl из src/API/client.ts (строка вида export const baseUrl = '...').
 * @returns {string | null} URL без слэша в конце или null, если не найден.
 */
function getBaseUrlFromClient() {
  if (!fs.existsSync(CLIENT_PATH)) return null;
  const content = fs.readFileSync(CLIENT_PATH, 'utf8');
  const m = content.match(/export\s+const\s+baseUrl\s*=\s*['"`]([^'"`]+)['"`]/);
  return m ? m[1].replace(/\/$/, '') : null;
}

/** Нормализация для сопоставления: имя схемы или operationId → сравниваемая строка */
function normalizeForMatch(s) {
  if (!s) return '';
  return s
    .replace(/Response$/, '')
    .toLowerCase()
    .replace(/[-_\s{}]/g, '');
}

function normalizeSpecPath(p) {
  return p
    .replace(/\{[^}]+\}/g, '')
    .replace(/\/+/g, '/')
    .replace(/\/$/, '') || '/';
}

/** Сканирует сгенерированные endpoint .zod.ts на экспорты вида "export const XResponse = zod" */
function collectResponseExports() {
  const byTag = {};
  if (!fs.existsSync(GENERATED_ENDPOINTS)) return byTag;
  const tagDirs = fs.readdirSync(GENERATED_ENDPOINTS, { withFileTypes: true });
  for (const dirent of tagDirs) {
    if (!dirent.isDirectory()) continue;
    const tag = dirent.name;
    const zodPath = path.join(GENERATED_ENDPOINTS, tag, `${tag}.zod.ts`);
    if (!fs.existsSync(zodPath)) continue;
    const content = fs.readFileSync(zodPath, 'utf8');
    const re = /export const (\w+Response) = zod\./g;
    let m;
    while ((m = re.exec(content)) !== null) {
      if (!byTag[tag]) byTag[tag] = [];
      byTag[tag].push(m[1]);
    }
  }
  return byTag;
}

async function loadSpec(specPathOrUrl) {
  if (specPathOrUrl) {
    const full = path.isAbsolute(specPathOrUrl)
      ? specPathOrUrl
      : path.resolve(ROOT, specPathOrUrl);
    if (fs.existsSync(full)) {
      return JSON.parse(fs.readFileSync(full, 'utf8'));
    }
  }

  const url =
    specPathOrUrl ||
    process.env.OPENAPI_SPEC_URL ||
    (() => {
      const base = getBaseUrlFromClient();
      return base ? `${base}/openapi.json` : null;
    })();

  if (!url) {
    throw new Error(
      'Не задан URL OpenAPI-спека.\n\n' +
        'Как исправить:\n' +
        '1. Задайте baseUrl в src/API/client.ts (export const baseUrl = \'http://...\'), либо\n' +
        '2. Передайте путь к файлу: node scripts/generate-response-registry.mjs ./openapi.json, либо\n' +
        '3. Укажите переменную: OPENAPI_SPEC_URL=https://... node scripts/generate-response-registry.mjs',
    );
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Не удалось загрузить спек: ${res.status} ${url}\n\n` +
        'Проверьте, что бэкенд запущен и baseUrl в src/API/client.ts указывает на него, ' +
        'либо передайте путь к сохранённому openapi.json.',
    );
  }
  return res.json();
}

function collectEntries(spec, exportsByTag) {
  const entries = [];
  const paths = spec.paths || {};
  const tagKeys = Object.keys(exportsByTag);
  for (const [specPath, pathItem] of Object.entries(paths)) {
    if (!pathItem || typeof pathItem !== 'object') continue;
    const normalizedPath = normalizeSpecPath(specPath);
    for (const method of ['get', 'post', 'put', 'patch', 'delete']) {
      const op = pathItem[method];
      if (!op || !op.operationId) continue;
      const opNormalized = normalizeForMatch(op.operationId);
      let schemaName;
      let actualTag;
      for (const tag of tagKeys) {
        const candidates = exportsByTag[tag] || [];
        schemaName = candidates.find(
          (name) => normalizeForMatch(name) === opNormalized,
        );
        if (schemaName) {
          actualTag = tag;
          break;
        }
      }
      if (!schemaName || !actualTag) continue;
      entries.push({
        key: `${method.toUpperCase()} ${normalizedPath}`,
        schemaName,
        tag: actualTag,
      });
    }
  }
  return entries;
}

function generateTs(entries) {
  const byTag = {};
  for (const e of entries) {
    if (!byTag[e.tag]) byTag[e.tag] = [];
    byTag[e.tag].push(e);
  }

  const lines = [
    '/**',
    ' * Сгенерировано scripts/generate-response-registry.mjs. Вручную не править. Запуск: yarn apigen',
    ' */',
    "import type { z } from 'zod';",
    '',
  ];

  for (const [tag, tagEntries] of Object.entries(byTag)) {
    const names = [...new Set(tagEntries.map((e) => e.schemaName))];
    if (names.length === 0) continue;
    const from = `generated/endpoints/${tag}/${tag}.zod`;
    lines.push(`import { ${names.join(', ')} } from './${from}';`);
  }
  lines.push('');

  lines.push('type ZodSchema = z.ZodType<unknown>;');
  lines.push('');
  lines.push('const responseSchemaMap: Record<string, ZodSchema> = {');
  for (const e of entries) {
    lines.push(`  '${e.key}': ${e.schemaName},`);
  }
  lines.push('};');
  lines.push('');

  lines.push('function normalizePath(pathname: string): string {');
  lines.push("  const segments = pathname.split('/').filter(Boolean);");
  lines.push("  if (segments.length > 1) return '/' + segments.slice(0, -1).join('/');");
  lines.push('  return pathname;');
  lines.push('}');
  lines.push('');

  lines.push(
    'export function getResponseSchema(method: string, pathname: string): ZodSchema | undefined {',
  );
  lines.push('  const path = normalizePath(pathname);');
  lines.push("  const key = `${method.toUpperCase()} ${path}`;");
  lines.push('  return responseSchemaMap[key];');
  lines.push('}');
  lines.push('');

  return lines.join('\n');
}

async function main() {
  const exportsByTag = collectResponseExports();
  const specPath = process.argv[2];
  const spec = await loadSpec(specPath);
  const entries = collectEntries(spec, exportsByTag);
  if (entries.length === 0) {
    console.warn(
      'В спеке не найдено ни одной пары path+method с operationId либо нет совпадающих экспортов *Response в сгенерированных endpoint .zod.ts.',
    );
  }

  const content = generateTs(entries);
  const outPath = path.join(ROOT, 'src', 'API', 'responseSchemaRegistry.generated.ts');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, content, 'utf8');
  console.log('Записано:', path.relative(ROOT, outPath));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});