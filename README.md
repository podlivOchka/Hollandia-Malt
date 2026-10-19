# Hollandia Malt

Сайт солодового напитка Hollandia Malt на React, TypeScript и Vite.

**Сайт:** https://podlivOchka.github.io/Hollandia-Malt/

## Разработка

Нужен Node.js 24.

```sh
npm ci
npm run dev
```

Проверка типов и сборка:

```sh
npm run build
npm run preview
```

## Публикация

GitHub Actions собирает и публикует сайт на GitHub Pages при изменении ветки `main`. Источник публикации в Settings → Pages: **GitHub Actions**.

Базовый путь `/Hollandia-Malt/` настроен в `vite.config.ts`. При переносе на другой адрес обновите также canonical и Open Graph в `index.html`.

Тексты и контакты находятся в `src/components/content.ts`, основные секции — в `src/components/HollandiaSite.tsx`, блок альтернатив — в `src/components/AlternativeSection.tsx`. Изображения и шрифты расположены в `public/`.
