# 🎬 Inbound Movie App

A full-stack application implementing movie search and favorites functionality.
Backend built with NestJS, frontend with React (TypeScript).

## 🌐 언어 선택 / Language Selection / 言語選択

- [한국어 (Korean)](README_KOR.md)
- [English](README.md)
- [日本語 (Japanese)](README_JP.md)

---

## 📂 Project Structure

```
inbound-movie/
├─ backend/ # NestJS API Server (Assignment 1)
│   ├─ src/
│   │   ├─ auth/
│   │   │   ├─ auth.module.ts
│   │   │   ├─ controllers/
│   │   │   │   └─ auth.controller.ts
│   │   │   ├─ dto/
│   │   │   │   ├─ login.dto.ts
│   │   │   │   ├─ register.dto.ts
│   │   │   │   └─ reset-password.dto.ts
│   │   │   ├─ entities/
│   │   │   │   └─ user.entity.ts
│   │   │   ├─ guards/
│   │   │   │   └─ jwt-auth.guard.ts
│   │   │   ├─ services/
│   │   │   │   ├─ auth.service.ts
│   │   │   │   └─ mail.service.ts
│   │   │   └─ strategies/
│   │   │       └─ jwt.strategy.ts
│   │   ├─ favorites/
│   │   │   ├─ favorites.module.ts
│   │   │   ├─ controllers/
│   │   │   │   └─ favorites.controller.ts
│   │   │   ├─ entities/
│   │   │   │   └─ favorite.entity.ts
│   │   │   └─ services/
│   │   │       └─ favorites.service.ts
│   │   ├─ movies/
│   │   │   ├─ movies.module.ts
│   │   │   ├─ controllers/
│   │   │   │   └─ movies.controller.ts
│   │   │   ├─ entities/
│   │   │   │   └─ movie.entity.ts
│   │   │   └─ services/
│   │   │       └─ movies.service.ts
│   │   ├─ app.controller.ts
│   │   ├─ app.module.ts
│   │   └─ main.ts
│   ├─ sql/# MYSQL
│   │   └─ create_database.sql
│   ├─ .env
│   ├─ Dockerfile
│   ├─ nest-cli.json
│   ├─ package.json
│   ├─ package-lock.json
│   ├─ tsconfig.build.json
│   └─ tsconfig.json
└─ frontend/ # React Client (Assignment 2)
    ├─ src/
    │   ├─ auth/
    │   │   └─ pages/
    │   │       ├─ LoginPage.tsx
    │   │       ├─ RegisterPage.tsx
    │   │       └─ VerifyEmailPage.tsx
    │   ├─ components/
    │   │   └─ ProtectedRoute.tsx
    │   ├─ pages/
    │   │   ├─ FavoritesPage.tsx
    │   │   ├─ HomePage.tsx
    │   │   └─ MovieDetailPage.tsx
    │   ├─ services/
    │   │   ├─ apiService.ts
    │   │   ├─ authService.ts
    │   │   ├─ favoritesService.ts
    │   │   └─ movieService.ts
    │   ├─ shared/
    │   │   ├─ constants/
    │   │   │   ├─ index.ts
    │   │   │   ├─ movies.ts
    │   │   │   └─ ui.ts
    │   │   ├─ types/
    │   │   │   ├─ auth.ts
    │   │   │   ├─ favorites.ts
    │   │   │   ├─ index.ts
    │   │   │   └─ movie.ts
    │   │   └─ utils/
    │   │       ├─ index.ts
    │   │       └─ storage.ts
    │   ├─ store/
    │   │   └─ movieStore.ts
    │   ├─ App.tsx
    │   ├─ index.css
    │   └─ main.tsx
    ├─ Dockerfile
    ├─ index.html
    ├─ nginx.conf
    ├─ package.json
    ├─ package-lock.json
    ├─ tsconfig.json
    ├─ tsconfig.node.json
    └─ vite.config.ts
```

---

## 🚀 Getting Started

### 🐳 Docker Compose (Recommended)
```bash
# Run from project root
docker-compose up --build
```

Services will be available at:
- Backend: http://localhost:3001
- Frontend: http://localhost:3000
- MySQL: localhost:3306

### 🔧 Manual Setup (Development)

#### 1️⃣ Backend
```bash
cd backend
npm install
npm run start:dev
```

#### 2️⃣ Frontend
```bash
cd frontend
npm install
npm run dev
```

### ⚙️ Environment Variables

#### Backend (.env)
```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=movieuser
DB_PASSWORD=moviepass
DB_NAME=movie_app

# JWT Configuration
JWT_SECRET=your-secret-key-change-in-production

# OMDB API
OMDB_API_KEY=your-omdb-api-key

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FRONTEND_URL=http://localhost:3000

# Other
NODE_ENV=development
```

#### Frontend (.env)
```bash
VITE_API_URL=http://localhost:3001
```

### 🧪 Running Tests
```bash
# Backend tests
cd backend
npm run test

# Backend test coverage
npm run test:cov

# Frontend tests (coming soon)
cd frontend
npm run test
```

---

## 🧩 Tech Stack

| Category | Technologies |
|----------|--------------|
| Frontend | React, TypeScript, Vite, Mantine UI, Zustand, Axios |
| Backend | NestJS, TypeORM, MySQL, GraphQL |
| Testing | Jest, Supertest |
| Etc | REST API, LocalStorage, Responsive Design, Docker |

---

## 💡 Key Features

