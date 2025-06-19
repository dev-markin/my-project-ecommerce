# Projeto E-commerce - Devnology

Este projeto é uma aplicação de e-commerce com front-end em React e back-end em NestJS + Prisma + SQLite.

---

## 🚀 Como Rodar o Projeto

### 📦 Backend

Pré-requisitos:

- Node.js 18+
- npm
- SQLite (já incluso via Prisma)

Passos:

```bash
cd backend
npm install
npx prisma migrate dev --name init
npm run start:dev
cd frontend
npm start