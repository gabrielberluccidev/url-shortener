# 🔗 URL Shortener

> A sleek and efficient [URL shortener](https://url-shortener-eosin-ten.vercel.app/) built to streamline links and showcase modern web development skills.

![Project Screenshot]![alt text](image.png)

## 🎯 Objective

This web app is a simple yet powerful URL shortener, developed to improve and demonstrate my full-stack Web Developer skills, focusing on a clean UI, robust API, and reliable database architecture.

## ✨ Features

- **Instant URL Shortening:** Generate short, memorable links in milliseconds.
- **Clean & Responsive UI:** Built with Tailwind CSS for a seamless experience on any device.
- **Robust Validation:** Data integrity and error handling ensured with Zod on the backend.
- **Fast Redirection:** Optimized database queries using Prisma.

## 💻 Tech Stack

### Front-End

- **Language:** Typescript
- **Building Tool:** Vite
- **UI Library:** ReactJS
- **CSS:** Tailwind
- **Routes:** React Router
- **Components:** ShadCN
- **UI Testing:** React Cosmos

### Back-End

- **Framework:** ExpressJS
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Validation:** Zod

### Deploy

- **Back-end:** [Render](https://render.com/)
- **Front-end:** [Vercel](https://vercel.com/)
- **DB:** [Neon](https://neon.com/)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gabrielberluccidev/url-shortener
   ```
2. Install NPM packages for both Front-end and Back-end abd shared:

   ```
   cd web && pnpm install
   cd ../server && pnpm install
   cd ../shared && pnpm install
   ```

### Environment Variables

1. Create a .env file in the backend directory and add your database connection string, port, base_url and node_env:

   ```
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
   PORT=3000
   BASE_URL = 'localhost:3000'
   NODE_ENV="development"
   ```

2. Create a .env file in the web directory and add base_url:
   ```
   VITE_BASE_URL = 'http://localhost:3000'
   ```

### Database Setup & Running<br>

1.  Run Prisma migrations to set up the database schema:

        ```
        cd server
        npx prisma migrate dev
        ```

2.  Start the development servers:
    - Backend: pnpm run dev (inside the server folder)

    - Frontend: pnpm run dev (inside the web folder)

### API Reference

| Method | Endpoint   | Description                                                     | Body/params |
| ------ | ---------- | --------------------------------------------------------------- | ----------- |
| GET    | /:shortUrl | GET the shorter URL and redirect to original URL                | NONE        |
| POST   | /api/url   | POST the shorter URL, using nanoid and sending 201 and the data | longUrl     |
| DELETE | NONE       | NONE                                                            | NONE        |
| PUT    | NONE       | NONE                                                            | NONE        |
