**Fund Investment Backend**

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript)
![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?logo=postgresql)
![Docker](https://img.shields.io/badge/Container-Docker-2496ED?logo=docker)

A backend service for managing private market funds and investor commitments built with Node.js, Express, TypeScript, Prisma, and PostgreSQL.

---

## Features

- Create and manage investment funds
- Allow investments and track investor commitments
- Add and track investors
- PostgreSQL database integration via Prisma
- Layered architecture (Routes → Controllers → Services)
- Unit testing for controller logic
- Docker-based database setup

---

## Requirements

- Node.js (>= 18)
- npm or yarn
- Docker

---

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Start PostgreSQL with Docker

```bash
docker run --name postgres-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=titanbay \
  -p 5433:5432 \
  -d postgres
```

#### check it is running 

```bash
docker ps
```

### 3. Environment variables

- create a .env file 

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/titanbay"
```

### 4. Run database migrations

```bash
npx prisma migrate dev --name init
```

### 5. Generate Prisma Client

```bash
npx prisma generate
```

### 6. Start the server

```bash
npx ts-node src/server.ts
```

#### API will run at

http://localhost:3000


## Testing

```bash
npm test
```

#### Tests cover:
- Controller validation
- Edge cases
- Error handling


## API Usage Examples : from terminal 

### Get all funds

```bash

curl -X GET http://localhost:3000/funds/

```

### Create a fund

```bash

curl -X POST http://localhost:3000/funds \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Titanbay Growth Fund II",
    "vintage_year": 2025,
    "target_size_usd": 500000000,
    "status": "Fundraising"
  }'

```

## Architecture 

The project follows a layered architecture:
    - Routes → API endpoints
    - Controllers → Request validation and responses
    - Services → Business logic and database operations via Prisma
This structure improves maintainability, scalability, and testability.


## Future Improvements

- Future Improvements
- Add integration tests with test database
- Introduce Docker Compose (one-command setup)
- Add validation layer (Zod or Joi)
- Improve centralized error handling
- Add CI pipeline (GitHub Actions)
- Improve logging and monitoring

## Notes

#### Schema defined in prisma/schema.prisma

To check tables while running:

```bash
    - npx prisma studio
```

#### Designed for clarity and testability
#### Unit tests focus on controller-level logic
