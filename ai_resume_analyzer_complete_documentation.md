# Master Execution Plan & Technical Blueprint
## AI-Powered Resume Analyzer & Skill-Gap Engineering Engine ("The Career Instrument")

**Role:** Principal Full-Stack Cloud & DevOps Architect  
**Design Identity:** Kott Studio-inspired Editorial Brutalism (Dark Canvas `#0A0A0A`, Monospace Indexing, Hairline Grid Borders `#1E1E1E`, High-Contrast Typography)  
**Target Workspace:** `C:\Users\LENOVO\.gemini\antigravity\scratch\ai-resume-analyzer`

---

## Master Phase Blueprint Overview

```text
+-----------------------------------------------------------------------------------+
| PHASE 1: Project Initialization & Monorepo/Workspace Setup                         |
| PHASE 2: Database Schemas & Core Backend Authentication                           |
| PHASE 3: File Upload & Spatial Document Parsing Engine                            |
| PHASE 4: Custom Deterministic Scoring Engine (0-100% Math Formulation)            |
| PHASE 5: Gemini AI Integration & Fenced Prompt Engineering                        |
| PHASE 6: Frontend Development (Kott Studio "Career Instrument" UI)                |
| PHASE 7: Containerization & DevOps Setup (Docker + Docker Compose)                |
| PHASE 8: AWS Infrastructure as Code (Terraform S3, EC2, CloudWatch, VPC)          |
| PHASE 9: End-to-End Integration, Security Audit & Verification Testing            |
+-----------------------------------------------------------------------------------+
```

---

## Phase Breakdown & Step-by-Step Specifications

### PHASE 1: Project Initialization & Workspace Setup

#### Step 1.1: Root Workspace Structure & Environment Config
- **Objective:** Establish clean directory layout (`/client`, `/server`, `/shared`, `/docs`) and environment template files.
- **Files to Create:**
  - `ai-resume-analyzer/.gitignore`
  - `ai-resume-analyzer/.env.example`
  - `ai-resume-analyzer/docs/UI_SPEC.md`
  - `ai-resume-analyzer/docs/PRD.md`
- **Execution Instructions:**
  Create root structure with `.gitignore` (ignoring `node_modules`, `.env`, build dists) and `.env.example` containing `PORT=5000`, `MONGO_URI`, `JWT_SECRET`, `GEMINI_API_KEY`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `AWS_S3_BUCKET`.
- **Verification Step:** Confirm directory listing shows `client`, `server`, `shared`, `docs`, and root `.env.example`.

#### Step 1.2: Server Setup & Express Package Installation
- **Objective:** Initialize Node.js backend workspace and install core dependencies.
- **Files to Create / Modify:**
  - `ai-resume-analyzer/server/package.json`
  - `ai-resume-analyzer/server/src/server.js`
- **Execution Instructions:**
  Initialize `server/package.json` with dependencies: `express`, `cors`, `dotenv`, `jsonwebtoken`, `bcryptjs`, `mongoose`, `multer`, `pdf-parse`, `mammoth`, `@google/genai`, `natural`.
- **Verification Step:** Run `node src/server.js` and verify health check response on `http://localhost:5000/api/health`.

#### Step 1.3: Client Setup (React + Vite + Tailwind + Geist Fonts)
- **Objective:** Bootstrapping Vite React frontend with Tailwind CSS and Geist typography.
- **Files to Create / Modify:**
  - `ai-resume-analyzer/client/package.json`
  - `ai-resume-analyzer/client/vite.config.js`
  - `ai-resume-analyzer/client/tailwind.config.js`
  - `ai-resume-analyzer/client/src/index.css`
  - `ai-resume-analyzer/client/src/main.jsx`
- **Execution Instructions:**
  Install dependencies: `react`, `react-dom`, `@fontsource/geist-sans`, `@fontsource/geist-mono`, `lucide-react`, `framer-motion`, `html2pdf.js`, `tailwindcss`, `postcss`, `autoprefixer`.
- **Verification Step:** Run `npm run build` in `/client` to verify zero font or tailwind compilation errors.

---

