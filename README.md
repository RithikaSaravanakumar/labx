# ⚡ LabX — The Innovation Ecosystem Platform

> **"BUILD WHAT MATTERS."**  
> *Where ambitious people, bold ideas, and meaningful opportunities come together.*  
> **"YOUR WORK BECOMES YOUR REPUTATION."**

---

## 🌐 Overview

**LabX** is an end-to-end, production-grade innovation ecosystem frontend designed for high-velocity builders, founders, students, mentors, and investors. Built with React 19, TypeScript, Tailwind CSS, and Framer Motion, LabX bridges project discovery, build-in-public telemetry, proof-of-work builder portfolios, AI-powered mentor matching, and sprint hackathons into an interconnected workspace.

- **GitHub Repository**: [https://github.com/RithikaSaravanakumar/labx](https://github.com/RithikaSaravanakumar/labx)
- **CI/CD Status**: GitHub Actions Automated Lint, Unit Tests, and Production Build on every push to `main`.

---

## 🔑 Demo Access & Personas

LabX comes equipped with a production-ready mock authentication service (`authService`) with instant one-click demo credentials across key ecosystem personas:

| Persona | Email | Default Password | Role & Permissions |
| :--- | :--- | :--- | :--- |
| **Student** | `student@labx.demo` | `LabX@Demo123` | Learning, hackathons, open-source projects |
| **Builder / Engineer** | `builder@labx.demo` | `LabX@Demo123` | Build-in-public feed, milestone proofs, reputation level ring |
| **Founder** | `founder@labx.demo` | `LabX@Demo123` | Project publishing, venture pulse metrics, team recruitment |
| **Mentor** | `mentor@labx.demo` | `LabX@Demo123` | Office hour bookings, mentoring sessions, code reviews |
| **Investor** | `investor@labx.demo` | `LabX@Demo123` | Deal flow radar, startup traction metrics, funding requests |

> **Self-Service Onboarding**: You can also use the interactive **4-step Signup Wizard** at `/signup` to register a bespoke profile with personalized role selection, skill tagging, and ecosystem goals. Password recovery workflows are simulated at `/forgot-password` and `/reset-password`.

---

## 🚀 Key Architectural Pillars

### 🌌 1. Innovation Orbit (Interactive Ecosystem Visualizer)
- Dynamic circular visualization representing ecosystem personas: **Students, Developers, Builders, Founders, Startups, Mentors, Researchers, Investors, Creators**.
- Full keyboard accessibility with `Tab` index navigation, live ARIA labels, and glowing active states.

### 🔍 2. Global Command Search (`Ctrl+K` / `Cmd+K`)
- Instant keyboard-driven palette allowing builders to jump directly to projects, startups, mentors, hackathons, and opportunities.

### ⚡ 3. Proof-of-Work Reputation System
- **Level Progress Arc (`LabXPointRing`)**: Computes builder levels based on verified milestone contributions.
- **Contribution Heatmap (`LabXContributionHeatmap`)**: 12-week public commit & build telemetry tracking streaks.
- **Tiered Badges (`ContributionBadge`)**: Common, Rare, Epic, and Legendary proof-of-work badges.

### 🤖 4. AI Ecosystem Service (`aiService`)
- **Contextual Mentor Matching**: Match scoring based on project tech stack, developer domain, and mentor availability.
- **Skill Gap Analysis**: Analyzes builder goals vs target roles and recommends high-leverage projects and hackathons.
- **Project Health Telemetry**: Algorithmic scoring of velocity, team completeness, build log frequency, and documentation.

### 🛠️ 5. Personal Builder Workspace
- `/dashboard`: High-level metrics, active projects, application alerts, and quick actions.
- `/my-projects`: Manage active repositories, update milestone proofs, and publish project updates.
- `/my-applications`: Real-time status tracking for hackathon submissions, grant calls, and mentor bookings.
- `/saved`: Bookmark and organize saved startups, research opportunities, and mentor profiles.

---

## 🧭 Application Route Sitemap

### Public Discovery
- `/` — Platform landing page with hero brand philosophy, Innovation Orbit, and featured tracks.
- `/about` — Mission statement, operating principles, core differentiator, and leadership ecosystem.
- `/discover` — Multi-domain unified search across all ecosystem entities.
- `/projects` & `/projects/:id` — Public project showcase with telemetry, tech stacks, and team rosters.
- `/startups` & `/startups/:id` — Venture directory with traction metrics, MRR growth, and angel scout requests.
- `/mentors` & `/mentors/:id` — Verified expert directory with 30-minute office hour booking.
- `/hackathons` & `/hackathons/:id` — Sprint challenges with prize pool breakdowns and submission guidelines.
- `/ideas` — Early-stage ideation vault for community feedback and co-founder matching.
- `/opportunities` — Curated grants, accelerator calls, research fellowships, and residencies.
- `/community` — Community guidelines, discussion threads, and builder chapters.

### Authentication & Onboarding
- `/login` — Demo persona selector, email/password entry, and session persistence.
- `/signup` — 4-Step onboarding wizard (Credentials -> Persona -> Skills & Interests -> Goal Alignment).
- `/forgot-password` & `/reset-password` — Password recovery simulation.

### Authenticated Builder Suite (Guarded via `ProtectedRoute`)
- `/dashboard` — Unified mission control for builder telemetry.
- `/my-projects` — Dedicated management hub for builder's created projects.
- `/my-applications` — Status tracking for grants, internships, and hackathon teams.
- `/saved` — Personal collection of bookmarked opportunities and mentors.
- `/build` — Live build-in-public telemetry feed with reaction counters and milestone posting.
- `/profile` — Public builder portfolio with heatmap and reputation badges.
- `/settings` — Account settings, notification preferences, and privacy controls.
- `/notifications` — Activity updates, application status changes, and mentor confirmations.

---

## 🛠️ Tech Stack & Engineering Standards

- **Core**: React 19, TypeScript strict mode, Vite 8
- **Styling**: Tailwind CSS v4 with curated dark-palette design tokens (`#030712`, `#7c3aed`, `#06b6d4`, `#10b981`)
- **Animation**: Framer Motion with automatic `prefers-reduced-motion` compliance
- **Icons**: Lucide React + custom inline vector assets
- **Branding**: Clean SVG typography wordmark (`Lab` + glowing violet `X` + handshake glyph)
- **Testing**: Vitest, React Testing Library, JSDOM, `@testing-library/jest-dom`
- **CI/CD**: GitHub Actions workflow running on Ubuntu (`lint`, `test`, `build`)

---

## 🧪 Testing & Verification

LabX includes automated unit and integration tests covering the authentication service, session management, and branding components:

```bash
# Run automated Vitest test suite
npm run test

# Run TypeScript compilation and bundle build
npm run build

# Run Oxlint / ESLint linter
npm run lint
```

---

## 💻 Local Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/RithikaSaravanakumar/labx.git
cd labx

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Open in browser
# Local URL: http://localhost:5173
```

---

## 🤝 Contributing & Git Discipline

Every commit in LabX adheres to the Conventional Commits specification:
- `feat(...)`: New user-facing feature or route
- `fix(...)`: Bug fix or edge-case resolution
- `test(...)`: Unit/integration tests or test configuration
- `docs(...)`: Documentation updates
- `refactor(...)`: Code cleanup without functional change

---

## 📜 License

Distributed under the MIT License. Designed and engineered for **LabX Innovation Ecosystem**.
