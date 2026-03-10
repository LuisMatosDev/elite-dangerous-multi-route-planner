# Elite Dangerous Multi-Route Planner — Roadmap

> Current version: 0.1.0-dev
> Stack: Electron + React + Vite
> Repository: https://github.com/LuisMatosDev/elite-dangerous-multi-route-planner

---

## Priority System

| Color | Level | Description |
|-------|-------|-------------|
| 🔴 | Critical | App does not work correctly without this |
| 🟠 | Urgent | Direct impact on usability |
| 🟡 | Priority | Significantly improves the experience |
| 🟢 | Non-urgent | Nice to have |
| 🔵 | Normal | Polish and presentation |

---

## Phase 1 — Local Core (current)

| Status | Priority | Feature |
|--------|----------|---------|
| ✅ Done | 🔴 | JournalWatcher — real-time log reading |
| ✅ Done | 🔴 | StatusBar — current system, ship, jump range |
| ✅ Done | 🔴 | SystemSearch — visited systems search |
| ✅ Done | 🔴 | WaypointList — add/remove/reorder waypoints |
| ✅ Done | 🔴 | RouteCalculator — local distance and jump calculation |
| ✅ Done | 🔴 | RoutePanel — unified main layout |
| ✅ Done | 🔴 | WCAG 2.1 AA — accessibility and usability compliance |

---

## Phase 2 — Essential Functionality

| Status | Priority | Feature | Notes |
|--------|----------|---------|-------|
| ⏳ Pending | 🔴 | Save and load routes | Using electron-store |
| ⏳ Pending | 🔴 | Elite Dangerous running detection | Check active process |
| ⏳ Pending | 🟠 | "Add current system" button as waypoint | 1-click from StatusBar |
| ⏳ Pending | 🟠 | Mark waypoint as visited on FSDJump | Via JournalWatcher |
| ⏳ Pending | 🟠 | StatusBar real-time update on jump | Partially implemented |
| ⏳ Pending | 🟠 | SystemSearch filter by max distance | Range input |

---

## Phase 3 — Experience Improvements

| Status | Priority | Feature | Notes |
|--------|----------|---------|-------|
| ⏳ Pending | 🟡 | Route progress indicator | X/Y waypoints visited |
| ⏳ Pending | 🟡 | Search sort by distance to current system | Alternative to alphabetical |
| ⏳ Pending | 🟡 | Export route to clipboard | Shareable text format |
| ⏳ Pending | 🟡 | Different color for visited vs pending waypoints | Green/amber |

---

## Phase 4 — Visual and Polish

| Status | Priority | Feature | Notes |
|--------|----------|---------|-------|
| ⏳ Pending | 🟢 | Star type icon (scoopable/non-scoopable) | Journal data |
| ⏳ Pending | 🟢 | Connection animation between waypoints | CSS animation |
| ⏳ Pending | 🟢 | Journal history statistics | No. visited systems, etc |
| ⏳ Pending | 🟢 | StatusBar animation on jump detection | Micro-interaction |

---

## Phase 5 — External APIs

| Status | Priority | Feature | Notes |
|--------|----------|---------|-------|
| ⏳ Pending | 🟠 | EDSM API integration | Pending access/approval |
| ⏳ Pending | 🟠 | Spansh API integration | Pending access/approval |
| ⏳ Pending | 🟡 | Search unvisited systems via API | Depends on EDSM/Spansh |
| ⏳ Pending | 🟡 | Route plotting via Spansh neutron plotter | Depends on Spansh |

---

## Phase 6 — Presentation and Portfolio

| Status | Priority | Feature | Notes |
|--------|----------|---------|-------|
| ⏳ Pending | 🔵 | Full README.md with screenshots | GitHub |
| ⏳ Pending | 🔵 | About page in app | Version, credits, license |
| ⏳ Pending | 🔵 | Open-source license | MIT recommended |
| ⏳ Pending | 🔵 | Package name refactor | multi-route-planner |
| ⏳ Pending | 🔵 | Production build and Windows installer | electron-builder |

---

## Status Legend

| Symbol | Meaning |
|--------|---------|
| ✅ Done | Implemented and tested |
| 🚧 WIP | In development |
| ⏳ Pending | Awaiting implementation |
| ❌ Blocked | Blocked by external dependency |
| 🔄 Review | Implemented, needs review |

---

*Last updated: March 2026*
*Developed by: Luis Matos*