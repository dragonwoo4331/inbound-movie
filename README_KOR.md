# 🎬 Inbound Movie App

영화 검색 및 즐겨찾기 기능을 구현한 풀스택 애플리케이션입니다.
백엔드는 NestJS, 프론트엔드는 React(TypeScript)로 구현되었습니다.

## 🌐 언어 선택 / Language Selection / 言語選択

- [한국어 (Korean)](README_KOR.md)

---

## 📂 프로젝트 구조

```
inbound-movie/
├─ backend/ # NestJS API 서버 (과제1)
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
└─ frontend/ # React 클라이언트 (과제2)
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

## 🚀 실행 방법

### 1️⃣ 백엔드
```bash
cd backend
npm install
npm run start:dev
```

서버 실행 후: http://localhost:3001

### 2️⃣ 프론트엔드
```bash
cd frontend
npm install
npm run dev
```

실행 후: http://localhost:3000

### ⚙️ .env 파일 예시
frontend/.env

```
VITE_API_URL=http://localhost:3001
```

---

## 🧩 기술 스택

| 구분 | 사용 기술 |
|------|----------|
| Frontend | React, TypeScript, Vite, Mantine UI, Zustand, Axios |
| Backend | NestJS, TypeORM, MySQL |
| Etc | REST API, LocalStorage, Responsive Design |

---

## 💡 주요 기능

- 🎞️ 영화 검색 (OMDB API 기반)
- 💖 즐겨찾기 추가/삭제 (LocalStorage 저장)
- 🔝 평점 높은 영화 TOP 12 표시
- 📱 반응형 디자인
- 🔐 로그인/회원가입 기능 (JWT)

---

## 🧱 폴더 구조 예시

```
backend/
 ├─ src/
 │   ├─ movies/
 │   ├─ auth/
 │   ├─ users/
 │   └─ main.ts
 └─ package.json

frontend/
 ├─ src/
 │   ├─ pages/
 │   ├─ components/
 │   ├─ store/
 │   └─ services/
 └─ package.json
```

---

## 🧑‍💻 개발자

김용우 (Kim Yongwoo)  
SCIT Master 47기 | Full-Stack Developer  
📧 Email: dragonwoo4331@gmail.com
