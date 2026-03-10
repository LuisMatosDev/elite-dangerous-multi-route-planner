# Elite Dangerous Multi-Route Planner â€” Roadmap

> Current version: 0.1.0-dev
> Stack: Electron + React + Vite
> Repository: https://github.com/LuisMatosDev/elite-dangerous-multi-route-planner

---

## Priority System

| Color | Level | Description |
|-------|-------|-------------|
| ðŸ”´ | Critical | App does not work correctly without this |
| ðŸŸ  | Urgent | Direct impact on usability |
| ðŸŸ¡ | Priority | Significantly improves the experience |
| ðŸŸ¢ | Non-urgent | Nice to have |
| ðŸ”µ | Normal | Polish and presentation |

---

## Phase 1 â€” Local Core (current)

| Status | Priority | Feature |
|--------|----------|---------|
| âœ… Done | ðŸ”´ | JournalWatcher â€” real-time log reading |
| âœ… Done | ðŸ”´ | StatusBar â€” current system, ship, jump range |
| âœ… Done | ðŸ”´ | SystemSearch â€” visited systems search |
| âœ… Done | ðŸ”´ | WaypointList â€” add/remove/reorder waypoints |
| âœ… Done | ðŸ”´ | RouteCalculator â€” local distance and jump calculation |
| âœ… Done | ðŸ”´ | RoutePanel â€” unified main layout |
| âœ… Done | ðŸ”´ | WCAG 2.1 AA â€” accessibility and usability compliance |

---

## Phase 2 â€” Essential Functionality

| Status | Priority | Feature | Notes |
|--------|----------|---------|-------|
| â³ Pending | ðŸ”´ | Save and load routes | Using electron-store |
| â³ Pending | ðŸ”´ | Elite Dangerous running detection | Check active process |
| â³ Pending | ðŸŸ  | "Add current system" button as waypoint | 1-click from StatusBar |
| â³ Pending | ðŸŸ  | Mark waypoint as visited on FSDJump | Via JournalWatcher |
| â³ Pending | ðŸŸ  | StatusBar real-time update on jump | Partially implemented |
| â³ Pending | ðŸŸ  | SystemSearch filter by max distance | Range input |

---

## Phase 3 â€” Experience Improvements

| Status | Priority | Feature | Notes |
|--------|----------|---------|-------|
| â³ Pending | ðŸŸ¡ | Route progress indicator | X/Y waypoints visited |
| â³ Pending | ðŸŸ¡ | Search sort by distance to current system | Alternative to alphabetical |
| â³ Pending | ðŸŸ¡ | Export route to clipboard | Shareable text format |
| â³ Pending | ðŸŸ¡ | Different color for visited vs pending waypoints | Green/amber |

---

## Phase 4 â€” Visual and Polish

| Status | Priority | Feature | Notes |
|--------|----------|---------|-------|
| â³ Pending | ðŸŸ¢ | Star type icon (scoopable/non-scoopable) | Journal data |
| â³ Pending | ðŸŸ¢ | Connection animation between waypoints | CSS animation |
| â³ Pending | ðŸŸ¢ | Journal history statistics | No. visited systems, etc |
| â³ Pending | ðŸŸ¢ | StatusBar animation on jump detection | Micro-interaction |

---

## Phase 5 â€” External APIs

| Status | Priority | Feature | Notes |
|--------|----------|---------|-------|
| â³ Pending | ðŸŸ  | EDSM API integration | Pending access/approval |
| â³ Pending | ðŸŸ  | Spansh API integration | Pending access/approval |
| â³ Pending | ðŸŸ¡ | Search unvisited systems via API | Depends on EDSM/Spansh |
| â³ Pending | ðŸŸ¡ | Route plotting via Spansh neutron plotter | Depends on Spansh |

---

## Phase 6 â€” Presentation and Portfolio

| Status | Priority | Feature | Notes |
|--------|----------|---------|-------|
| â³ Pending | ðŸ”µ | Full README.md with screenshots | GitHub |
| â³ Pending | ðŸ”µ | About page in app | Version, credits, license |
| â³ Pending | ðŸ”µ | Open-source license | MIT recommended |
| â³ Pending | ðŸ”µ | Package name refactor | multi-route-planner |
| â³ Pending | ðŸ”µ | Production build and Windows installer | electron-builder |

---

## Status Legend

| Symbol | Meaning |
|--------|---------|
| âœ… Done | Implemented and tested |
| ðŸš§ WIP | In development |
| â³ Pending | Awaiting implementation |
| âŒ Blocked | Blocked by external dependency |
| ðŸ”„ Review | Implemented, needs review |

---

*Last updated: March 2026*
*Developed by: Luis Matos*