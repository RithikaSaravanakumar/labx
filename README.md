# ⚡ ZeAI LabX — Realistic Innovation Ecosystem Platform

> **LabX** is an end-to-end, production-quality frontend application prototype designed for the **ZeAI LabX Innovation Ecosystem**. 
> It seamlessly bridges project discovery, build-in-public telemetry, proof-of-work builder portfolios, contextual AI mentor matching, startup traction tracking, and hackathon challenge sprints.

---

## 🚀 Live Demo & Links

- **Repository**: [https://github.com/RithikaSaravanakumar/labx](https://github.com/RithikaSaravanakumar/labx)
- **Tech Stack**: React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide React

---

## ✨ Key Platform Pillars & Features

### 🌌 1. Innovation Orbit (Interactive Ecosystem Visualizer)
- Animated interactive orbital visualization representing ecosystem personas: **Students, Developers, Builders, Founders, Startups, Mentors, Researchers, Investors, Creators**.
- Real-time hover state breakdowns and contextual deep links to specific platform modules.

### 🔍 2. Discovery Hub & Command Search (`Ctrl+K`)
- Multi-domain tabbed search across active projects, venture startups, verified mentors, sprint hackathons, and curated funding opportunities.
- Global modal command search triggered via keyboard shortcut (`Ctrl+K` / `Cmd+K`) or header trigger.

### ⚡ 3. Proof-of-Work Reputation System & Heatmap
- **LabX Level Ring (`LabXPointRing`)**: Animated SVG progress arc computing builder levels based on milestone contributions and build logs.
- **Contribution Heatmap (`LabXContributionHeatmap`)**: 12-week verified public contribution activity grid tracking build log streaks.
- **Rarity Achievement Badges (`ContributionBadge`)**: Glowing tier badges (Common, Rare, Epic, Legendary) for unlocked milestones.

### 🛠️ 4. Build-in-Public Telemetry Feed
- Real-time milestone update log where founders and engineers post progress logs, commit proofs, and milestone achievements.
- Interactive reaction counters (🔥 Fire, 🚀 Rocket, ❤️ Heart) and build update publishing modal.

### 🤝 5. Contextual AI Mentor Match & Office Hours
- Intelligent mentor matching based on project domain and technical stack requirements.
- Seamless 30-minute office hour request booking flow with calendar scheduling.

### 🏆 6. Sprint Hackathons & Opportunity Radar
- Live 48-hour challenge sprints featuring prize pool banners, challenge track breakdowns, and team registration.
- Curated opportunity directory featuring research residencies, grants, internships, and accelerator calls.

### 💡 7. Early-Stage Ideation Vault
- Unbuilt concept repository for early founders looking for feedback, community upvotes, and co-founder recruitment.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: React 19 + Vite (TypeScript strict mode)
- **Styling**: Tailwind CSS with custom `labx-*` design tokens (sleek dark mode, glassmorphism, dynamic glow accents)
- **Animations**: Framer Motion (page transitions, orbital rotations, micro-interactions, modal overlays)
- **Icons**: Lucide React
- **Services & Data Layer**: Decoupled async Promise-based service layer (`src/services`) ready for production REST/GraphQL API wiring.

---

## 📁 Project Folder Structure

```
labx/
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions CI workflow
├── src/
│   ├── animations/              # Framer Motion transition variants
│   ├── components/
│   ├── build/                 # BuildJourneyTimeline
│   ├── navigation/            # Navbar, Footer
│   ├── mentors/               # ContextualMentorMatch
│   ├── onboarding/            # OnboardingModal
│   ├── opportunities/          # OpportunityRadar
│   ├── projects/              # ProjectPulseCard
│   ├── reputation/            # LabXPointRing, ContributionHeatmap, Badges
│   ├── search/                # LabXCommandSearch (Ctrl+K)
│   └── startups/              # StartupPulse
│   ├── constants/               # Domain labels, colors, stage definitions
│   ├── context/                 # AppContext global state provider
│   ├── data/                    # Comprehensive mock data layer
│   ├── layouts/                 # MainLayout with header, footer, modal search
│   ├── pages/                   # Landing, Discover, Projects, ProjectDetail, Build, Profile, Dashboard, Mentors, MentorDetail, Startups, StartupDetail, Hackathons, HackathonDetail, Ideas, Opportunities, Community, Notifications, Settings
│   ├── services/                # API-ready async service abstractions
│   ├── types/                   # Strict TypeScript interfaces
│   └── utils/                   # Formatting & helper utilities
├── vercel.json                  # Single-page application route rewrites
├── tailwind.config.js           # Custom LabX design tokens & theme configuration
└── vite.config.ts               # Vite build configuration
```

---

## 💻 Local Development Setup

```bash
# Clone the repository
git clone https://github.com/RithikaSaravanakumar/labx.git
cd labx

# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle
npm run build
```

---

## 📜 License

Distributed under the MIT License. Built for **ZeAI LabX**.
