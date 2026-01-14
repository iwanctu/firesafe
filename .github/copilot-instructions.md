# FireSafe - AI Coding Agent Instructions

## Project Overview
FireSafe is now a full-stack web application with real-time database functionality. The frontend is a single-page application (SPA) built in vanilla JavaScript, HTML, and CSS, while the backend provides RESTful APIs and WebSocket real-time updates using Node.js, Express, SQLite, and Socket.IO.

## Architecture & Data Flow

### Core Architecture
- **Frontend**: Single HTML file with embedded CSS/JS, served from `/public/index.html`
- **Backend**: Node.js/Express server with SQLite database and Socket.IO for real-time updates
- **Database**: SQLite with tables for products, categories, layout_config, and users
- **Real-time**: WebSocket connections for live updates across multiple admin sessions
- **File Storage**: Local file uploads stored in `/uploads/` directory

### Data Management
```javascript
// Frontend loads data via API calls
async function loadData() {
    [products, categories, layoutConfig] = await Promise.all([
        apiCall('/api/products'),
        # FireSafe — Copilot Instructions (concise)

        This project is a small Node.js + Express backend with a single-page frontend (vanilla JS) and real-time sync via Socket.IO. The goal of these notes is to help an AI coding agent become productive quickly by describing the architecture, conventions, and where to make changes.

        **Big picture**
        - Backend: `server.js` exposes REST APIs (e.g. `/api/products`, `/api/categories`, `/api/layout-config`) and serves static files. It uses SQLite via `database.js` and broadcasts changes over Socket.IO.
        - Frontend: `public/index.html` (and the top-level `index.html`) contains the SPA, default data arrays, rendering logic, and client Socket.IO listeners. State is kept in in-memory arrays (`products`, `categories`, `layoutConfig`).
        - Uploads: `uploads/` stores uploaded files; Express serves this folder as static.

        **Quick dev commands**
        - Install & run: `npm install` then `npm start` (starts Express, default port 3000).
        - Use multiple browser tabs to validate real-time behavior (Socket.IO).

        **Key files to edit**
        - `server.js` — add/modify API routes and where server emits Socket.IO events after DB changes.
        - `database.js` — implement or change SQLite schema and promise-wrapped DB helpers.
        - `public/index.html` — client rendering, API helpers (`apiCall()`), and Socket.IO listeners.
        - `.github/copilot-instructions.md` — (this file)

        **Patterns & conventions specific to this repo**
        - Single-file frontend: most UI, data models, and admin tools are in `public/index.html`. Search there for functions like `loadData()`, `renderAll()`, `generateProductCard()`.
        - In-memory sync: client keeps arrays (`products`, `categories`, `layoutConfig`) and re-renders the page after API responses or socket events; keep client updates idempotent.
        - Socket events: typical events are `productCreated`, `productUpdated`, `productDeleted`, `categoryCreated`, `categoryUpdated`, `categoryDeleted`, `layoutConfigUpdated`. When adding a server-side change, always `io.emit()` the matching event with the new/updated object.
        - File uploads: client sends `FormData` with `image` field; server uses `multer` to write to `/uploads/`. The returned path is `/uploads/<filename>` and used directly in UI.

        **Where to make feature changes (examples)**
        - Add a new product API: modify `server.js` route handler, update `database.js` to persist, then `io.emit('productCreated', product)` after insertion.
        - Add a new UI control: update `public/index.html` render functions and ensure any new server endpoint is implemented.

        **Debugging tips**
        - Server logs: `console.log` in `server.js` for incoming requests and DB results.
        - Client devtools: open Console/Network to inspect REST calls and socket messages; `socket.on(...)` handlers are in `public/index.html`.

        **Code style & small conventions**
        - Keep changes small and local — the repo favors simple, minimal edits rather than large refactors.
        - Client code is uppercase/font-styled and uses global helpers on `window` (e.g., `window.showToast`, `window.addToCart`). Follow existing naming patterns when adding new globals.

        If you want, I can refine any section, add a short checklist for PRs, or expand examples for specific tasks (adding a DB column, adding a socket event, or wiring an upload endpoint). Please tell me which area to expand.