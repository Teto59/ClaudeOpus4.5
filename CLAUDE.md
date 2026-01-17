# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

JobTracker (就活管理アプリ) - A Japanese-language job hunting management web application built with React 19 and Vite. All user-facing text is in Japanese.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production (outputs to ./dist)
npm run lint         # Run ESLint
npm run preview      # Preview production build locally
```

## Architecture

### Tech Stack
- React 19 + Vite 7
- No router library - simple state-based page switching in `App.jsx`
- Data persistence via browser localStorage (no backend)

### Data Flow
- `App.jsx` manages all application state and passes props down to child components
- `useLocalStorage` hook (`src/hooks/useLocalStorage.js`) handles localStorage read/write with JSON serialization
- Three localStorage keys prefixed with `jobtracker_`: companies, statuses, notes

### Components
- `Home.jsx` - Company list with deadline sorting and status badges
- `CompanyDetail.jsx` - Single company edit view with memo field
- `Notes.jsx` - General-purpose notes (自己PR, ガクチカ templates)

### Key Conventions
- Default statuses are defined in both `Home.jsx` and `CompanyDetail.jsx` (ES/Webテスト → 面接 stages → 内定/不合格)
- Custom statuses use `custom_${timestamp}` ID format
- Entity IDs use `Date.now().toString()` format

## Deployment

GitHub Pages deployment via `.github/workflows/deploy.yml`:
- Triggers on push to `main` branch
- Uses Node 20
- Base path is `/ClaudeOpus4.5/` (configured in `vite.config.js`)
