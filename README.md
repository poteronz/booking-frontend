# BookIt — Онлайн-платформа бронирования

Полнофункциональная платформа для бронирования объектов (жилья, залов, услуг). Пользователи могут просматривать каталог объектов, бронировать, оставлять отзывы и оплачивать. Владельцы (OWNER) управляют своими объектами. Администраторы контролируют систему через админ-панель.

## Стек технологий

| Слой | Технологии |
|------|------------|
| **Frontend** | React 18, TypeScript 5, Vite, Zustand 4, Tailwind CSS 3, axios |
| **Backend** | Express 4, TypeScript 5, Prisma 5, Zod, JWT (jsonwebtoken), bcrypt |
| **Database** | PostgreSQL 15 |
| **Tests** | Vitest, Supertest, @vitest/coverage-v8 |
| **Deploy** | Vercel (frontend), Railway (backend + PostgreSQL) |
| **CI/CD** | GitHub Actions |

## Архитектура

**Frontend:** Feature-Sliced Design (FSD) — `shared → entities → features → widgets → pages → app`

**Backend:** 3-слойная архитектура — `Routes → Services → Repositories`

## Quick Start

### Требования
- Node.js 20+
- PostgreSQL 15+ (локально или Railway)
- npm 9+

### 1. Клонирование

```bash
git clone https://github.com/poteronz/booking-frontend.git
cd booking-frontend
```

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
# Заполнить DATABASE_URL, JWT_SECRET, JWT_REFRESH_SECRET в .env
npx prisma migrate dev --name init
npm run seed
npm run dev
```

Сервер запустится на `http://localhost:3000`
API документация: `http://localhost:3000/api/docs`

### 3. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Приложение запустится на `http://localhost:5173`

## Переменные окружения

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/booking
JWT_SECRET=your-secret-key-min-32-chars
JWT_REFRESH_SECRET=your-refresh-secret-key
PORT=3000
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000/api
```

## API Документация

- **Swagger UI:** `/api/docs` — интерактивная документация всех эндпоинтов
- **OpenAPI JSON:** `/api/docs.json` — для импорта в Postman
- **Postman коллекция:** файл `postman/Booking_API.postman_collection.json`

### Тестовые аккаунты (после seed)
| Email | Пароль | Роль |
|-------|--------|------|
| admin@booking.com | admin123 | ADMIN |
| owner1@booking.com | password123 | OWNER |
| user1@booking.com | password123 | USER |

## Тесты

```bash
cd backend
npm run test           # запуск тестов
npm run test:coverage  # с покрытием (порог: 70%)
npm run test:watch     # watch-режим
```

![Coverage](https://img.shields.io/badge/coverage-70%25+-brightgreen)

## Скрипты

### Backend
| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск в dev-режиме (nodemon) |
| `npm run build` | Сборка TypeScript → dist/ |
| `npm run start` | Запуск из dist/ (production) |
| `npm run seed` | Загрузка тестовых данных |
| `npm run test` | Запуск тестов |
| `npm run test:coverage` | Тесты с покрытием |

### Frontend
| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск dev-сервера Vite |
| `npm run build` | Сборка для production |
| `npm run preview` | Превью production-сборки |

## Команда

| Роль | Участник | Зона ответственности |
|------|----------|---------------------|
| **Frontend Developer** | Илья Чапчахов | React, TypeScript, FSD, Tailwind UI-kit, Zustand, интеграция с API, деплой Vercel |
| **Backend Developer** | Илья Чапчахов | Express, Prisma, PostgreSQL, JWT, Zod, Swagger, деплой Railway |
| **QA Engineer** | Илья Чапчахов | Vitest тесты, Supertest, Postman-коллекция, CI/CD, покрытие 70%+ |

## Git Workflow

- `main` — production, деплоится автоматически
- `develop` — интеграционная ветка
- `feature/*` — новые фичи (от develop)
- `fix/*` — исправления

Формат коммитов: [Conventional Commits](https://www.conventionalcommits.org/)

```
feat: добавить BookingForm
fix: исправить конфликт дат
docs: обновить README
test: покрыть authService
```

## Лицензия

MIT
