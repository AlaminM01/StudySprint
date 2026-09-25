<div align="center">

```
   _____ _             _       _____                 _             
  / ____| |           | |     / ____|               (_)            
 | (___ | |_ _   _  __| |_   | (___  _ __  _ __ _ __  _ _ __  _ __ 
  \___ \| __| | | |/ _` | | | \___ \| '_ \| '__| '_ \| | '_ \| __|
  ____) | |_| |_| | (_| | |_| |___) | |_) | |  | | | | | | | | |_ 
 |_____/ \__|\__,_|\__,_|\__, |_____/| .__/|_|  |_| |_|_|_| |_|\__|
                          __/ |      | |                           
                         |___/       |_|                           
```

# ⚡ StudySprint — Student Productivity & Focus SaaS

> **A high-performance productivity platform designed for students to conquer coursework, sustain unbroken study streaks, master the Pomodoro technique, and analyze learning momentum.**

[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-3.x-22c55e?style=for-the-badge&logo=d3.js&logoColor=white)](https://recharts.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-13.x-f43f5e?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Web Audio API](https://img.shields.io/badge/Web_Audio_API-Synthesized-8B5CF6?style=for-the-badge&logo=soundcharts&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

### 🌐 Live Production Deployment
### 👉 [StudySprint — Modern Student Productivity & Focus Platform](https://study-sprint-zeta.vercel.app/)

[🚀 Launch Live App](https://study-sprint-zeta.vercel.app/) • [📖 Documentation](#table-of-contents) • [✨ Feature Tour](#-core-features) • [🛠️ Architecture](#-project-architecture)

</div>


---

## 📑 Table of Contents

- [💡 Project Story & Mission](#-project-story--mission)
- [✨ Core Features](#-core-features)
- [🖥️ UI & UX Highlights](#%EF%B8%8F-ui--ux-highlights)
- [📐 System Architecture](#-project-architecture)
- [📊 Interactive Analytics Breakdown](#-interactive-analytics-breakdown)
- [🚀 Quick Start & Installation](#-quick-start--installation)
- [📁 Folder Structure Tree](#-folder-structure-tree)
- [🔮 Future Roadmap](#-future-roadmap)
- [🤝 Contributing Guide](#-contributing-guide)
- [👨‍💻 Author](#-author)
- [📄 License](#-license)

---

## 💡 Project Story & Mission

Modern students juggle complex computer science algorithms, system design books, math theorem proofs, and web dev projects. Yet, most study applications are either:
1. **Cluttered generic todo apps** that don't track focus duration or subject workloads.
2. **Standalone Pomodoro timers** isolated from actual task backlogs and deadlines.
3. **Complex enterprise tools** that induce cognitive overload rather than calm focus.

**StudySprint** was engineered to solve this friction. It unifies **sprint-based task planning**, **customizable Pomodoro intervals**, **unbroken study streak mechanics**, **synthesized ambient audio**, and **data-driven Recharts analytics** into a single, cohesive, client-first workspace.

```
       [ Coursework Backlog ]
                 │
                 ▼
     [ 25-Min Focus Sprint ]  ──▶  [ Web Audio Synthesizer (Rain / Alpha Waves) ]
                 │
                 ▼
       [ Streak Calculation ] ──▶  [ Flame Level & Trophy Unlocks ]
                 │
                 ▼
   [ Recharts Visual Analytics ] ──▶ [ Flow Score (0-100) & Subject Breakdown ]
