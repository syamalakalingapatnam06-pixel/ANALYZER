# AI-Powered Resume Analyzer

> **Analyze · Match · Rewrite · Export**

A professional, full-stack SaaS prototype for intelligent resume analysis, explainable ATS scoring, job description comparison, AI statement rewriting, and PDF/DOCX exporting.

---

## 🌟 Key Features

1. **Explainable ATS Scoring (0–100)**: Evaluates resumes across 8 weighted categories (Keywords 20%, Formatting 15%, Skills 15%, Experience 15%, Education 10%, Achievements 10%, Structure 10%, Readability 5%).
2. **Job Description Matching**: Line-by-line comparison of resume text with target job postings to identify matching and missing technical skills and keywords.
3. **AI Statement Rewriter**: Side-by-side diff editor supporting 8 rewrite modes (*Improve Grammar*, *Make Professional*, *ATS Friendly*, *Make Concise*, *Strong Action Verbs*, *Achievement Focused*, *Job Specific*, *Improve Impact*).
4. **Human-in-the-Loop AI Safety**: AI suggestions **never** replace user content automatically. Users explicitly review, edit, accept, or reject every AI recommendation. Zero invented skills, employers, or false metrics.
5. **Student / Fresher Mode**: Special evaluation toggle prioritizing academic projects, technical skills, coursework, certifications, and hackathons over full-time work history.
6. **Structured Resume Editor**: Section-by-section editing with field-level AI assistance.
7. **Version Management & Vault**: Maintain and duplicate targeted resume versions for different tech stack job applications.
8. **PDF & DOCX Export**: Export approved, user-verified content directly into standard ATS-compliant document formats.
9. **Provider-Independent Backend**: Isolated Express backend API communicating with OpenAI API via an abstracted facade service layer (`aiService.js`). API keys are never exposed in client bundles or network requests.
10. **Seamless Demo Fallback**: Visual demo data mode available whenever MongoDB or OpenAI API keys are unconfigured.

---

## 🏗 Architecture & Stack

```text
React Frontend (Vite + Tailwind CSS + Lucide Icons + Recharts)
       │
       ▼  HTTP / REST (JWT Auth)
Express API Server (Node.js)
       │
  ┌────┴──────────────────────────┐
  ▼                               ▼
MongoDB (Mongoose)          AI Facade Service (aiService.js)
                                  │
                                  ▼
                         OpenAI Provider (openaiProvider.js)
                                  │
                                  ▼
                         OpenAI API (GPT Models)
```

- **Frontend**: React 18, Vite, Tailwind CSS, React Router v6, Axios, Recharts, Lucide React icons.
- **Backend**: Node.js, Express.js, JWT, BcryptJS, Multer, Express Validator, CORS, Express Rate Limit.
- **AI Service**: Official OpenAI Node SDK (`openai`), provider-isolated architecture (`aiService.js`).
- **Document Processing**: `pdf-parse`, `mammoth`, `pdfkit`, `docx`.
- **Database**: MongoDB & Mongoose (with in-memory demo fallback mode).

---

## 📁 Project Structure

```text
ANALYZER/
├── client/                      # Vite + React Frontend
│   ├── src/
│   │   ├── components/          # Reusable UI components & layouts
│   │   │   ├── common/          # Button, Input, Modal, SuggestionCard, DiffView, etc.
│   │   │   └── layouts/         # PublicLayout, DashboardLayout
│   │   ├── context/             # AuthContext, ResumeContext
│   │   ├── data/                # Mock/Demo data fallback layer
│   │   ├── hooks/               # useAuth, useResume, useAnalysis, useJobMatch, useRewrite
│   │   ├── pages/               # Landing, Dashboard, Upload, Analysis, Match, Rewriter, etc.
│   │   ├── services/            # Axios API client & services
│   │   ├── App.jsx              # Application router
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/                      # Express Backend API
│   ├── ai/                      # Isolated AI Module
│   │   ├── aiService.js         # Provider-independent facade interface
│   │   ├── openaiProvider.js    # OpenAI SDK integration (OPENAI_API_KEY)
│   │   ├── prompts/             # Modular prompt templates
│   │   └── validators/          # JSON response schema validators
│   ├── config/                  # MongoDB connection setup
│   ├── middleware/              # JWT protect & Multer upload
│   ├── models/                  # User, Resume, Analysis, JobAnalysis
│   ├── routes/                  # auth.js, resume.js, history.js
│   ├── utils/                   # Extractor, ATS calculator, PDF & DOCX generators
│   ├── index.js                 # Express server entry point
│   ├── .env.example
│   └── package.json
│
├── README.md
└── package.json
```

---

## ⚡ Quick Start & Installation

### 1. Environment Setup

Copy `.env.example` in `server/` to `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/resume_analyzer
JWT_SECRET=your_super_secret_jwt_key
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
CLIENT_URL=http://localhost:5173
MAX_FILE_SIZE=5242880
```

*Note: If `OPENAI_API_KEY` is omitted, the application seamlessly runs in **Demo Mode** with interactive sample analysis data.*

### 2. Install Dependencies

From root directory:

```bash
# Install frontend & backend dependencies
npm run install:all
```

Or individually:

```bash
cd client && npm install
cd ../server && npm install
```

### 3. Run Development Servers

Run backend and frontend concurrently or in separate terminal tabs:

**Terminal 1 (Backend):**
```bash
npm run dev:server
```

**Terminal 2 (Frontend):**
```bash
npm run dev:client
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔁 Switching AI Providers

The application decouples OpenAI from core business logic using `server/ai/aiService.js`:

To add a new provider (e.g. Anthropic, Gemini, or local LLM):
1. Create `server/ai/newProvider.js`.
2. Implement functions `analyzeResume()`, `matchJob()`, `rewriteStatement()`, `generateSuggestions()`.
3. Switch the import in `server/ai/aiService.js`.

No frontend code or API endpoints need to change.

---

## 🛡 AI Safety Compliance

- **No Auto-Replacement**: AI suggestions require explicit user approval (`Accept`).
- **Fact Preservation**: Prompts explicitly forbid inventing work history, employers, statistics, or skills.
- **Isolated Key**: `OPENAI_API_KEY` exists exclusively on the Express backend server environment.
