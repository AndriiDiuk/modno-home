# Payload CMS + Next.js — стартовий шаблон

Готовий стартовий шаблон для нового проєкту: Next.js 16, Payload CMS 3, MongoDB, Tailwind CSS, TypeScript. Ставиш залежності, налаштовуєш `.env` — і можна стартувати.

## Що вже є

- **Next.js 16** (App Router)
- **Payload CMS 3** — адмінка: колекції Users, Media; глобал Home (без полів). Сторінки в адмінці є, контент додаєш сам.
- **MongoDB** через Docker
- **S3/R2** для медіа (опціонально)
- **Tailwind CSS 4**, TypeScript
- Одна публічна сторінка — головна з текстом «home»

## Швидкий старт

### 1. Клонуй репозиторій

```bash
git clone <repo-url>
cd cms
```

### 2. Змінні оточення

```bash
cp .env.example .env
```

Відкрий `.env` і вкажи мінімум:

- `PAYLOAD_SECRET` — згенеруй: `openssl rand -base64 32`
- `DATABASE_URI` — для Docker залиш `mongodb://mongo:27017/payloadcms`

### 3. Запуск

**Варіант A — Docker (рекомендовано)**

```bash
docker-compose up
```

Підніметься MongoDB і Next.js. Сайт: [http://localhost:3000](http://localhost:3000), адмінка: [http://localhost:3000/admin](http://localhost:3000/admin).

**Варіант B — локально**

```bash
pnpm install
pnpm generate:types
pnpm generate:importmap
pnpm dev
```

Потрібен локальний MongoDB або MongoDB Atlas — вкажи `DATABASE_URI` в `.env`.

## Скрипти

| Команда                   | Опис                             |
| ------------------------- | -------------------------------- |
| `pnpm dev`                | Dev-сервер                       |
| `pnpm build`              | Збірка                           |
| `pnpm start`              | Запуск продакшену                |
| `pnpm generate:types`     | Генерація типів Payload          |
| `pnpm generate:importmap` | Генерація import map для адмінки |

## Структура проєкту

```
├── app/
│   ├── (frontend)/     # Головна сторінка (текст «home»)
│   └── (payload)/      # /admin, /api
├── collections/        # Users, Media
├── globals/            # Home (порожній глобал для розширення)
├── lib/                # payload.ts — API, getBaseUrl, getMediaUrl
├── payload.config.ts
├── .env.example
└── docker-compose.yml
```

## Опціонально

- **S3/R2** — додай змінні в `.env` (див. `.env.example`). Без них медіа зберігаються локально.

## Потрібні версії

- Node.js 22 (рекомендовано через [Volta](https://volta.sh/) — версія в `package.json`)
- pnpm 10

## Документація

- [Next.js](https://nextjs.org/docs)
- [Payload CMS](https://payloadcms.com/docs)
