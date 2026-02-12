import {config} from 'dotenv';
import {defineConfig} from 'orval';

const parsed = config().parsed;
const apiBaseUrl =
  (parsed?.API_BASE_URL ?? 'http://127.0.0.1:8000').replace(/\/$/, '') || 'http://127.0.0.1:8000';

export default defineConfig({
  flowpipe: {
    input: {
      target: `${apiBaseUrl}/openapi.json`,
    },
    output: {
      mode: 'tags-split',
      client: 'react-query',
      target: 'src/API/generated/endpoints',
      schemas: 'src/API/generated/models',
      httpClient: 'fetch',
      baseUrl: '',
      override: {
        mutator: {
          path: './src/API/mutator.ts',
          name: 'customFetch',
        },
        fetch: {
          forceSuccessResponse: true,
        },
      },
    },
  },

  flowpipeZod: {
    input: {
      target: `${apiBaseUrl}/openapi.json`,
    },
    output: {
      mode: 'tags-split',
      client: 'zod',
      target: 'src/API/generated/endpoints',
      schemas: 'src/API/generated/models',
      fileExtension: '.zod.ts',
    },
  },
});