### PHASE 2: Database Schemas & Core Backend Authentication

#### Step 2.1: Database Connection Module & In-Memory Fallback
- **Objective:** Establish Mongoose MongoDB connection with an auto-fallback mock database driver for offline testing.
- **Files to Create:**
  - `ai-resume-analyzer/server/src/config/db.js`
- **Verification Step:** Startup server and verify log output `MongoDB Connected` (or `Mock Database Engine Active`).

#### Step 2.2: User, Resume, and Analysis Data Models
- **Objective:** Define Mongoose schemas reflecting PRD data requirements.
- **Files to Create:**
  - `ai-resume-analyzer/server/src/models/User.js`
  - `ai-resume-analyzer/server/src/models/Resume.js`
  - `ai-resume-analyzer/server/src/models/Analysis.js`
- **Verification Step:** Run schema validation tests verifying password hash indexing and user-resume references.

#### Step 2.3: JWT Auth Middleware & Password Hashing
- **Objective:** Secure REST API routes with `bcryptjs` password hashing and JWT token verification.
- **Files to Create:**
  - `ai-resume-analyzer/server/src/middleware/auth.js`
  - `ai-resume-analyzer/server/src/controllers/authController.js`
  - `ai-resume-analyzer/server/src/routes/authRoutes.js`
- **Verification Step:** Test `POST /api/auth/register` and `POST /api/auth/login` using cURL/Postman, verifying JWT token issuance.

---

### PHASE 3: File Upload & Spatial Document Parsing Engine

#### Step 3.1: Document Ingestion Middleware & S3/Multer Config
- **Objective:** Handle PDF/DOCX file uploads with 5MB strict limit and MIME validation.
- **Files to Create:**
  - `ai-resume-analyzer/server/src/middleware/upload.js`
  - `ai-resume-analyzer/server/src/config/s3.js`
- **Verification Step:** Upload an invalid file type (.exe) and verify strict HTTP 400 rejection.

#### Step 3.2: Spatial Text Extractor Engine
- **Objective:** Parse PDF/DOCX buffers preserving layout structure across multi-column resumes.
- **Files to Create:**
  - `ai-resume-analyzer/server/src/services/parserService.js`
  - `ai-resume-analyzer/server/src/routes/resumeRoutes.js`
- **Verification Step:** Send sample PDF to `POST /api/resume/upload` and check JSON extraction output arrays (`skills`, `experience`, `education`).

---

### PHASE 4: Custom Deterministic Scoring Engine

#### Step 4.1: Mathematical Baseline Algorithm Implementation
- **Objective:** Implement deterministic scoring function enforcing exact weight allocations:
  - Skills Match Ratio ($S_m$): 40%
  - Experience Match ($E_m$): 25%
  - Keyword Frequency ($K_f$): 15%
  - Education Match ($Ed_m$): 10%
  - Project Relevance ($P_r$): 10%
- **Files to Create:**
  - `ai-resume-analyzer/server/src/services/scoringService.js`
  - `ai-resume-analyzer/shared/constants/skillsList.js`
- **Verification Step:** Run deterministic assertion unit test ensuring identical inputs yield identical score breakdowns down to 2 decimal places.

---

### PHASE 5: Gemini AI Integration & Prompt Engineering

#### Step 5.1: Gemini Client & Security Prompt Safeguards
- **Objective:** Connect to Google Gemini API using fenced prompt delimiters (`<candidate_resume>`, `<job_description>`) to isolate prompt injection attacks.
- **Files to Create:**
  - `ai-resume-analyzer/server/src/services/geminiService.js`
  - `ai-resume-analyzer/server/src/utils/promptTemplates.js`
  - `ai-resume-analyzer/server/src/controllers/analysisController.js`
  - `ai-resume-analyzer/server/src/routes/analysisRoutes.js`
- **Verification Step:** Submit analysis payload and verify JSON return object matching `strengths`, `weaknesses`, `missingSkills`, and `roadmap` schema.

---

### PHASE 6: Frontend Development (Kott Studio "Career Instrument" UI)

