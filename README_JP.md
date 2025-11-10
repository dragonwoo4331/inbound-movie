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
│   │   │   │   ├─ auth.controller.ts
│   │   │   │   └─ users.controller.ts      # ボーナス: GET /users/me
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
│   │   │   │   │   └─ auth.service.spec.ts   # ボーナス: 単体テスト
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
│   │   │   │   └─ movies.service.spec.ts   # ボーナス: 単体テスト
│   │   │   └─ movies.graphql.ts            # ボーナス: GraphQL対応
│   │   ├─ app.controller.ts
│   │   ├─ app.module.ts
│   │   └─ main.ts
│   ├─ sql/# MYSQL
│   │   └─ create_database.sql
│   ├─ .env
│   ├─ Dockerfile
│   ├─ jest.config.js                       # ボーナス: テスト設定
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
| Backend | NestJS, TypeORM, MySQL, GraphQL |
| Testing | Jest, Supertest |
| Etc | REST API, LocalStorage, Responsive Design, Docker |

---

## 💡 主な機能

- 🎞️ 映画検索 (OMDB APIベース)
- 💖 ブックマーク追加/削除 (LocalStorage保存)
- 🔝 評価の高い映画TOP 12表示
- 📱 レスポンシブデザイン
- 🔐 ログイン/会員登録機能 (JWT)
- 🧪 単体テスト (AuthService, MoviesService)
- 🔗 GraphQL API対応
- 👤 ユーザープロフィールAPI (GET /users/me)

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

## 🎯 ボーナス機能実装

### ✅ コード品質およびベストプラクティス
- **SOLID原則遵守**: 単一責任、開放閉鎖、リスコフ置換、インターフェース分離、依存性逆転
- **DRY原則**: 重複コード除去、再利用可能なユーティリティ関数
- **KISS原則**: 各関数がシンプルで明確な目的を持つ

### ✅ デザインパターン
- **Repositoryパターン**: TypeORMによるデータアクセス抽象化
- **DTOパターン**: class-validatorによるデータ検証
- **Guardパターン**: JWT認証ガード
- **Strategyパターン**: JWT認証戦略
- **Service Layerパターン**: ビジネスロジック分離

### ✅ テスト
- **単体テスト**: AuthServiceおよびMoviesServiceテストカバレッジ
- **Jest設定**: 完全なテスト環境構成
- **テスト構造**: 適切なテスト組織化およびアサーション

### ✅ GraphQL対応
- **GraphQLモジュール**: @nestjs/graphql統合
- **Movieクエリ**: `movies(search: String!)`および`movie(id: ID!)`
- **スキーマ生成**: 自動GraphQLスキーマ生成
- **Apollo Server**: `/graphql`でGraphQL Playground利用可能

### ✅ 追加REST API
- **GET /users/me**: JWT認証済みユーザープロフィール取得
- **完全なユーザー管理**: 登録、ログイン、メール認証、パスワードリセット

### ✅ 本番環境対応機能
- **Docker対応**: docker-composeによるマルチコンテナ設定
- **環境変数構成**: ConfigServiceによるフォールバック値提供
- **エラーハンドリング**: 包括的なエラーレスポンスおよびログ
- **セキュリティ**: bcryptハッシュ、JWTトークン、入力検証
- **データベース最適化**: 適切なインデックスおよび外部キー制約

## 🧑‍💻 開発者

金容佑(キム・ヨンウ)
SCIT Master 47期 | Full-Stack Developer
📧 Email: dragonwoo4331@gmail.com
