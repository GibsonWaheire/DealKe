# DealFlow

Websites, KRA, government services, IT & POS solutions for Kenyan businesses.

## Structure

```
frontend/   React + Vite (Tailwind CSS, shadcn/ui)
backend/    Node.js + Express (M-Pesa Daraja STK push)
```

## Running locally

```bash
# Frontend
cd frontend && npm install && npm run dev   # http://localhost:5173

# Backend
cd backend && npm install && npm run dev    # http://localhost:4000
```

Copy `frontend/.env.example` → `frontend/.env` and set `VITE_BACKEND_URL` to your backend URL.
Copy `backend/.env.example` → `backend/.env` and fill in your Daraja credentials from [developer.safaricom.co.ke](https://developer.safaricom.co.ke).

## Contact

WhatsApp: +254 726 899 113 · hello@dealflow.co.ke