#### Step 6.1: Theme Tokens, Global Layout & Header Component
- **Objective:** Build Obsidian dark header with brand logo (`analyzer ®`), monospace nav links (`01/analyzer`, `02/skill-gap`, etc.), and system status pill.
- **Files to Create:**
  - `ai-resume-analyzer/client/src/components/Header.jsx`
  - `ai-resume-analyzer/client/src/components/Layout.jsx`
- **Verification Step:** Render header and verify Geist Mono font rendering and `🟢 ENGINE_READY` status badge.

#### Step 6.2: Dual Ingestion Workbench (`01 — INPUT STREAM`)
- **Objective:** Build 2-column split workbench (`[ 01/RESUME_PARSER ]` dropzone + `[ 02/JOB_REQUIREMENTS ]` monospace textarea).
- **Files to Create:**
  - `ai-resume-analyzer/client/src/components/IngestionWorkbench.jsx`
- **Verification Step:** Test drag-and-drop file select and trigger CTA button `[ ⚡ RUN SYNTHESIS & ANALYSIS ]`.

#### Step 6.3: Metrics Dashboard & Skill Matrix (`02` & `03` Sections)
- **Objective:** Build high-density metric grid (Score Dial, Skill Ratio) and filterable badge pill matrix (`[ ✓ React ]`, `[ ✗ Docker ]`).
- **Files to Create:**
  - `ai-resume-analyzer/client/src/components/MetricsDashboard.jsx`
  - `ai-resume-analyzer/client/src/components/SkillMatrix.jsx`
- **Verification Step:** Verify filter pills update list dynamically between `[ ALL ]`, `[ MATCHED ]`, and `[ MISSING ]`.

#### Step 6.4: Scoring Breakdown & Execution Roadmap (`04` & `05` Sections)
- **Objective:** Build ASCII-style progress meters and interactive week-by-week timeline checklist.
- **Files to Create:**
  - `ai-resume-analyzer/client/src/components/ScoringBreakdown.jsx`
  - `ai-resume-analyzer/client/src/components/ExecutionRoadmap.jsx`
- **Verification Step:** Verify checking roadmap tasks updates completion status.

---

### PHASE 7: Containerization & DevOps Setup

#### Step 7.1: Multi-Stage Dockerfiles & Docker Compose Orchestration
- **Objective:** Containerize `/client` (Nginx Alpine) and `/server` (Node Alpine), orchestrated via `docker-compose.yml`.
- **Files to Create:**
  - `ai-resume-analyzer/server/Dockerfile`
  - `ai-resume-analyzer/client/Dockerfile`
  - `ai-resume-analyzer/client/nginx.conf`
  - `ai-resume-analyzer/docker-compose.yml`
- **Verification Step:** Run `docker compose up --build` and access web app on `http://localhost:3000`.

#### Step 7.2: Automated CI/CD Pipeline (GitHub Actions)
- **Objective:** Build `.github/workflows/deploy.yml` for automated linting, test suite execution, Docker image build, and AWS deployment.
- **Files to Create:**
  - `ai-resume-analyzer/.github/workflows/deploy.yml`
- **Verification Step:** Validate workflow file syntax using action linters.

---

### PHASE 8: AWS Infrastructure as Code (Terraform)

#### Step 8.1: Declarative Cloud Provisioning
- **Objective:** Provision AWS S3 bucket (30-day auto-purge policy), custom VPC, Security Groups, EC2 instance, and CloudWatch alarms.
- **Files to Create:**
  - `ai-resume-analyzer/terraform/main.tf`
  - `ai-resume-analyzer/terraform/variables.tf`
  - `ai-resume-analyzer/terraform/outputs.tf`
- **Verification Step:** Execute `terraform validate` to ensure configuration validity.

---

### PHASE 9: End-to-End Integration, Security Audit & Testing

#### Step 9.1: Full-Stack Verification & Report Export
- **Objective:** Perform end-to-end user workflows, verify indirect prompt injection defense, and test PDF summary export.
- **Files to Create:**
  - `ai-resume-analyzer/client/src/utils/pdfExport.js`
- **Verification Step:** Execute end-to-end test workflow from file upload to printable PDF report download.
