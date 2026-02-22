# Bond Yield Calculator

A full-stack financial application that calculates bond metrics including Current Yield, Yield to Maturity (YTM), Total Interest, and Cash Flow Schedule.

---

## 🚀 Tech Stack

### Backend
- NestJS
- TypeScript
- class-validator
- date-fns
- Jest

### Frontend
- React (Vite)
- TypeScript
- TailwindCSS
- React Hook Form
- Zod
- Recharts

---

## 📊 Features

- Current Yield calculation
- Yield to Maturity (Binary Search implementation)
- Total Interest over bond life
- Premium / Discount indicator
- Zero-coupon bond support
- Cash Flow Schedule with payment dates
- Interactive charts (Line & Bar)
- CSV export
- Fully typed API contracts
- Unit tested financial engine

---

## 🧠 Financial Logic

### Current Yield
Annual Coupon / Market Price

### Yield to Maturity
Implemented using Binary Search for guaranteed convergence.

### Zero Coupon Bond
Uses direct formula:
(Face / Price)^(1/Years) - 1

---

## 🏗 Architecture

Backend follows feature-based modular structure:

src/
modules/
bond/
utils/
dto/

Financial logic is isolated inside a reusable bond engine module.

Frontend separates:
- Components
- API services
- Type definitions

---

## ▶ Running Locally

### Backend

```bash
cd bond-yield-calculator-api
npm install
npm run start:dev
```

### Frontend

```bash
cd bond-yield-calculator-web
npm install
npm run dev
```

---

## 🧪 Run Tests

```bash
npm run test
```

---

## 📈 Future Improvements

- Duration & Convexity calculation
- Portfolio-level bond aggregation
- Authentication layer
- Docker containerization
- CI/CD pipeline

---

## 👨💻 Author

Allanoor Pathan
Senior Mobile & Full Stack Developer