- 🎞️ Movie Search (OMDB API based)
- 💖 Add/Remove Favorites (LocalStorage)
- 🔝 Top 12 High-Rated Movies Display
- 📱 Responsive Design
- 🔐 Login/Register (JWT Authentication)
- 📧 Email Verification & Password Reset
- 🧪 Unit Tests (AuthService, MoviesService)
- 🔗 GraphQL API Support
- 👤 User Profile API (GET /users/me)

---

## 🧱 Project Structure

```
backend/
  ├─ src/
  │   ├─ auth/
  │   │   ├─ controllers/
  │   │   │   ├─ auth.controller.ts
  │   │   │   └─ users.controller.ts      # Bonus: GET /users/me
  │   │   ├─ dto/
  │   │   ├─ entities/
  │   │   ├─ guards/
  │   │   ├─ services/
  │   │   ├─ strategies/
  │   │   └─ auth.service.spec.ts         # Bonus: Unit Tests
  │   ├─ movies/
  │   │   ├─ controllers/
  │   │   ├─ entities/
  │   │   ├─ services/
  │   │   │   └─ movies.service.spec.ts   # Bonus: Unit Tests
  │   │   ├─ movies.graphql.ts            # Bonus: GraphQL Support
  │   │   └─ movies.module.ts
  │   ├─ favorites/
  │   ├─ app.controller.ts
  │   ├─ app.module.ts
  │   └─ main.ts
  ├─ jest.config.js                       # Bonus: Test Configuration
  └─ package.json

frontend/
  ├─ src/
  │   ├─ auth/pages/
  │   ├─ components/
  │   │   └─ ProtectedRoute.tsx
  │   ├─ pages/
  │   ├─ services/
  │   │   ├─ apiService.ts
  │   │   ├─ authService.ts
  │   │   ├─ favoritesService.ts
  │   │   └─ movieService.ts
  │   ├─ shared/
  │   │   ├─ constants/
  │   │   ├─ types/
  │   │   └─ utils/
  │   ├─ store/
  │   │   └─ movieStore.ts
  │   ├─ App.tsx
  │   └─ main.tsx
  └─ package.json
```

---

## 🧑‍💻 Developer

Kim Yongwoo
SCIT Master 47th | Full-Stack Developer
📧 Email: dragonwoo4331@gmail.com

---

## 🎯 Demo & Deployment

### Local Demo
```bash
# Run full stack with Docker Compose
docker-compose up --build

# Access in browser
# Frontend: http://localhost:3000
# Backend API: http://localhost:3001
# GraphQL Playground: http://localhost:3001/graphql
```

### Production Deployment Suggestions
- **Frontend**: Deploy to Vercel or Netlify
- **Backend**: Deploy to Railway, Render, or AWS EC2
- **Database**: Use PlanetScale or AWS RDS

### Live Demo Links (Add after deployment)
- Frontend: [Link to be added]
- Backend API: [Link to be added]

---

## 🎯 Bonus Features Implemented

### ✅ Code Quality & Best Practices
- **SOLID Principles**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **DRY Principle**: Eliminated code duplication through reusable utilities and services
- **KISS Principle**: Simple and straightforward implementations

### ✅ Design Patterns
- **Repository Pattern**: TypeORM for data access abstraction
- **DTO Pattern**: Data validation with class-validator
- **Guard Pattern**: JWT authentication guards
- **Strategy Pattern**: JWT authentication strategy
- **Service Layer Pattern**: Business logic separation

### ✅ Testing
- **Unit Tests**: AuthService and MoviesService test coverage
- **Jest Configuration**: Complete test setup with mocking
- **Test Structure**: Proper test organization and assertions

### ✅ GraphQL Support
- **GraphQL Module**: @nestjs/graphql integration
- **Movie Queries**: `movies(search: String!)` and `movie(id: ID!)`
- **Schema Generation**: Auto-generated GraphQL schema
- **Apollo Server**: GraphQL playground available at `/graphql`

### ✅ Additional REST APIs
- **GET /users/me**: User profile endpoint (JWT protected)
- **POST /auth/verify-email**: Email verification
- **POST /auth/resend-verification**: Resend verification email (JWT required)
- **POST /auth/forgot-password**: Request password reset email
- **POST /auth/reset-password**: Reset password
- **Complete User Management**: Registration, login, email verification, password reset

### ✅ Production-Ready Features
- **Docker Support**: Multi-container setup with docker-compose
- **Environment Configuration**: ConfigService with fallback values
- **Error Handling**: Comprehensive error responses and logging
- **Security**: bcrypt hashing, JWT tokens, input validation
- **Database Optimization**: Proper indexing and foreign key constraints

### 📋 API Endpoints Documentation

#### Authentication APIs
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/verify-email?token=xxx` - Email verification
- `POST /auth/resend-verification` - Resend verification email (JWT required)
- `POST /auth/forgot-password` - Request password reset email
- `POST /auth/reset-password` - Reset password
- `GET /auth/profile` - Get user profile (JWT required)

#### Movie APIs
- `GET /movies/search?q=query` - Search movies
- `GET /movies/:id` - Get movie details
- `GET /movies/top-rated` - Get top 12 rated movies

#### Favorites APIs
- `GET /favorites` - Get favorites list (JWT required)
- `POST /favorites` - Add to favorites (JWT required)
- `DELETE /favorites/:movieId` - Remove from favorites (JWT required)

#### GraphQL
- `POST /graphql` - GraphQL queries/mutations
- `GET /graphql` - GraphQL Playground