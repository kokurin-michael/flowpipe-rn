import 'dayjs/locale/en';
import 'dayjs/locale/ru';

import dayjs from 'dayjs';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import {en, ru} from './locales';

let lang = 'en';
const locales = RNLocalize.getLocales();

export {default} from 'i18next';

export const resources = {
  en,
  ru,
};

if (Array.isArray(locales) && resources[locales[0].languageCode] !== undefined) {
  lang = locales[0].languageCode;
}

dayjs.locale(lang);

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  fallbackLng: 'en',
  lng: lang,
  debug: true,
  resources: resources,
  ns: Object.keys(en),
  defaultNS: 'entry',
});
