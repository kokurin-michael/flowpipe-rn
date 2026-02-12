import 'react-i18next';

import type {resources} from '../../utils/i18n';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'entry';
    resources: (typeof resources)['en'];
  }
}
