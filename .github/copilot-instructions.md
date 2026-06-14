# TestGenAI Project Instructions

## Project Overview
TestGenAI is an AI-powered API testing platform that automatically generates test cases, executes tests, and creates comprehensive reports using Gemini 2.0 Flash and Google Cloud architecture.

**Architecture**: Single server running Node.js/Express that serves both the backend API and the frontend (React built as static files).

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your credentials
```

### 3. Development
```bash
npm run dev
```
This starts both backend and frontend:
- Backend API: `http://localhost:5000/api`
- Frontend: `http://localhost:5000`

### 4. Build for Production
```bash
npm run build
npm start
```

## Project Structure

- **server/** - Express backend (API routes, services, middleware)
- **src/** - React frontend (components, pages, services)
- **public/** - Static assets
- **dist/** - Built React app (created after `npm run build`)

## Key Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (frontend + backend) |
| `npm run server:dev` | Start backend only with --watch |
| `npm run client:dev` | Start React dev server only |
| `npm run build` | Build React for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |

## API Endpoints

### Auth
- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/auth/verify`

### Specifications
- `POST /api/spec/upload` - Upload API spec
- `GET /api/spec` - List projects
- `GET /api/spec/:projectId` - Get project

### Tests
- `POST /api/tests/generate` - Generate test cases
- `POST /api/tests/run` - Execute tests

### Results & Reports
- `GET /api/results/:runId` - Get test results
- `GET /api/reports/:runId` - Generate report

## Frontend Pages

- **Login** - `/login` - Authentication
- **Projects** - `/projects` - Spec upload and project management
- **Test Generation** - `/test-generation/:projectId`
- **Test Execution** - `/test-execution/:projectId`
- **Analytics** - `/analytics/:projectId`
- **Reports** - `/reports/:projectId`

## Technologies

### Backend
- Express.js
- Firebase Admin SDK
- Google Cloud Vertex AI
- Firestore
- TypeScript

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Material UI
- React Router
- Axios

## Demo Mode

The application works in demo mode without full Firebase/Gemini setup:
- **Demo Email**: demo@testgenai.com
- **Demo Password**: any value

## Docker Deployment

```bash
docker build -t testgenai .
docker run -p 5000:5000 --env-file .env testgenai
```

## Troubleshooting

**Port 5000 already in use:**
```bash
lsof -i :5000
kill -9 <PID>
```

**Module not found:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors:**
```bash
npm run type-check
```

## Next Steps

1. Configure Firebase project
2. Set up Google Cloud project for Gemini
3. Add more test case generation templates
4. Implement database persistence
5. Deploy to Google Cloud Run
