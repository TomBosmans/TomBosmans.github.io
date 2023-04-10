---
title: Setup Express application with Typescript
date: 2022-08-24
tags: typescript, express
---
## setup express
First we install our dependencies.
```shell
npm install express dotenv
npm install -D @types/express @types/node nodemon ts-node typescript
```

### tsconfig
create `tsconfig.json` file and add the following:
```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "rootDir": "./",
    "outDir": "./build",
    "esModuleInterop": true,
    "strict": true,
    "strictPropertyInitialization": false,
    "experimentalDecorators": true
  }
}
```

### nodemon
create `nodemon.json` with:
```json
{
  "ignore": ["**/*.test.ts", "**/*.spec.ts", ".git", "node_modules"],
  "watch": ["src"],
  "exec": "ts-node src/app.ts",
  "ext": "ts"
}
```

### Create basic app
create `src/app.ts` with:
```ts
import express, { Application } from "express"

const app: Application = express()
const port = 3000

app.get("/", (_, res) => res.send("hello world"))

app.listen(port, () => {
  console.info(`listening on http://localhost:${port}/`)
})
```

### add script
create a `.env.development` and a `.env.test` file and add this in your `package.json`:
```json
  "scripts": {
    "start:dev": "dotenv -e .env.development nodemon"
  },

```

### git
run `git init` in your shell and create a `.gitignore` with:
```
node_modules
```

now you can commit your initial commit and try to run the app with `npm run start:dev`

## Linting and Formatting
```shell
npm install -D eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

`.eslintrc.json`
```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "rules": {}
}
```

`.prettierrc`
```json
{
  "singleQuote": false,
  "trailingComma": "all",
  "semi": false,
  "tabWidth": 2,
  "bracketSpacing": true,
  "printWidth": 120,
}
```

`package.json` add to scripts:
```json
"scripts": {
  "start": "dotenv -e .env.development nodemon",
  "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
  "format": "prettier --config .prettierrc 'src/**/*.ts' --write"
}
```

## ORM
```shell
npm install @prisma/client
npm install -D prisma

npx prisma init --datasource-provider postgresql
```

add in your `.env.development`
```
DATABASE_URL="postgresql://localhost@postgres:5432/development?schema=public"
```

add in your `.env.test`
```
DATABASE_URL="postgresql://localhost@postgres:5432/test?schema=public"
```

add in `package.json`:
```json
  "scripts": {
    "start": "dotenv -e .env.development nodemon",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "format": "prettier --config .prettierrc 'src/**/*.ts' --write",
    "db:migration:create": "dotenv -e .env.development -- prisma migrate dev --create-only --name",
    "db:migrate:dev": "dotenv -e .env.development -- prisma migrate dev",
    "db:migrate:test": "dotenv -e .env.test -- prisma migrate dev",
    "db:migrate:prod": "prisma migrate deploy",
    "db:reset:dev": "dotenv -e .env.development -- prisma migrate reset",
    "db:reset:test": "dotenv -e .env.test -- prisma migrate reset",
    "db:generate": "prisma generate"
  },
```
