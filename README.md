
# Blog Site

A production-minded RESTful backend for publishing blog posts and attaching comments to them, built with TypeScript, Node.js, Express, PostgreSQL, Prisma, Zod, and Swagger.


## Demo

<img width="1887" height="852" alt="image" src="https://github.com/user-attachments/assets/50e7beea-267b-4968-91c8-34a383c2857d" />


## Features

- Create and manage blog posts — write posts with a title, content, category, and tag, then edit or delete them anytime.

- Comment on posts — readers can leave comments on any post, and comments stay attached to the post they belong to.

- Update only what you need — change just the title, or just the content, without touching the rest of the post or comment.

- Input validation — malformed or incomplete requests are rejected with clear, helpful error messages.

- Consistent error responses — every error returns a predictable JSON shape, so clients always know what went wrong.

- API versioning — the API is versioned (/api/v1) so future changes won't break existing clients.

- Interactive API documentation — a built-in Swagger UI lets you explore and test every endpoint directly from the browser.

- Rate limiting — protects the API from abuse by limiting how many requests a client can make in a given time window.

- Tested — the API is covered by automated tests to ensure reliability.


## Tech Stack

- TypeScript - type-safe JavaScript across the entire codebase

- Node.js - JavaScript runtime

- Express.js - web framework for routing and HTTP handling

- PostgreSQL - relational database

- Prisma - ORM for schema, migrations, and type-safe database queries

- Zod - schema validation for request params and bodies

- Swagger (OpenAPI) - interactive API documentation


## Installation

Install my-project with npm

```bash
    git clone https://github.com/Sachintha-Dinuranga/blog-site.git
    cd blog-api
```
Install dependencies

```bash
    npm install
```

Setup environment variables

```bash
    nDATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/Blog_API?schema=public"
    PORT=3000
```

Create the database

```bash
    createdb Blog_API
```

Run database migrations

```bash
    npx prisma migrate dev
```

Generate prisma client

```bash
    npx prisma generate
```

Start the development server

```bash
    npm run dev
```    
## Project structure

```text
backend/
├── src/
│   ├── controllers/
│   │   ├── commentController.ts
│   │   └── postController.ts
│   ├── prisma/
│   │   ├── contract.d.ts
│   │   ├── contract.json
│   │   ├── contract.prisma
│   │   └── db.ts
│   ├── rateLimiter/
│   │   └── limiter.ts
│   ├── services/
│   │   ├── commentService.ts
│   │   └── postService.ts
│   ├── v1/
│   │   └── (routes - likely inside here)
│   ├── index.ts
│   └── swagger.ts
├── .env
├── .gitattributes
├── .gitignore
├── package-lock.json
├── package.json
├── prisma-8.md
├── prisma.config.ts
└── README.md
```
## Roadmap

-  **Authentication & Users**: Add user accounts (JWT) and link posts/comments to authors.

- **Unit Testing**: Expand test coverage using Vitest/Jest with mocked Prisma clients.


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Authors

- [@SachinthaDinuranga](https://github.com/Sachintha-Dinuranga)

