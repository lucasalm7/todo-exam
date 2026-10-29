# Todo App

![CI](https://github.com/lucasalm7/todo-exam/actions/workflows/ci.yml/badge.svg)
![Deploy](https://github.com/lucasalm7/todo-exam/actions/workflows/deploy.yml/badge.svg)

A simple todo list built with TypeScript and Vite, developed as an exam project with a full Gitflow workflow, automated tests and a CI/CD pipeline.

**Live app:** https://lucasalm7.github.io/todo-exam/

## Features

- Add todos and remove them from the list
- Edit a todo inline, with Save and Cancel (Enter saves, Escape cancels)
- Mark a todo as completed and undo it
- Change the page background with a color picker
- Clear all completed todos with a single click
- Toggle all todos as completed or incomplete at once

## Tech stack

| Area | Tool |
|---|---|
| Language | TypeScript |
| Build tool | Vite |
| End-to-end tests | TestCafe (headless Firefox) |
| Commit rules | commitlint and husky |
| CI/CD | GitHub Actions |
| Hosting | GitHub Pages |

## Getting started

### Prerequisites

- Node.js 22.12 or newer
- Firefox, which the end-to-end tests use

### Install and run

```bash
git clone https://github.com/lucasalm7/todo-exam.git
cd todo-exam
npm install
npm run dev
```

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Type-checks with `tsc` and builds the app into `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run test:e2e` | Builds the app and runs the TestCafe tests |
| `npm run test:unit` | Runs Vitest unit tests for pure logic functions |

## Testing

The app is tested end to end with TestCafe. `npm run test:e2e` builds the app, starts it with `vite preview` and runs the tests in headless Firefox. Every feature has at least two tests:

| Feature | Tests |
|---|---|
| Add todo | adds a todo and clears the input, ignores empty input |
| Remove todo | removes a todo, removes only the selected one |
| Edit todo | saves the edited text, cancel keeps the original |
| Toggle completed | marks a todo as completed, undo reopens it |
| Clear completed & Toggle all | clears completed todos, toggles all todos between finished and active |
| Color picker | changes the background, updates it on a second change |

The tests live in `e2e/todo.e2e.ts`.

## Project structure

```
.github/workflows/   CI and deploy pipelines
.husky/              Git hook that checks commit messages
e2e/                 TestCafe tests
src/
  main.ts            Rendering and event handling
  todoLogic.ts       Todo type and pure helper functions
  colorPicker.ts     Background color picker
  style.css          Styles
.testcaferc.json     TestCafe configuration
commitlint.config.js Commit message rules
vite.config.ts       Vite configuration (base path for GitHub Pages)
```

## Development workflow

### Gitflow branches

| Branch | Purpose |
|---|---|
| `main` | Production code, deployed to GitHub Pages |
| `develop` | Integration branch where finished features are merged |
| `feature/*` | One branch per feature, created from `develop` |
| `release/*` | Prepares a version: the version bump, then merged into `main` and back into `develop` |

### Issues

Every feature has a GitHub issue with the `feature` label. Smaller pieces of work use the `task` label. Pull requests reference their issue.

### Conventional commits

Commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/) format and are checked by commitlint on every commit and in CI:

```
feat: add button to toggle todo completed status
fix: correct the css path
test: add TestCafe tests for editing
docs: add project readme
chore: bump dependencies
```

### Pull requests and review

Nothing is pushed directly to `main` or `develop`. Every change goes through a pull request, needs the approval of a teammate and a passing CI run before it is merged with a merge commit.

## CI/CD pipeline

| Workflow | Trigger | What it does |
|---|---|---|
| CI | Pull requests into `develop` and `main`, pushes to `develop` | Installs dependencies, checks commit messages, builds the app and runs the TestCafe tests |
| Deploy | Push to `main` | Builds the app and publishes it to GitHub Pages |

### Releasing a version

1. Create `release/vX.Y.Z` from `develop` and bump the version with `npm version X.Y.Z --no-git-tag-version`.
2. Open a pull request into `main` and get it reviewed.
3. Merge it. The Deploy workflow publishes the app.
4. Tag the commit on `main` (`vX.Y.Z`) and create a GitHub Release.
5. Merge the release branch back into `develop` with a pull request.

## Versioning

The project uses [Semantic Versioning](https://semver.org/). New features raise the minor version, fixes raise the patch version and breaking changes raise the major version. The current version is **1.1.1**.

## Contributors

- [@lucasalm7](https://github.com/lucasalm7): development
- [@Facuayala29](https://github.com/Facuayala29): code review