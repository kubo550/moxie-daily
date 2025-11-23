# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm install              # Install dependencies
npm run dev              # Start Vite dev server (localhost:5173)
npm run build            # TypeScript check + production build
npm run lint             # Run ESLint
npm run lint:fix         # Run Prettier auto-formatting
npm run preview          # Preview production build
```

## Git Workflow

- **Working branch**: `develop`
- **Deployment**: Push to `main` triggers Netlify CD
- Feature branches from `develop`, merge via PR
- Pre-commit hook runs `tsc -b` (TypeScript build check)

## Tech Stack

- **Framework**: React 18 + TypeScript + Vite (with SWC)
- **Database**: Firebase Firestore (quotes collection)
- **Styling**: Tailwind CSS 4 + shadcn/ui (new-york style) + Radix UI
- **Routing**: React Router DOM 7.1.1
- **Animation**: Framer Motion
- **API**: Axios for backend chat calls

## Architecture

### Data Layer (`src/infrastructure/`)

Singleton pattern for data access:
- **QuoteDBProvider**: Fetches quotes from Firestore
- **CacheProvider**: In-memory quote cache

Quote functions in `qoutes.ts`:
- `getRandomQuote(type)` - Random quote by type
- `getQuoteById(id)` - Specific quote
- `getQuotesByType(types[])` - Multiple types
- Includes fallback quotes for error handling

### Pages (`src/pages/`)

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | DailyQuotePage | Quote display with type filters |
| `/:type` | DailyQuotePage | Filtered by type |
| `/pages/chat` | ChatListPage | Chat coach selection |
| `/pages/chat/:type` | ChatPage | Chat interface |
| `/pages/about` | AboutMePage | About page |

### Components (`src/components/`)

- UI components + shadcn/ui in `ui/` subdirectory
- FooterNavbar provides fixed bottom navigation
- QuoteProvider/QuotesModal for quote selection

### Utilities (`src/utils/`)

- `localStorage.ts` - Type-safe localStorage wrapper with overloaded signatures
- `api/apiClient.ts` - Axios instance with base URL from env
- `api/chat.ts` - Chat API calls to `/daily/chat` endpoint

## Configuration

### Path Aliases

`@/*` maps to `./src/*` (configured in tsconfig and vite.config)

### Environment Variables

Required in `.env` (prefix with `VITE_APP_`):
```
VITE_APP_FIREBASE_API_KEY
VITE_APP_FIREBASE_AUTH_DOMAIN
VITE_APP_FIREBASE_PROJECT_ID
VITE_APP_FIREBASE_STORAGE_BUCKET
VITE_APP_FIREBASE_MESSAGING_SENDER_ID
VITE_APP_FIREBASE_APP_ID
VITE_APP_BACKEND_API_URL
```

### Code Style

- ESLint with TypeScript + React hooks rules
- Prettier: semi, single quotes, es5 trailing commas

## Key Patterns

- Functional components with hooks (useState, useCallback, useLayoutEffect)
- Utility-first Tailwind with `cn()` from `lib/utils.ts` for class merging
- QuoteType enum in `src/types/QuoteType.ts` (27 categories)
- Shareable quote links via `?q=quoteId` query param
- Filter preferences persisted in localStorage
