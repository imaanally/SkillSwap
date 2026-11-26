# SkillSwap

**Learn a skill. Teach a skill. Grow together.**

SkillSwap is a peer-to-peer skill-sharing web application that connects people who want to exchange knowledge and learn from one another. Users can explore skills, discover learning opportunities and participate in a community built around collaborative learning.

## Project Overview

SkillSwap aims to make learning more accessible by allowing individuals to share skills they already have while developing new ones.

Instead of relying entirely on traditional courses, users can learn directly from other members through skill exchanges.

## Key Features

- User registration and authentication.
- JWT-based authentication.
- User profiles.
- Skill catalogue.
- Skill exchange and request management through the backend API.
- Exchange sessions and reviews supported by the backend.
- Marketplace interface for discovering members and skills.
- Responsive frontend interface.

**Note:** Some frontend pages currently use sample/demo data for presentation purposes. The backend API and database functionality are developed separately from those sample frontend experiences.

## Technology Stack

### Frontend
- React 19
- Vite
- JavaScript
- CSS
- React Router
- Tailwind CSS

### Backend
- Python 3
- FastAPI
- SQLAlchemy
- Pydantic
- JWT authentication
- REST API
- JSON

### Database
- PostgreSQL
- Alembic for database migrations

### Testing
- Pytest
- ESLint
- Vite production build

### Version Control and Collaboration
- Git
- GitHub
- Feature branches
- Pull Requests

## Project Structure

```text
SkillSwap/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   ├── auth.py
│   │   │   ├── users.py
│   │   │   ├── skills.py
│   │   │   └── exchanges.py
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── security.py
│   │   └── seed.py
│   │
│   ├── migrations/
│   ├── tests/
│   ├── alembic.ini
│   └── requirements.txt
│
├── .gitignore
├── README.md
└── CONTRIBUTING.md
```

## Getting Started

Follow these instructions to set up SkillSwap locally.

### Prerequisites

Make sure you have installed:

- Git
- Node.js and npm
- Python 3.12 or later
- PostgreSQL

### 1. Clone the repository

```bash
git clone https://github.com/imaanally/SkillSwap.git
cd SkillSwap
```

## Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL=http://localhost:8000
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at:

http://localhost:5173

## Backend Setup

Open a separate terminal and navigate to the backend directory:

```bash
cd SkillSwap/backend
```

Create and activate a Python virtual environment:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

On Windows PowerShell, activate it using:

```powershell
.venv\Scripts\Activate.ps1
```

Install the backend dependencies:

```bash
pip install -r requirements.txt
```

### PostgreSQL Database Configuration

Create a PostgreSQL database for the project.

For example:

```sql
CREATE DATABASE skillswap;
```

Create a `.env` file inside the `backend` directory:

```env
DATABASE_URL=postgresql://skillswap:skillswap@localhost:5432/skillswap
SECRET_KEY=replace-with-a-secure-secret-key
ACCESS_TOKEN_EXPIRE_MINUTES=60
FRONTEND_URL=http://localhost:5173
```

Update the database URL to match your PostgreSQL username, password and database configuration.

**Important:** Use a secure, unique `SECRET_KEY` outside local development. Never commit `.env` files or production secrets to GitHub.

### Database Migrations

Apply the database migrations:

```bash
alembic upgrade head
```

This creates and updates the database tables using the project's Alembic migration history.

### Seed the Skill Catalogue

Populate the database with the initial skill catalogue:

```bash
python -m app.seed
```

The seed script adds available skills such as Python, Graphic Design, Excel, Photography, Baking, Canva and JavaScript.

### Run the Backend

Start the FastAPI development server:

```bash
uvicorn app.main:app --reload
```

The backend API will be available at:

http://localhost:8000

Interactive API documentation is available at:

http://localhost:8000/docs

## API Overview

The backend exposes RESTful API endpoints that communicate using JSON.

The main API route groups include:

| Route | Purpose |
|---|---|
| `/api/auth` | User registration and authentication |
| `/api/users` | User profiles and member information |
| `/api/skills` | Skill catalogue and user skills |
| `/api/user-skills` | Managing skills associated with users |
| `/api` | Exchange-related functionality |

For detailed endpoint information, run the backend and visit the interactive Swagger documentation at `/docs`.

## Running Tests

### Backend Tests

Navigate to the backend directory and activate the virtual environment.

Run:

```bash
pytest -v
```

### Frontend Linting

Navigate to the frontend directory:

```bash
npm run lint
```

### Frontend Production Build

```bash
npm run build
```

## Team Collaboration

SkillSwap was developed collaboratively using Git and GitHub.

Our workflow includes:

1. Each team member works on an individual feature branch.
2. Changes are committed with descriptive commit messages.
3. Completed features are submitted through Pull Requests.
4. Code is reviewed before being merged into the integration or main branch.
5. Team members regularly synchronize their work with the shared repository.

See [CONTRIBUTING.md](CONTRIBUTING.md) for additional collaboration guidelines.

## Project Purpose

SkillSwap demonstrates how technology can encourage collaborative learning, knowledge sharing and community engagement.

By connecting people who have different skills and learning goals, the platform aims to make skill development more accessible and interactive.

---

**Built with collaboration, curiosity and a passion for learning.**