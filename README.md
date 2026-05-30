# Resume+ Fullstack

Внутри один общий проект:

- `frontend/` — React + Vite, исходный фронт с подключением к API.
- `backend/` — Java 21 + Spring Boot + Spring Security + Spring Data JPA.
- `postgres` — база данных PostgreSQL через Docker Compose.
- `pgadmin` — удобный просмотр БД через браузер.

## Быстрый запуск через Docker

```bash
cd resume-plus-fullstack
docker compose up --build
```

После запуска:

- фронт: http://localhost:5173
- backend health-check: http://localhost:8080/api/health
- pgAdmin: http://localhost:5050
  - логин: `admin@resume.local`
  - пароль: `admin`

Данные PostgreSQL:

- host внутри Docker: `postgres`
- host с компьютера: `localhost`
- port: `5432`
- database: `resume_plus`
- user: `resume_user`
- password: `resume_password`

## Основной пользовательский сценарий

1. Открыть http://localhost:5173
2. Перейти в регистрацию `/reg`.
3. Создать аккаунт.
4. В профиле нажать «Конструктор резюме».
5. Заполнить форму и нажать «Создать резюме».
6. Вернуться в профиль и увидеть резюме в списке.
7. Можно:
   - редактировать резюме;
   - скачать JSON;
   - опубликовать резюме;
   - открыть публичную ссылку `/r/<slug>`;
   - удалить резюме.

## Реализованные backend API

### Auth

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Profile

```http
GET /api/profile
```

### Resumes

```http
GET    /api/resumes
POST   /api/resumes
GET    /api/resumes/{id}
PUT    /api/resumes/{id}
PATCH  /api/resumes/{id}
DELETE /api/resumes/{id}
POST   /api/resumes/{id}/publish
POST   /api/resumes/{id}/unpublish
GET    /api/resumes/{id}/export/json
```

### Public

```http
GET /api/public/resumes/{slug}
```

### Import

```http
POST /api/import/json
POST /api/import/pdf
```

### AI-заглушки

```http
POST /api/ai/improve-text
POST /api/ai/generate-about
POST /api/ai/generate-skills
POST /api/ai/analyze-resume
```

Сейчас AI работает как заглушка. Места под реальное подключение уже есть в `backend/src/main/java/ru/resumeplus/ai/AiService.java`.
Можно добавить ключи в `.env`:

```env
AI_API_KEY=...
AI_PROVIDER_URL=...
```

## Локальный запуск без Docker

### Backend

Нужны Java 21, Maven и PostgreSQL.

```bash
cd backend
mvn spring-boot:run
```

По умолчанию backend ожидает PostgreSQL:

```text
jdbc:postgresql://localhost:5432/resume_plus
resume_user / resume_password
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Файл `frontend/.env.example` можно скопировать в `frontend/.env`:

```bash
cp frontend/.env.example frontend/.env
```

## Как очистить БД

```bash
docker compose down -v
```

Потом снова:

```bash
docker compose up --build
```

## Что стоит доделать дальше

1. Подключить реальную нейросеть в `AiService`.
2. Сделать полноценный экспорт PDF на backend или через печать страницы.
3. Подключить настоящий парсинг PDF.
4. Добавить сопроводительные письма отдельной сущностью.
5. Добавить роли, тарифы и ограничения по количеству ИИ-запросов.
