import {config} from 'dotenv';
import {defineConfig} from 'orval';

const baseUrl = config().parsed!.BASE_URL;

export default defineConfig({
  flowpipe: {
    input: {
      target: `${baseUrl}/openapi.json`,
    },
    output: {
      mode: 'single',
      baseUrl: baseUrl,
      client: 'react-query',
      target: 'src/API',
      httpClient: 'axios',
      override: {
        // fetch: {
        //   runtimeValidation: true,
        // },
        zod: {
          generate: {
            response: true,
            param: true,
          },
        },
      },
    },
  },
});
