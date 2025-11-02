## Hi there 👋

# Easy-EyeFM: A Clinician-Friendly Platform for Employing Foundation Models  

> **Democratizing ophthalmic AI through clinician-friendly and privacy-preserving infrastructure.**

The repository for **Easy-EyeFM**—a code-free AI platform tailored for ophthalmologists to seamlessly leverage open-source ophthalmic foundation models (FMs) for clinical tasks. No advanced programming skills required: simply input your clinical needs (e.g., "Detect referral-diabetic retinopathy (RDR) from the fundus photograph") and patient data, and Easy-EyeFM automates the rest—from model selection and training to employment.  


## 🌟 Core Values for Clinicians  
- **Zero Technical Barrier**: Text-based interaction replaces code writing; focus on clinical goals, not AI engineering.  
- **Data Privacy by Design**: Hospital-localized deployment ensures patient data never leaves your on-premises systems (compliant with local medical data regulations).  
- **FM Compatibility**: Integrates with leading ophthalmic FMs (e.g., RETFound, VisionFM, EyeFM, DERETFound, RETFound-Green, RetiZero, and EyeCLIP) and maintains an expandable model library (supporting various new foundation models that may emerge in the future).
- **Support for Multiple Modalities**: Compatible with various ophthalmic modalities, including CFP (Color Fundus Photography), FFA (Fundus Fluorescein Angiography), UWF (Ultra-Widefield Imaging), and OCT (Optical Coherence Tomography) and others.

## 📰 Latest News

