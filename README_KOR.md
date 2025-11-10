# 🎬 Inbound Movie App

영화 검색 및 즐겨찾기 기능을 구현한 풀스택 애플리케이션입니다.
백엔드는 NestJS, 프론트엔드는 React(TypeScript)로 구현되었습니다.

## 🌐 언어 선택 / Language Selection / 言語選択

- [한국어 (Korean)](README_KOR.md)
- [English](README.md)
- [日本語 (Japanese)](README_JP.md)
---

## 📂 프로젝트 구조

```
inbound-movie/
├─ backend/ # NestJS API 서버 (과제1)
│   ├─ src/
│   │   ├─ auth/
│   │   │   ├─ auth.module.ts
│   │   │   ├─ controllers/
│   │   │   │   ├─ auth.controller.ts
│   │   │   │   └─ users.controller.ts      # 보너스: GET /users/me
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
│   │   │   │   │   └─ auth.service.spec.ts   # 보너스: 단위 테스트
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
│   │   │   ├─ services/
│   │   │   │   ├─ movies.service.ts
│   │   │   │   └─ movies.service.spec.ts   # 보너스: 단위 테스트
│   │   │   └─ movies.graphql.ts            # 보너스: GraphQL 지원
│   │   ├─ app.controller.ts
│   │   ├─ app.module.ts
│   │   └─ main.ts
│   ├─ sql/# MYSQL
│   │   └─ create_database.sql
│   ├─ .env
│   ├─ Dockerfile
│   ├─ jest.config.js                       # 보너스: 테스트 설정
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
| Backend | NestJS, TypeORM, MySQL, GraphQL |
| Testing | Jest, Supertest |
| Etc | REST API, LocalStorage, Responsive Design, Docker |

---

## 💡 주요 기능

- 🎞️ 영화 검색 (OMDB API 기반)
- 💖 즐겨찾기 추가/삭제 (LocalStorage 저장)
- 🔝 평점 높은 영화 TOP 12 표시
- 📱 반응형 디자인
- 🔐 로그인/회원가입 기능 (JWT)
- 🧪 단위 테스트 (AuthService, MoviesService)
- 🔗 GraphQL API 지원
- 👤 사용자 프로필 API (GET /users/me)

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

## 🎯 보너스 기능 구현

### ✅ 코드 품질 및 모범 사례
- **SOLID 원칙 준수**: 단일 책임, 개방-폐쇄, 리스코프 치환, 인터페이스 분리, 의존성 역전
- **DRY 원칙**: 중복 코드 제거, 재사용 가능한 유틸리티 함수들
- **KISS 원칙**: 각 함수가 단순하고 명확한 목적을 가짐

### ✅ 디자인 패턴
- **Repository 패턴**: TypeORM으로 데이터 액세스 추상화
- **DTO 패턴**: class-validator로 데이터 검증
- **Guard 패턴**: JWT 인증 가드
- **Strategy 패턴**: JWT 인증 전략
- **Service Layer 패턴**: 비즈니스 로직 분리

### ✅ 테스트
- **단위 테스트**: AuthService와 MoviesService 테스트 커버리지
- **Jest 설정**: 완전한 테스트 환경 구성
- **테스트 구조**: 적절한 테스트 조직화 및 어설션

### ✅ GraphQL 지원
- **GraphQL 모듈**: @nestjs/graphql 통합
- **Movie 쿼리**: `movies(search: String!)` 및 `movie(id: ID!)`
- **스키마 생성**: 자동 GraphQL 스키마 생성
- **Apollo Server**: `/graphql`에서 GraphQL Playground 사용 가능

### ✅ 추가 REST API
- **GET /users/me**: JWT 인증된 사용자 프로필 조회
- **완전한 사용자 관리**: 회원가입, 로그인, 이메일 인증, 비밀번호 재설정

### ✅ 프로덕션 준비 기능
- **Docker 지원**: docker-compose로 다중 컨테이너 설정
- **환경변수 구성**: ConfigService로 폴백 값 제공
- **에러 처리**: 포괄적인 에러 응답 및 로깅
- **보안**: bcrypt 해싱, JWT 토큰, 입력 검증
- **데이터베이스 최적화**: 적절한 인덱싱 및 외래키 제약조건

## 🧑‍💻 개발자

김용우 (Kim Yongwoo)
SCIT Master 47기 | Full-Stack Developer
📧 Email: dragonwoo4331@gmail.com
