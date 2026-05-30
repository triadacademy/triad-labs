# Contributing to Triad Labs LMS

Thanks for your interest in contributing! Here's how to get started.

## Development Setup

1. Fork and clone the repo
2. Install dependencies: `npm install`
3. Copy env file: `cp .env.example .env.local`
4. Start dev server: `npm run dev`

## Branch Naming

- `feature/description` — New features
- `fix/description` — Bug fixes
- `docs/description` — Documentation
- `refactor/description` — Code refactoring

## Code Style

- TypeScript for all new code
- Tailwind CSS for styling (use design tokens from `globals.css`)
- Lucide React for icons
- Components in `components/`, pages in `app/`

## Pull Requests

1. Keep PRs focused — one feature or fix per PR
2. Update README if adding new routes or features
3. Ensure `npm run build` passes
4. Describe what changed and why

## Mock Data

All mock data lives in `lib/mock-data.ts`. When adding new features:
- Add types to the types section
- Add mock data to the data section
- Export helper functions for lookups

## Questions?

Open an issue or reach out at the Triad Academy community.
