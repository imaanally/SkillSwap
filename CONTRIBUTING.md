# Contributing to SkillSwap

Thank you for contributing to SkillSwap!

All team members must follow these guidelines to maintain an organised and collaborative development workflow.

## 1. Branching Strategy

The project uses a feature branch workflow.

- `main` is the stable branch containing integrated code.
- Each developer must create a separate branch for their assigned feature.
- Do not work directly on `main`.

### Branch Naming Convention

Use descriptive branch names:

- `feature/authentication`
- `feature/user-profile`
- `feature/marketplace`
- `feature/skill-exchanges`
- `fix/login-validation`

## 2. Getting Started

Clone the repository:

```bash
git clone https://github.com/imaanally/SkillSwap.git
cd SkillSwap
```

Before starting work, update your local main branch:

```bash
git switch main
git pull origin main
```

Create your feature branch:

```bash
git switch -c feature/your-feature-name
```

## 3. Committing Changes

Use clear and descriptive commit messages.

Examples:

- `feat: add user registration`
- `feat: implement marketplace`
- `fix: correct login validation`
- `style: update navbar styling`
- `docs: update project documentation`

## 4. Pushing Changes

Push your feature branch:

```bash
git push -u origin feature/your-feature-name
```

## 5. Pull Requests

All changes must be submitted through Pull Requests.

- Base branch: `main`
- Compare branch: your feature branch.
- Explain what you changed.
- Request a code review.
- Address requested changes before merging.

Do not merge unreviewed or unfinished code into `main`.

## 6. Keeping Branches Updated

Before continuing development, regularly update your feature branch with the latest changes from `main`:

```bash
git switch main
git pull origin main
git switch feature/your-feature-name
git merge main
```

Resolve any merge conflicts before proceeding.

## 7. General Rules

- Do not commit `node_modules/`, virtual environments or `.env` files.
- Do not commit passwords, API keys or secret credentials.
- Keep code organised and follow the agreed project structure.
- Communicate with the team before changing shared configurations or project structure.
- Test your changes before opening a Pull Request.

Let's build SkillSwap collaboratively and keep the codebase clean!