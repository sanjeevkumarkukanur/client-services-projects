src/
├── users/
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   ├── entities/
│   │   └── user.entity.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── users.repository.ts
│   └── users.module.ts
│
├── pages/
│   ├── dto/
│   │   ├── create-page.dto.ts
│   │   └── update-page.dto.ts
│   ├── entities/
│   │   └── page.entity.ts
│   ├── pages.controller.ts
│   ├── pages.service.ts
│   ├── pages.repository.ts
│   └── pages.module.ts
│
├── sections/
│   ├── dto/
│   │   ├── create-section.dto.ts
│   │   └── update-section.dto.ts
│   ├── entities/
│   │   └── section.entity.ts
│   ├── sections.controller.ts
│   ├── sections.service.ts
│   ├── sections.repository.ts
│   └── sections.module.ts
│
├── fields/
│   ├── dto/
│   │   ├── create-field.dto.ts
│   │   └── update-field.dto.ts
│   ├── entities/
│   │   └── field.entity.ts
│   ├── enums/
│   │   └── field-type.enum.ts
│   ├── validations/
│   │   ├── text.validation.ts
│   │   ├── number.validation.ts
│   │   └── date.validation.ts
│   ├── fields.controller.ts
│   ├── fields.service.ts
│   ├── fields.repository.ts
│   └── fields.module.ts
│
├── common/
│   ├── decorators/
│   ├── guards/
│   ├── pipes/
│   └── constants/
│
├── app.module.ts
└── main.ts



Logical Hierarchy (IMPORTANT)
User
 └── Page
      └── Section
           └── Field
                ├── FieldType
                └── Validation


Entity Relationships (Database Level)

User
- id
- name

Page
- id
- name
- userId (FK → User)

Section
- id
- title
- pageId (FK → Page)

Field
- id
- label
- type (TEXT | NUMBER | DATE | DROPDOWN)
- sectionId (FK → Section)
- validations (JSON)


How to Create a NestJS Application (Step-by-Step)
1️⃣ Prerequisites (One-time setup)
✅ Install Node.js

Check:

node -v
npm -v


👉 Recommended: Node 18+

2️⃣ Install NestJS CLI (Global)
npm install -g @nestjs/cli


Verify:

nest --version

3️⃣ Create a New NestJS App
nest new employee-management


You’ll be asked:

Which package manager? (npm / yarn / pnpm)


Choose npm (safe default).

📁 This creates:

employee-management/

4️⃣ Run the Application
cd employee-management
npm run start:dev


Open browser:

http://localhost:3000


You should see:

Hello World!


✅ App is running

5️⃣ Default Project Structure (Important)
src/
├── app.controller.ts
├── app.service.ts
├── app.module.ts
├── main.ts

What these do:
File	Purpose
main.ts	App entry point
app.module.ts	Root module
controller	API routes
service	Business logic
6️⃣ Create a Feature Module (Enterprise Way)


7️⃣ Add Repository Layer (Manual)

Nest CLI doesn’t create repositories by default.

Create:

src/employees/employees.repository.ts


This matches enterprise folder structure.


# How Everything Connects (Mental Model)
Request
 ↓
Controller
 ↓
DTO Validation
 ↓
Service
 ↓
Repository
 ↓
Database

| Task       | Command                  |
| ---------- | ------------------------ |
| New app    | `nest new app-name`      |
| Module     | `nest g module name`     |
| Controller | `nest g controller name` |
| Service    | `nest g service name`    |
| Run app    | `npm run start:dev`      |


Add Nodemon to NestJS

Nest already has start:dev, but Nodemon is still useful for custom setups, JS builds, or non-CLI environments.

Step 1: Install Nodemon
npm install --save-dev nodemon

Step 2: Create nodemon.json

📁 root folder

{
  "watch": ["src"],
  "ext": "ts",
  "ignore": ["src/**/*.spec.ts"],
  "exec": "ts-node -r tsconfig-paths/register src/main.ts"
}


📌 This tells Nodemon:

Watch src

Restart on .ts changes

Run Nest app entry file

Step 3: Update package.json

Add script:

{
  "scripts": {
    "start:nodemon": "nodemon"
  }
}

Step 4: Run App with Nodemon
npm run start:nodemon


✅ App restarts automatically on code change

✅ 2️⃣ Add Swagger (API Documentation)

Swagger is must-have in enterprise apps.

Step 1: Install Swagger Packages
npm install @nestjs/swagger swagger-ui-express

Step 2: Configure Swagger in main.ts

📁 src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // ✅ Swagger config
  const config = new DocumentBuilder()
    .setTitle('Employee Management API')
    .setDescription('API documentation for Employee system')
    .setVersion('1.0')
    .addBearerAuth() // for JWT later
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

Step 3: Open Swagger UI

Start app:

npm run start:dev


Open browser:

http://localhost:3000/api



Step-by-Step: Add Prisma + DB to NestJS
1️⃣ Install Prisma Dependencies
npm install prisma --save-dev
npm install @prisma/client

2️⃣ Initialize Prisma
npx prisma init


This creates:

prisma/
 └── schema.prisma
.env

3️⃣ Configure Database Connection
📁 .env
👉 PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/employees_db"

👉 MySQL (if needed)
DATABASE_URL="mysql://user:password@localhost:3306/employees_db"

4️⃣ Define Employee Model (Schema)

📁 prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql" // or mysql
  url      = env("DATABASE_URL")
}

model Employee {
  id         String   @id @default(uuid())
  name       String
  email      String   @unique
  department String
  salary     Int
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

 pnpm prisma generate

5️⃣ Run Migration (Create Tables)
npx prisma migrate dev --name init
# or
pnpm prisma migrate dev --name init
# or 
npx prisma db push

pnpm prisma migrate reset



✔️ DB table created
✔️ Prisma client generated


# Prisma Studio (Very Helpful)
npx prisma studio


# Full Request Flow (With Prisma)
Client
 ↓
Controller
 ↓
DTO Validation
 ↓
Service (business rules)
 ↓
Repository
 ↓
Prisma Client
 ↓
Database