# 🎬 Inbound Movie App

映画検索とブックマーク機能を備えたフルスタックアプリケーションです。
バックエンドはNestJS、フロントエンドはReact(TypeScript)で実装されています。

## 🌐 언어 선택 / Language Selection / 言語選択

- [한국어 (Korean)](README_KOR.md)
- [English](README.md)
- [日本語 (Japanese)](README_JP.md)

---

## 📂 プロジェクト構造

```
inbound-movie/
├─ backend/ # NestJS APIサーバー (課題1)
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
└─ frontend/ # Reactクライアント (課題2)
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

## 🚀 実行方法

### 1️⃣ バックエンド
```bash
cd backend
npm install
npm run start:dev
```

サーバー実行後: http://localhost:3001

### 2️⃣ フロントエンド
```bash
cd frontend
npm install
npm run dev
```

実行後: http://localhost:3000

### ⚙️ .envファイル例
frontend/.env

```
VITE_API_URL=http://localhost:3001
```

---

## 🧩 技術スタック

| 分類 | 使用技術 |
|------|----------|
| Frontend | React, TypeScript, Vite, Mantine UI, Zustand, Axios |
| Backend | NestJS, TypeORM, MySQL |
| Etc | REST API, LocalStorage, Responsive Design |

---

## 💡 主な機能

- 🎞️ 映画検索 (OMDB APIベース)
- 💖 ブックマーク追加/削除 (LocalStorage保存)
- 🔝 評価の高い映画TOP 12表示
- 📱 レスポンシブデザイン
- 🔐 ログイン/会員登録機能 (JWT)

---

## 🧱 フォルダ構造例

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

## 🧑‍💻 開発者

金容佑(キム・ヨンウ)  
SCIT Master 47期 | Full-Stack Developer  
📧 Email: dragonwoo4331@gmail.com
