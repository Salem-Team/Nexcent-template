# Business Management System (BMS)

Production-ready full-stack BMS built with **React + Node.js + Express + PostgreSQL + Prisma**.

## Features
- JWT auth (access + refresh)
- Role-based authorization (`admin`, `manager`, `cashier`)
- Modules: Users, Products, Inventory, Suppliers, Purchases, Customers, Sales, Reports
- Transaction-safe sales/purchases with stock movement logging
- No hard deletes (uses `isActive` flags)
- Responsive dashboard UI with role-based menus

## Project Structure

```text
backend/
  prisma/schema.prisma
  src/modules/*
frontend/
  src/components
  src/pages
  src/layouts
  src/routes
  src/services
  src/contexts
```

## Backend Setup
```bash
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
node prisma/seed.js
npm run dev
```

## Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Key Rules Implemented
- Inventory cannot be changed directly via CRUD.
- Purchases increase stock + supplier balance in one DB transaction.
- Sales decrease stock + customer balance in one DB transaction.
- Negative stock is blocked at API layer.
- Every stock change writes to `stock_movements`.

## Default Login
- Email: `admin@bms.local`
- Password: `Admin@123`

> Change default credentials in production.
