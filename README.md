# PaperGorillaHands

A full-stack stock tracking platform built with **React**, **Express**, and **Supabase**, featuring real-time aggregate data, intelligent caching, and a modern TypeScript codebase.

## 🚀 Tech Stack

### Frontend
- React 19.2
- Vite
- TypeScript
- TailwindCSS
- Recharts (data visualization)
- TanStack Query (data fetching)
- Zustand (state management)

### Backend
- Express 5
- TypeScript
- Supabase (database)
- Massive.com API (stock data provider)
- Node.js

## 📦 Prerequisites

Make sure you have:

- Node.js ≥ 16
- npm or yarn
- A Supabase project (local or cloud)
- A Massive.com API key (free keys available at https://massive.com)

## 🛠️ Setup & Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd portfolio
```

### 2. Install dependencies
```bash
npm install
cd paperhands-backend && npm install
cd ../paperhands-frontend && npm install
cd ..
```

### 3. Configure environment variables
Copy the sample file:

```bash
cp paperhands-backend/.sampleEnv paperhands-backend/.env
```

Fill in the required fields:

```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
MASSIVE_API_KEY=your_massive_api_key
```

### 4. Start the application
From the project root:

```bash
npm run dev
```

This uses concurrently to launch both servers:

- Backend: http://localhost:3000
- Frontend: http://localhost:5173

## 📜 Available Scripts

### Root
| Command | Description |
|--------|-------------|
| npm run dev | Runs frontend + backend together |
| npm run start | Starts backend only |
| npm run client | Starts frontend only |

### Backend (paperhands-backend)
| Command | Description |
|--------|-------------|
| npm run dev | Starts Express with hot reload |
| npm run start | Production server |
| npm run test | Run backend tests |

### Frontend (paperhands-frontend)
| Command | Description |
|--------|-------------|
| npm run dev | Vite dev server |
| npm run build | Production build |
| npm run lint | ESLint checks |
| npm run preview | Preview production build |

## 🌟 Features

- Real-time stock aggregate fetching
- 30-second intelligent caching layer
- Supabase persistence & API integration
- Modern React UI powered by TailwindCSS
- Clean, strongly-typed TypeScript across both stack layers

## 📡 API Endpoints (Backend)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | / | Root endpoint |
| GET | /stonks | Fetch aggregated stock data (cached) |
| GET | /about | About page info |
| GET | /contact | Contact info |

## 📁 Project Structure

```
portfolio/
├── paperhands-backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── db/
│   │   └── server.ts
│   └── .sampleEnv
│
├── paperhands-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── stores/
│
└── package.json
```

## 📄 License

This project is licensed under the ISC License.
