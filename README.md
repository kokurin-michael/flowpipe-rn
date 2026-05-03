# FlowPipe (React Native)

## О проекте

**FlowPipe** — мобильное приложение на React Native для экосистемы FlowPipe. Клиент общается с бэкендом по HTTP (OpenAPI): пользователь вводит URL, дальше планируется работа с извлечением метаданных и загрузкой контента через API. В приложении уже подключены навигация, локализация (i18n), кэш и персистентность запросов (TanStack Query + MMKV), стили (Unistyles) и окружения через `react-native-config`.

## Структура проекта

```
flowpipe-rn/
├── android/                 # нативный проект Android
├── ios/                     # нативный проект iOS (CocoaPods)
├── scripts/                 # вспомогательные скрипты
├── src/
│   ├── API/                 # HTTP-клиент, React Query, персист; код Orval кладётся сюда после генерации
│   ├── assets/              # тема Unistyles, i18n, иконки, изображения, splash
│   ├── components/          # переиспользуемые UI-компоненты
│   ├── hooks/               # общие хуки (сеть, app state, фокус и т.д.)
│   ├── navigation/          # React Navigation (контейнер, стеки)
│   ├── screens/             # экраны (например entry — ввод URL и действия)
│   ├── @types/              # декларации TypeScript
│   └── App.tsx              # корень приложения, провайдеры
├── .env.example             # пример переменных окружения
├── orval.config.ts          # генерация API из OpenAPI бэкенда
└── package.json
```

## Требования

- **Node.js** ≥ 20  
- **Yarn** 4 (в проекте задан `packageManager`)  
- для **iOS**: Xcode, CocoaPods (`yarn pod` после `yarn pod:init` при необходимости)  
- для **Android**: Android SDK / Android Studio  

## Настройка окружения

1. Установить зависимости:

   ```bash
   yarn install
   ```

2. Создать файл окружения (например из примера):

   ```bash
   cp .env.example .env
   ```

3. В `.env` указать **`BASE_URL`** — URL бэкенда FlowPipe (для приложения и для `yarn apigen`, который читает `${BASE_URL}/openapi.json`).

4. Для iOS после клонирования обычно нужно:

   ```bash
   yarn pod:init   # один раз: bundle install
   yarn pod        # pod install в ios/
   ```

## Основные команды

| Команда | Назначение |
|--------|------------|
| `yarn start` | Metro bundler |
| `yarn start:reset` | Metro с сбросом кэша |
| `yarn android` | Сборка и запуск на Android-эмуляторе/устройстве |
| `yarn ios` | Запуск на iOS-симуляторе |
| `yarn android:dev` / `yarn ios:dev` | Запуск с `ENVFILE=.env` |
| `yarn android:staging` / `yarn ios:staging` | С `ENVFILE=.env.staging` |
| `yarn android:prod` / `yarn ios:prod` | С `ENVFILE=.env.production` |
| `yarn test` | Jest |
| `yarn lint` | ESLint с автофиксом |
| `yarn apigen` | Генерация клиента API (Orval) по OpenAPI бэкенда |

Сборка релизных артефактов Android: `yarn android:apk` (APK) или `yarn android:aab` (AAB).

## Как запустить локально

1. Поднять бэкенд FlowPipe (или указать его URL в `.env`).
2. В одном терминале: `yarn start`.
3. В другом: `yarn ios` или `yarn android` (эмулятор/симулятор должны быть доступны).

---

При смене API контракта бэкенда: обновите `BASE_URL`, выполните `yarn apigen`, затем при необходимости поправьте вызовы в экранах.
