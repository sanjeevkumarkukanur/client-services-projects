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