```

---

## ✨ Core Features

### 1. 📋 Smart Coursework Task Manager
- **CRUD Operations:** Create, edit, prioritize, mark complete, or delete study sprints.
- **Academic Subject Categories:** Color-coded badges for Computer Science (`CS`), Data Structures & Algorithms (`DSA`), Artificial Intelligence (`AI/ML`), Discrete Math (`MATH`), Full-Stack Web Dev (`WEB`), and Operating Systems (`OS/NET`).
- **Priority Quadrants:** `Urgent`, `High`, `Medium`, and `Low` with visual indicator pills.
- **Deadline Tracking:** Real-time overdue alerts, today's targets, and calendar picker.
- **Pomodoro Estimator:** Set estimated focus blocks (1 to 8 pomodoros) with completed session tracking.

### 2. ⚡ Pomodoro Focus Station
- **Triple Mode Intervals:** 25-minute Deep Work, 5-minute Short Rest, and 15-minute Long Recharge.
- **Circular SVG Progress Dial:** Smooth dynamic gradient stroke that tracks elapsed percentage in real-time.
- **Round Counter:** Visual 4-dot indicator tracking progress towards the long recharge break.
- **Active Task Linking:** Link any task to your active timer so every completed sprint updates the task velocity automatically.
- **Customizable Preferences:** Adjust focus/break durations, toggles for auto-starting breaks/pomodoros, and chime volume.

### 3. 🔥 Daily Study Streak & Achievements
- **Consecutive Study Day Engine:** Automatically calculates current streak, longest record, and today's active status.
- **35-Day Consistency Heatmap:** Contribution grid mapping daily study volume with intensity tiers and informative tooltips.
- **Tiered Trophy Case:** 10 achievement badges categorized across *Bronze*, *Silver*, *Gold*, and *Diamond* tiers (e.g., *Flame Starter*, *Deep Work Master*, *Century Club*, *Renaissance Mind*).
- **Milestone Celebration:** Integrated celebratory confetti particle bursts on milestone completions.

### 4. 📈 Interactive Analytics & Productivity Flow Score
- **Study Hours Area Chart:** Interactive Recharts area trend graph with 7-day and 14-day views.
- **Weekly Sprint Velocity:** Dual bar chart comparing daily focus hours vs completed coursework tasks.
- **Subject Distribution Donut:** Visual donut chart breaking down hours spent per academic discipline.
- **Productivity Flow Score (0–100):** Multi-factor algorithm:
  $$\text{Score} = \text{Focus Volume (40\%)} + \text{Task Velocity (35\%)} + \text{Streak Momentum (20\%)} + \text{Consistency Baseline (5\%)}$$

### 5. 🎧 Offline Web Audio Synthesizer
- **No external audio files required!** Synthesizes ambient noise directly in the browser via the Web Audio API.
- **Options:** Gentle Rain (filtered pink noise), White Noise, and 10Hz Alpha Waves (Binaural Beats for relaxed concentration).
- **Completion Chimes:** Pleasant harmonic chord sequence (C5, E5, G5, C6) signaling session completion.

### 6. 💡 Mindset & Daily Inspiration Module
- **Curated Wisdom Repository:** Quotes from Cal Newport, James Clear, Barbara Oakley, and leading thinkers.
- **Category Filter Tabs:** *Focus*, *Consistency*, *Discipline*, *Mindset*, *Success*, and *Favorites*.
- **Interactive Tools:** One-click random quote shuffle, copy citation to clipboard, and persistent bookmarking.

### 7. 💾 LocalStorage Persistence & Portability
- **Client-Side Storage:** Zero server setup needed; all tasks, logs, streaks, and preferences persist in `localStorage`.
- **One-Click Backup & Restore:** Export clean JSON backups or reload rich seed demo data instantly.

---

## 🖥️ UI & UX Highlights

| Feature | Design Implementation |
| :--- | :--- |
| **Glassmorphism** | `backdrop-blur-xl`, semi-transparent slate palettes, and soft border highlights |
| **Theme Engine** | System-aware Dark and Light modes with transition animations |
| **Micro-Interactions** | Framer Motion page switches, tactile button press scaling (`active:scale-95`) |
| **Mobile-First** | Dedicated bottom navigation bar with `pb-safe` iPhone safe area padding |
| **Pulsing Flame** | Custom CSS keyframe animation reflecting active streak status |

---

## 📁 Folder Structure Tree

```text
StudySprint/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   ├── AnimatedPage.jsx      # Framer motion transition wrapper
│   │   │   ├── Badge.jsx             # Status and subject badge primitives
│   │   │   ├── Button.jsx            # Reusable button with variants
│   │   │   ├── Card.jsx              # Glassmorphic card container
│   │   │   ├── EmptyState.jsx        # Illustrated empty list fallbacks
│   │   │   ├── Modal.jsx             # Accessible modal with escape listener
│   │   │   └── ThemeToggle.jsx       # Sun/Moon mode switcher
│   │   ├── layout/
│   │   │   ├── AppLayout.jsx         # Shell integrating Header, Sidebar, Nav
│   │   │   ├── Header.jsx            # Sticky top bar with quick streak flame
│   │   │   ├── Sidebar.jsx           # Desktop navigation with progress bar
│   │   │   └── MobileNav.jsx         # Touch-optimized bottom navigation
│   │   ├── dashboard/
│   │   │   ├── DashboardView.jsx     # Master overview hub
│   │   │   ├── StatsOverview.jsx     # 4 primary metric cards
│   │   │   ├── QuickFocusCard.jsx    # Mini Pomodoro launcher widget
│   │   │   ├── TodayTasksCard.jsx    # High-priority task check-off list
│   │   │   ├── DailyStreakCard.jsx   # 7-day consistency circle tracker
│   │   │   └── RecentActivity.jsx    # Live chronological audit log
│   │   ├── tasks/
│   │   │   ├── TasksView.jsx         # Task manager view with filter bar
│   │   │   ├── TaskList.jsx          # Velocity progress and task items
│   │   │   ├── TaskItem.jsx          # Individual task row with actions
│   │   │   ├── TaskFilters.jsx       # Subject, priority, and status chips
│   │   │   └── TaskModal.jsx         # Create & edit modal form
│   │   ├── timer/
│   │   │   ├── TimerView.jsx         # Focus sprint workspace
│   │   │   ├── PomodoroTimer.jsx     # Circular SVG animated countdown dial
│   │   │   ├── TimerSettingsModal.jsx# Timing customization dialog
│   │   │   ├── AmbientSoundPlayer.jsx# Web Audio sound generator
│   │   │   └── FocusStatisticsCard.jsx# Today's sprints summary
│   │   ├── streak/
│   │   │   ├── StreakView.jsx        # Streaks and badges center
│   │   │   ├── StreakCalendar.jsx    # 35-day activity heatmap
│   │   │   └── BadgesGrid.jsx        # Achievement showcase
│   │   ├── analytics/
│   │   │   ├── AnalyticsView.jsx     # Master analytics page
│   │   │   ├── AnalyticsOverviewCards.jsx # Top-line metric widgets
│   │   │   ├── StudyHoursChart.jsx   # Recharts AreaChart (7d/14d)
│   │   │   ├── WeeklyProductivityChart.jsx # Recharts Composed BarChart
│   │   │   ├── SubjectBreakdownChart.jsx # Recharts Donut chart
│   │   │   └── ProductivityScoreCard.jsx # Radial score gauge
│   │   └── quotes/
│   │       ├── QuotesView.jsx        # Categorized quotes grid
│   │       └── MotivationalQuoteCard.jsx # Shuffled quote spotlight
│   ├── context/
│   │   ├── ThemeContext.jsx          # Dark / Light theme provider
│   │   └── StudySprintContext.jsx    # Central application state & storage
│   ├── data/
│   │   ├── initialData.js            # Seed tasks, streak, and daily logs
│   │   ├── subjects.js               # Academic subject tokens and colors
│   │   ├── badges.js                 # Achievement definitions & criteria
│   │   └── quotes.js                 # Curated motivational library
│   ├── hooks/
│   │   ├── useLocalStorage.js        # Type-safe LocalStorage synchronizer
│   │   └── useTimer.js               # Pomodoro countdown engine
│   ├── utils/
│   │   ├── soundSynth.js             # Web Audio API ambient & chime synth
│   │   ├── streakCalculator.js       # Consecutive streak logic & badges
│   │   ├── productivityCalculator.js # Productivity flow score formula
│   │   ├── formatters.js             # Date, time, and relative formatters
│   │   └── confetti.js               # Canvas-confetti celebration triggers
│   ├── tests/
│   │   └── calculations.test.js      # Unit verification test suite
│   ├── App.jsx                       # Root application component
│   ├── main.jsx                      # React 19 entry point
│   └── index.css                     # Tailwind CSS v4 design tokens
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Quick Start & Installation

