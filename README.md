# TestGenAI – AI-Powered API Testing & Validation Platform

A modern, enterprise-grade API testing platform powered by AI to automatically generate intelligent test cases, execute tests, and validate responses using Gemini 2.0 Flash and Google Cloud's serverless architecture.

## 🎯 Project Overview

TestGenAI significantly reduces manual QA effort while improving API reliability, security, and coverage through:

- **AI-Powered Test Generation** - Automatic test case creation from API specifications
- **Intelligent Response Validation** - Context-aware API response validation
- **Security Testing** - Automated detection of common security vulnerabilities
- **Comprehensive Reporting** - AI-generated insights and recommendations
- **Single Server Architecture** - Frontend and backend served from the same Node.js/Express server

## ✨ Key Features

### 1. API Specification Upload
- Supports Swagger JSON, OpenAPI YAML, Postman Collections, and GraphQL Schemas
- Automatic API extraction and documentation

### 2. AI Test Case Generator
- Functional tests (valid requests, business logic)
- Boundary tests (min/max values, null handling)
- Negative tests (invalid inputs, error handling)
- Security tests (SQL injection, XSS, JWT manipulation)
- Performance tests (concurrent requests, load scenarios)

### 3. Test Execution Engine
- Parallel test execution via Cloud Run
- Distributed testing with retry mechanisms
- Environment isolation and management

### 4. Response Validation
- Schema validation
- Field presence and type checking
- Semantic validation
- Data consistency verification

### 5. Smart Failure Analysis
- Root cause detection
- Pattern recognition
- Historical failure comparison

### 6. Security Testing Module
- Authentication tests (JWT validation)
- Injection attack detection
- Authorization validation
- Role-based access testing

### 7. Test Coverage Dashboard
- Endpoint coverage metrics
- Scenario coverage breakdown
- AI-generated coverage scores

### 8. AI-Powered Reporting
- Executive summaries for managers
- Technical reports for developers
- Security-focused reports for security teams

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Material UI** components
- **React Router** for navigation
- **Axios** for API calls

### Backend
- **Node.js** runtime
- **Express.js** web framework
- **TypeScript** for type safety
- **Firebase Admin SDK** for auth and Firestore
- **Vertex AI SDK** for Gemini integration

### AI & Cloud
- **Gemini 2.0 Flash** - Core AI model
- **Google Cloud Functions** - Orchestration
- **Cloud Run** - Serverless execution
- **Firestore** - Document database
- **Cloud Storage** - File storage
- **Pub/Sub** - Async messaging

### DevOps & Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Local development
- **GitHub Actions** - CI/CD
- **Terraform** - Infrastructure as Code

## 📦 Project Structure

```
testgenai/
├── server/                    # Express backend
│   ├── config/               # Configuration (Firebase, Gemini)
│   ├── middleware/           # Auth and request middleware
│   ├── routes/               # API route handlers
│   ├── services/             # Business logic services
│   │   ├── testGenerator.js  # AI test case generation
│   │   ├── testExecutor.js   # Test execution logic
│   │   ├── resultService.js  # Result persistence
│   │   ├── reportService.js  # Report generation
│   │   └── specService.js    # Spec parsing/storage
│   └── index.js              # Express app entry point
├── src/                       # React frontend (TypeScript)
│   ├── components/           # Reusable React components
│   ├── pages/                # Page components
│   │   ├── LoginPage         # Authentication
│   │   ├── ProjectsPage      # Project management
│   │   ├── TestGenerationPage
│   │   ├── TestExecutionPage
│   │   ├── AnalyticsPage
│   │   └── ReportsPage
│   ├── context/              # React context (Auth)
│   ├── services/             # API service layer
│   ├── types/                # TypeScript types
│   ├── utils/                # Utility functions
│   ├── App.tsx               # Main App component
│   ├── main.tsx              # React entry point
│   └── index.css             # Global styles
├── public/                    # Static files
├── dist/                      # Built React app (after npm run build)
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite build configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── Dockerfile                # Docker image configuration
├── docker-compose.yml        # Local development setup
└── .env.example              # Environment variables template
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Google Cloud Project (for Gemini and Firestore)
- Firebase Project (for authentication)

### Installation

1. **Clone and setup**
```bash
cd testgenai
npm install
```

2. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your credentials:
# - Firebase configuration
# - Google Cloud Project ID
# - Gemini API key
```

3. **Development server** (Frontend + Backend on same server)
```bash
npm run dev
```

This will start:
- Backend API on `http://localhost:5000/api`
- Frontend on `http://localhost:5000`
- Frontend dev server with HMR on `http://localhost:5173` (proxied through backend)

4. **Build for production**
```bash
npm run build
# Outputs React build to `dist/`
npm start
# Serves both frontend (from dist/) and API from same server
```

5. **Docker deployment**
```bash
docker build -t testgenai:latest .
docker run -p 5000:5000 --env-file .env testgenai:latest
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/verify` - Token verification

### API Specifications
- `POST /api/spec/upload` - Upload API specification
- `GET /api/spec` - List projects
- `GET /api/spec/:projectId` - Get project details

### Test Management
- `POST /api/tests/generate` - Generate test cases using AI
- `POST /api/tests/run` - Execute generated tests

### Results & Reporting
- `GET /api/results/:runId` - Get test run results
- `GET /api/results/project/:projectId` - Get project history
- `GET /api/reports/:runId` - Generate test report
- `GET /api/reports/:runId/export` - Export report as JSON

### Health
- `GET /api/health` - API health check

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **RBAC** - Role-based access control (Admin, QA Engineer, Developer, Viewer)
- **TLS Encryption** - HTTPS in production
- **Secret Management** - Google Cloud Secret Manager
- **API Key Encryption** - Secure credential storage

## 📊 Database Schema

### Collections

**users**
```json
{
  "userId": "string",
  "name": "string",
  "email": "string",
  "role": "admin|qa|developer|viewer"
}
```

**projects**
```json
{
  "projectId": "string",
  "projectName": "string",
  "userId": "string",
  "specType": "swagger|openapi|postman",
  "apis": [{ "path": "string", "method": "GET|POST|PUT|DELETE", ... }],
  "createdAt": "timestamp"
}
```

**testRuns**
```json
{
  "runId": "string",
  "projectId": "string",
  "userId": "string",
  "testResults": [{ "testCaseId": "string", "status": "passed|failed|error", ... }],
  "summary": { "total": "number", "passed": "number", ... },
  "createdAt": "timestamp"
}
```

## 🎯 Performance Targets

| Metric | Target |
|--------|--------|
| Test Generation | < 10 sec |
| API Execution | < 100 ms overhead |
| Dashboard Load | < 2 sec |
| Concurrent Tests | 10,000+ |
| Availability | 99.9% |

## 🔄 CI/CD Pipeline

- **GitHub Actions** for automated testing and deployment
- **Docker** image building
- **Terraform** for infrastructure provisioning
- **Automated deployments** to Google Cloud Run

## 🚦 Development Workflow

```bash
# Install dependencies
npm install

# Start development (serves frontend + backend)
npm run dev

# Build frontend
npm run client:build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📈 Advanced Features (Future)

- **AI Agent Testing** - Autonomous API exploration
- **Multi-Cloud Support** - AWS, Azure, GCP
- **CI/CD Integration** - Jenkins, GitLab CI
- **Auto Ticket Creation** - Jira, Azure DevOps, Linear
- **Test Optimization** - Remove redundant test cases

