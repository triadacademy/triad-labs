# Triad Labs LMS

A modern learning management system for trading, finance, AI & tech, and innovation courses. Built with Next.js 16, Tailwind CSS 4, and NextAuth.js.

**Live:** [triad-labs.vercel.app](https://triad-labs.vercel.app)

---

## Features

### Course Player
- Dark-themed interactive lesson viewer with video placeholder
- Collapsible module sidebar with lesson navigation
- Progress tracking with mark-complete functionality
- Auto-advance to next lesson and course completion celebration

### Quiz System
- Timed multiple-choice quizzes with countdown timer
- Question-by-question navigation with progress dots
- Auto-submit on timeout
- Detailed results with score, pass/fail, and full answer review with explanations

### Admin Panel
- Dashboard with stat cards (students, courses, revenue, completions)
- Recent activity feed and top courses ranking
- Course management table with search and category filter
- User management with role filter (student, instructor, admin)

### Authentication
- NextAuth.js v5 with credentials provider
- JWT-based sessions with role support
- Protected routes via middleware
- Login, register, and logout flows

### Communities
- Browse and join learning communities
- Category-based filtering
- Private/public community support

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Styling | Tailwind CSS 4 + CSS custom properties |
| Auth | NextAuth.js v5 (Credentials provider) |
| Icons | Lucide React |
| Animation | Motion (Framer Motion) |
| Language | TypeScript |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20+)
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repo
git clone https://github.com/triadacademy/triad-labs.git
cd triad-labs

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file:

```env
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
```

Generate a secret with: `openssl rand -base64 32`

---

## Demo Accounts

Any email + password `password` works. Pre-configured accounts:

| Email | Role | Access |
|-------|------|--------|
| `yash@triadlabs.com` | Student | Full LMS access |
| `admin@triadlabs.com` | Admin | LMS + Admin panel |
| `priya@example.com` | Instructor | LMS access |

---

## Project Structure

```
triad-labs/
├── app/
│   ├── admin/              # Admin panel pages
│   │   ├── courses/        # Course management
│   │   ├── users/          # User management
│   │   ├── layout.tsx      # Admin layout with sidebar
│   │   └── page.tsx        # Admin dashboard
│   ├── api/auth/           # NextAuth.js API routes
│   ├── courses/
│   │   ├── [id]/
│   │   │   ├── learn/      # Course player
│   │   │   ├── quiz/       # Quiz system
│   │   │   └── page.tsx    # Course detail
│   │   └── page.tsx        # Course catalog
│   ├── communities/        # Learning communities
│   ├── dashboard/          # Student dashboard
│   ├── login/              # Login page
│   ├── register/           # Register page
│   ├── my-courses/         # Enrolled courses
│   ├── notifications/      # Notifications
│   ├── profile/            # User profile
│   ├── resources/          # Downloadable resources
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles + design tokens
├── components/
│   ├── AppShell.tsx        # Shared layout wrapper
│   ├── Sidebar.tsx         # LMS navigation sidebar
│   └── AuthProvider.tsx    # NextAuth session provider
├── lib/
│   ├── auth.ts             # NextAuth configuration
│   └── mock-data.ts        # Centralized mock data + types
└── middleware.ts            # Auth route protection
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Create production build |
| `npm start` | Run production server |
| `npm run lint` | Run ESLint |

---

## Routes

### Public
- `/` — Landing page
- `/login` — Sign in
- `/register` — Create account
- `/forgot-password` — Password reset

### Student (protected)
- `/dashboard` — Student dashboard
- `/courses` — Browse all courses
- `/courses/[id]` — Course detail with modules & quizzes
- `/courses/[id]/learn` — Course player
- `/courses/[id]/quiz/[quizId]` — Take a quiz
- `/my-courses` — Enrolled courses with progress
- `/communities` — Learning communities
- `/resources` — Downloadable resources
- `/notifications` — Notifications
- `/profile` — User profile

### Admin (protected)
- `/admin` — Admin dashboard with stats
- `/admin/courses` — Course management
- `/admin/users` — User management

---

## Design System

The project uses a custom design token system built on CSS custom properties:

- **Primary:** Orange (#ff7628) with gradient
- **Surface:** Warm whites and light grays
- **Glass:** Frosted glass effect for cards (glassmorphism)
- **Dark:** Slate palette for course player and quiz UIs

All tokens are defined in `app/globals.css`.

---

## Deployment

### Vercel (recommended)

1. Push to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Set `NEXTAUTH_SECRET` in environment variables
4. Deploy

### Manual

```bash
npm run build
npm start
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

Built by [Triad Academy](https://triadacademy.io)