- **[2025/10]** Platform demo launched: [https://easy-eyefm.com](https://easy-eyefm.com) (with invitation code in the manuscript).
- **[2025/10]** Initial framework released on GitHub.


## 📚 Platform Overview

Easy-EyeFM consists of four collaborative agents:

| Agent | Function |
|------|----------|
| **Text Policy Agent** | Parses clinician text prompts using LLM + CoT + RAG |
| **Security Agent** | Enforces on-device data privacy |
| **Vision Agent** | Preprocesses multimodal ophthalmic images (CFP, OCT, FFA, etc.) |
| **Model Agent** | Selects & fine-tunes FMs from model repository |

*All agents are currently under organizing; code will be released iteratively.*


## 🚀 Quick Start


## ⚙️ Environment Setup  
### Prerequisites  
- OS: Ubuntu 20.04/22.04 (Windows/macOS not fully tested for deployment).  
- Python: 3.8–3.10 (compatibility with AI libraries confirmed).  
- GPU: NVIDIA GPU with ≥24GB VRAM (for model inference).  


### 1. Environment Setup

```bash
# Create conda environment
conda create -n easy-eyefm python=3.8 -y
conda activate easy-eyefm

# Clone repo
git clone https://github.com/yourlab/Easy-EyeFM.git
cd Easy-EyeFM

# Install dependencies
pip install -r requirements.txt
```


### 2. Data Preparation Guide

#### Step-by-Step Instructions

##### Create and Name Folders
1. Create a separate folder for each diagnostic category.
2. Name the folder after the category (e.g., `RDR`, `NRDR`).

##### Add Images
1. Place the appropriate images into their respective folders.
Example structure:
```
RDR/
    ├── image_001.png
    ├── image_002.jpg
    └── ...
NRDR/
    ├── image_xx1.png
    ├── image_xx2.jpeg
    └── ...
```
2. Ensure each category has at least 50 images.

##### Zip Folders 📦
1. Compress all folders into a single ZIP file.
✅ Correct ZIP contents:
```
your_dataset.zip
    ├── RDR/
    ├── NRDR/
    └── ...
```
❌ Incorrect (nested):
```
your_dataset.zip
└── your_dataset/
    ├── RDR/
    └── NRDR/
```
##### Upload ZIP File ⏫
1. Upload the ZIP file to Easy-EyeFM.
   - **Note:** Uploading is currently limited to 30 minutes.

##### (Optional) Download Demo Dataset
1. Download a public demo dataset for RDR (Referable Diabetic Retinopathy) detection from [Google Drive](https://drive.google.com/drive/folders/1dltMcu0vMTUzp0RZvqlBAak0vTG7cFi6).
This dataset includes:
- `RDR/`: Images with referable diabetic retinopathy.
- `NRDR/`: Images with non-referable diabetic retinopathy.


## 🖥️ Platform building (Overview)

## 🧩 Backend & Task Orchestration

### 1) Auth & Session
- **JWT**: `HS256`, `ACCESS_TOKEN_EXPIRE_MINUTES = 24*60` (24h).
- **Password hashing**: `passlib[bcrypt]` via `pwd_context.hash()`.
- **Default admin (first init)**: `admin / admin123` (see `database.py:create_default_admin()`; development only—change in production).
- **Bearer tokens**: Frontend reads `auth_token` and expiry from `localStorage`.

### 2) Database
- Default: `sqlite:///./medical_ai.db` (file-based for quick start).
- Optional MySQL: set in `.env`  
  `DATABASE_URL=mysql+pymysql://root:123456@localhost:3306/medical_ai`
- On first start: `@app.on_event("startup")` runs `init_database()`.

### 3) Static & Uploads
- `app.mount("/uploads", StaticFiles(directory="uploads"))`  
  Training/inference artifacts and images are persisted under `backend/uploads/` and publicly readable via `/uploads/...`.

### 4) Large File Uploads (production hint)
- `server_config.py / start_server.py` tune Uvicorn:
  - **Max body size** (example): `MAX_REQUEST_SIZE = 1.5GB` (ZIP datasets)
  - Custom timeouts, logging, etc.
- Prefer `python backend/start_server.py` to enable these limits.

### 5) Training Task Lifecycle (async)
- Status enum: `pending / running / completed / failed` (`TaskStatus`).
- **Timeout**: `TRAINING_TASK_TIMEOUT = 2 hours`.
- **In-memory state**: `running_tasks` / `training_extra_config` (ephemeral; DB is source of truth).
- **Training script**: currently a **simulator** (`util/train_resnet_simulate.py`) that:
  - Validates ZIP structure (category subfolders as in README)
  - Unzips to a data dir
  - Streams JSONL logs (backend parses to display progress)
- **Logs**: also persisted to `TrainingLog`; backend parses script output and updates `progress`.

### 6) Prediction Tasks (async)
- **Upload rules**: single image `<= 10MB` (`/api/predict/upload` checks `image/*` + size).
- **Inference simulator**: `util/eval_simulate.py` produces `eval_*.txt`; backend parses into `result_json` and stores in `PredictionResult`.
- **In-memory map**: `prediction_tasks[prediction_id]` for **short-lived** polling (final result goes to DB).

---

## 🔌 HTTP API (endpoints that exist in code)

> Base prefix: `/api` (e.g., `https://api.easy-eyefm.com/api` in production; local per `.env`)

### Auth
- `POST /auth/register`   Register (username/invite code/password, etc.)
- `POST /auth/login`      Login (issue JWT)
- `POST /auth/logout`     Logout (frontend clears token)
- `POST /auth/refresh`    Refresh token
- `GET  /auth/me`         Get current user

### Health
- `GET  /health`          Health check (includes DB probe)

### Training
- `POST /training/upload`         Upload ZIP dataset (categories as subfolders)
- `POST /training/start`          Start training (form includes `task_name/base_model/epochs/batch_size`, etc.)
- `GET  /training/status/{task_id}`  Poll task status & progress
- `GET  /training/logs/{task_id}`    Paginate training logs
- `GET  /training/tasks`             List tasks (current user; admin sees all)
- `DELETE /training/tasks/{task_id}` Cancel/Delete task

### Models
- `GET  /models`                        List models (status, size, metrics, etc.)
- `GET  /models/{model_id}/download`    Download model artifact (e.g., `.pth`)

### Prediction
- `POST /predict/upload`                       Upload image only (returns `file_id`)
- `POST /predict`                              Kick off prediction (form with `model_id` + `file`)
- `GET  /predict/status/{prediction_id}`       Poll prediction status (RAM + final DB record)
- `GET  /predict/result/{task_id}`             Get prediction result details
- `GET  /predict/history`                      Recent prediction history (with parsed results)
- `DELETE /predict/history/{prediction_id}`    Delete a history item

### QA (Text Policy Agent placeholder)
- `POST /ai/prompt` Accepts `history` (2D array JSON); backend validates format & safety and returns a placeholder response (to connect UI flow).

---

## 🧪 Local Development

### Backend
```bash
# 1) Setup env
conda create -n easy-eyefm python=3.10 -y
conda activate easy-eyefm
pip install -r backend/requirements.txt

# 2) Configure env vars (see root .env.example)
#    e.g., SECRET_KEY / DATABASE_URL / ALLOWED_HOSTS / UPLOAD_DIR / VITE_API_BASE_URL

# 3) Run (dev)
uvicorn backend.app:app --host 0.0.0.0 --port 8000 --reload

# Production / large files:
python backend/start_server.py
```

### Frontend
```bash
# 1) Install deps
npm install

# 2) Dev mode
npm run dev

# 3) Build & preview
npm run build
npm run preview
```

> Frontend reads the backend base URL from `import.meta.env.VITE_API_BASE_URL` (see `src/api/auth.js`).  
> There is also a hardcoded `API_BASE_URL = 'https://api.easy-eyefm.com/api'` in `src/api/training.js`. For local dev, adjust it or inject via env to keep consistent.

---

## 🔄 End-to-End Flow (per **existing code**)

### 1) Training (ZIP dataset)
1. `POST /training/upload` with `your_dataset.zip` (top-level category folders such as `RDR/`, `NRDR/`—as per “Data Preparation Guide”)
2. `POST /training/start` with params (e.g., `task_name`, `base_model`, `epochs`, `batch_size`)
3. Poll via `GET /training/status/{task_id}`; view logs via `GET /training/logs/{task_id}`
4. After completion, check `GET /models` for the resulting model (with metrics/size/download)

> The current training is a **simulated script**: `backend/util/train_resnet_simulate.py`. It will:
> - Unzip the dataset to a working directory
> - Stream structured logs (JSONL) parsed by the backend
> - Produce a model file (e.g., `.pth`) and register it in `AIModel`

### 2) Prediction (single image)
1. Choose a `READY` model (`GET /models`)
2. `POST /predict` with `model_id` + `file`, or upload first via `POST /predict/upload`
3. Poll with `GET /predict/status/{prediction_id}`
4. Final result is stored in `PredictionResult` and retrievable via `GET /predict/history` (includes parsed structure and image metadata such as dimensions/size)

> Current inference is a **simulated script**: `backend/util/eval_simulate.py`. It will:
> - Create `eval_*.txt` (timestamp + random score/label, etc.)
> - Backend parses it into unified `result_json` for frontend rendering

---

## 🌐 Frontend Highlights (Vue 3 + Pinia + Element Plus)
- **Auth state**: `stores/auth.js` manages token (`auth_token` / `auth_token_expiry`), including expiry checks & cleanup.
- **API wrappers**: `src/api/auth.js / training.js / prediction.js / qa.js` mirror backend endpoints.
- **Prediction status polling**: `utils/predictionStatusPoller.js` (1s polling with retry/stop logic).
- **i18n**: `src/i18n/locales/` provides translation packs; UI uses `$t('...')`.
- **Components**: under `components/` you’ll find upload progress, forms, navigation, QA list, etc., which compose Home / Training / Prediction pages.

---

## 🔐 Configuration & Security (per code)
- `.env.example` includes:
  - `SECRET_KEY` (JWT secret)
  - `DATABASE_URL` (SQLite/MySQL)
  - `ALLOWED_HOSTS` (allowed frontend origins)
  - `UPLOAD_DIR` / `MAX_FILE_SIZE`
  - `VITE_API_BASE_URL` (frontend → backend base URL)
- CORS: `allow_origins=["*"]` (**tighten to explicit domains in production**).
- Upload size:
  - Training data: governed by Uvicorn settings in `server_config.py` (example 1.5GB).
  - Prediction image: hard limit `10MB` at the endpoint.
- Runtime state: `running_tasks` / `prediction_tasks` are **short-lived** in-memory helpers (lost on process restart; DB holds final truth).

---

## 🧱 Database Schema (excerpt)
- `User`: username, email, hashed password, role (`ADMIN/RESEARCHER/CLINICIAN`), timestamps
- `TrainingTask`: `task_id`, `status/progress`, params (`base_model/epochs/batch_size`), final metrics (`final_accuracy/final_loss/model_size`), timestamps
- `TrainingLog`: `task_id`, `message/log_level`, timestamp (for incremental UI display)
- `AIModel`: `model_id`, `name/status/metrics/file_path`, `READY/FAILED`, etc.
- `PredictionResult`: `prediction_id`, `image_path`, `result_json`, duration, timestamps

---

## 🧰 Common Dev Actions (based on current implementation)
- **Init DB & create default admin**
  ```bash
  # The backend auto-inits on startup; to run explicitly:
  python -c "from backend.database import init_database, create_default_admin; init_database(); create_default_admin()"


## Closing Note

Easy-EyeFM (Community Edition) focuses on runnable demos, APIs, and UI to validate the workflow end-to-end. Foundation-model adapters and several agent internals are under organizing and will be released in staged updates. This helps us protect clinical IP while keeping interfaces stable for the community.

This Community Edition is provided for research and demonstration purposes only and is not a medical device. No warranty or performance guarantees are provided.