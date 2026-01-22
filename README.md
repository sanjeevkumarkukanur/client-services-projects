# client-services-projects

1️⃣ Create project using CLI
nest new my-nest-app


You’ll be asked:

Package manager → npm or yarn

Choose npm if unsure

User
 └─ belongs to → Tenant (workspace)
      └─ has Role (OWNER | ADMIN | EDITOR | VIEWER)
           └─ controls permissions
                └─ allows actions on Pages / Sections / Fields

📁 This creates:

# my-nest-app/
# ├─ src/
# │  ├─ app.module.ts
# │  ├─ app.controller.ts
# │  ├─ app.service.ts
# │  └─ main.ts
# ├─ package.json
# └─ tsconfig.json

# Create a users module

nest g module users
nest g controller users
nest g service users

# prisma

pnpm add @nestjs/config
pnpm add prisma @prisma/client
pnpm add -D prisma


pnpm add class-validator class-transformer