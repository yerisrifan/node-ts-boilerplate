# Node.js TypeScript MongoDB Boilerplate

Boilerplate ini menyediakan setup awal untuk proyek backend Node.js menggunakan TypeScript, Express, MongoDB, Prisma, JWT authentication, ESLint, dan Prettier.

## Langkah-langkah Setup

### 1. Inisialisasi Proyek

```bash
mkdir my-project
cd my-project
npm init -y
```

### 2. Instal Dependencies

```bash
npm install express dotenv cors helmet morgan passport passport-jwt passport-local jsonwebtoken bcryptjs prisma @prisma/client
npm install -D typescript @types/node @types/express @types/cors @types/morgan @types/passport @types/passport-jwt @types/passport-local @types/jsonwebtoken @types/bcryptjs ts-node-dev
```

### 3. Inisialisasi TypeScript

```bash
npx tsc --init
```

Edit `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### 4. Setup ESLint dan Prettier

Instal dependencies untuk ESLint dan Prettier:

```bash
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier eslint-plugin-prettier prettier
```

Buat file `.eslintrc.js` di root proyek:

```javascript
module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    // Tambahkan aturan kustom di sini
  },
};
```

Buat file `.prettierrc` di root proyek:

```json
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

Tambahkan script berikut ke `package.json`:

```json
"scripts": {
  ...
  "lint": "eslint . --ext .ts",
  "lint:fix": "eslint . --ext .ts --fix",
  "format": "prettier --write \"src/**/*.ts\"",
  ...
}
```

### 5. Setup Prisma

```bash
npx prisma init
```

Edit `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 6. Struktur Folder

Buat struktur folder berikut:

```
src/
  ├── config/
  │   ├── database.ts
  │   └── passport.ts
  ├── controllers/
  │   └── userController.ts
  ├── interfaces/
  │   └── user.interface.ts
  ├── middleware/
  │   ├── errorHandler.ts
  │   └── auth.middleware.ts
  ├── models/
  │   └── user.model.ts
  ├── routes/
  │   ├── index.ts
  │   └── user.routes.ts
  ├── services/
  │   └── user.service.ts
  ├── utils/
  │   └── logger.ts
  └── app.ts
```

### 7. Implementasi Kode

(Implementasi kode sama seperti sebelumnya, tetapi pastikan untuk menjalankan `npm run format` setelah menulis kode untuk memformat sesuai aturan Prettier)

### 8. Konfigurasi Environment

Buat file `.env` di root proyek:

```
DATABASE_URL="mongodb://localhost:27017/your_database_name"
JWT_SECRET="your_jwt_secret_here"
PORT=3000
```

### 9. Script npm

Edit `package.json` dan tambahkan script berikut:

```json
"scripts": {
  "start": "node dist/app.js",
  "dev": "ts-node-dev --respawn --transpile-only src/app.ts",
  "build": "tsc",
  "prisma:generate": "prisma generate",
  "lint": "eslint . --ext .ts",
  "lint:fix": "eslint . --ext .ts --fix",
  "format": "prettier --write \"src/**/*.ts\""
}
```

### 10. Menjalankan Aplikasi

1. Generate Prisma client:

   ```
   npm run prisma:generate
   ```

2. Format kode:

   ```
   npm run format
   ```

3. Jalankan linter:

   ```
   npm run lint
   ```

4. Jalankan aplikasi dalam mode development:
   ```
   npm run dev
   ```

## Penggunaan

Setelah server berjalan, Anda dapat menggunakan endpoint berikut:

- POST `/api/users/register`: Mendaftarkan user baru
- POST `/api/users/login`: Login user
- GET `/api/users`: Mendapatkan semua user (memerlukan autentikasi)
- GET `/api/users/:id`: Mendapatkan user berdasarkan ID (memerlukan autentikasi)
- PUT `/api/users/:id`: Memperbarui user (memerlukan autentikasi)
- DELETE `/api/users/:id`: Menghapus user (memerlukan autentikasi)

Untuk endpoint yang memerlukan autentikasi, sertakan token JWT di header Authorization:

```
Authorization: Bearer <your_jwt_token>
```

## Pengembangan

Saat mengembangkan aplikasi, gunakan perintah berikut:

- `npm run dev`: Menjalankan aplikasi dalam mode development dengan hot-reloading
- `npm run lint`: Menjalankan ESLint untuk memeriksa kode
- `npm run lint:fix`: Menjalankan ESLint dan memperbaiki masalah yang dapat diperbaiki secara otomatis
- `npm run format`: Memformat kode menggunakan Prettier

## Produksi

Untuk menyiapkan aplikasi untuk produksi:

1. Jalankan `npm run build` untuk mengkompilasi TypeScript ke JavaScript
2. Jalankan `npm start` untuk menjalankan versi produksi aplikasi

## Kesimpulan

Boilerplate ini menyediakan struktur dasar untuk membangun aplikasi backend Node.js dengan TypeScript, Express, MongoDB, Prisma, dan JWT authentication. Dengan penambahan ESLint dan Prettier, kode Anda akan selalu terjaga konsistensinya dan mengikuti best practices. Anda dapat mengembangkan lebih lanjut dengan menambahkan fitur-fitur sesuai kebutuhan proyek Anda.