### 🌐 Try the Live Deployment
Access and test the fully deployed web application directly in your browser:
👉 **[StudySprint — Modern Student Productivity & Focus Platform](https://study-sprint-zeta.vercel.app/)**

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` or `pnpm` / `yarn`

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AlaminM01/StudySprint.git
   cd StudySprint
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173` to explore StudySprint!

4. **Run the algorithmic test suite:**
   ```bash
   node src/tests/calculations.test.js
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🔮 Future Roadmap

- [ ] **Cloud Sync:** Optional Firebase / Supabase integration for multi-device sync.
- [ ] **Collaborative Study Rooms:** Virtual study rooms with shared Pomodoro timers.
- [ ] **Spotify & Lofi Radio Integration:** Embed student lofi streams directly in the focus station.
- [ ] **Flashcards & Spaced Repetition:** Anki-style Leitner system integrated with subject tasks.
- [ ] **PWA Support:** Installable offline Progressive Web App for mobile & desktop.

---

## 🤝 Contributing Guide

Contributions, issues, and feature requests are welcome!

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'feat: Add AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 👨‍💻 Author

**Alamin Mondal**
- GitHub: [@AlaminM01](https://github.com/AlaminM01)
- Email: alaminmondal297@outlook.com

<div align="center">

[![Alamin's GitHub stats](https://github-readme-stats.vercel.app/api?username=AlaminM01&show_icons=true&theme=tokyonight)](https://github.com/AlaminM01)

</div>

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

<div align="center">
  <sub>Built with ❤️ and dedication by <a href="https://github.com/AlaminM01">Alamin Mondal</a>. Empowering students to build deep work habits every single sprint.</sub>
</div>
