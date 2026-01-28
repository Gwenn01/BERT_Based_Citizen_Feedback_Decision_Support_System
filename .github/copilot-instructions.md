# Copilot / AI Agent Instructions — BERT_Based_Citizen_Feedback_Decision_Support_System

Purpose: help coding agents become productive quickly by describing the project's architecture, workflows, conventions, and concrete examples.

1) Big-picture architecture
- Mono-repo with three main runtimes:
  - `client/` — React + Vite admin dashboard (SPA). Uses `npm run dev` for local dev.
  - `kiosk/` — React + Vite kiosk UI for in-person feedback (touch/keyboard). Also `npm run dev`.
  - `server/` — Flask backend exposing REST blueprints under `/api`. Contains AI models, services, controllers, mappers, and a scheduler.
- Dataflow: kiosk/client -> HTTP calls to server blueprints (`/api/*`) -> `controllers/*` -> `services/*` (business logic + AI) -> `database/connection.py` for persistence. Mappers live in `controllers/mapper/` and transform DB rows into JSON DTOs.

2) Key files & places to inspect (examples)
- Server entry: `server/app.py` — registers blueprints, runs lightweight test runners, and starts the scheduler.
- Routes: `server/routes/*.py` (e.g., `admin_overview_routes.py`, `get_survey_routes.py`) — each file defines a Flask blueprint registered under `/api`.
- Controllers: `server/controllers/*` — handle request orchestration and call mappers/services.
- Mappers: `server/controllers/mapper/*.py` — canonical place for shaping DB query outputs (e.g., `admin_overview_mapper.py`, `generate_summary_mapper.py`). Prefer adding mapping logic here, not inline in controllers.
- Models: `server/model/*` — data-access and domain-level helpers (see `get_feedback.py`, `get_summary.py`).
- Services & AI: `server/services/` and `server/ai/` — AI model code lives in `ai/` (`bert_model.py`, `translator.py`); recommendation logic in `services/recommendations/` and `services/knowledge_base/`.
- DB connection: `server/database/connection.py` — uses `mysql-connector-python`; follow the connection pattern here for queries.
- Scheduler: `server/services/scheduler/` — started by `app.py` via `start_scheduler()` (does periodic summary generation).

3) Dev & run workflows (concrete commands)
- Client & kiosk (dev server):
  - Install: `cd client && npm install` (same for `kiosk`)
  - Dev: `npm run dev`
  - Build: `npm run build`
  - Lint: `npm run lint`
- Server (Python/Flask):
  - Create venv & install: 
    ```powershell
    python -m venv .venv
    .\.venv\Scripts\Activate.ps1
    pip install -r server/requirements.txt
    ```
  - Run locally: `python server/app.py` — note: `app.py` runs quick test runners (`model`, `controllers`, `services`) and starts the scheduler.
- Tests: lightweight test runners live in `server/model/run_tests.py`, `server/controllers/run_tests.py`, and `server/services/run_tests.py`. They are invoked automatically by `server/app.py` at startup; you can run them individually for faster iteration.

4) Project-specific conventions and patterns (do exactly like existing code)
- Blueprints: every route file exports a blueprint and is registered in `app.py` with the `/api` prefix. New endpoints should follow this pattern.
- Keep business logic out of route handlers: controllers call services; services call models/mappers.
- Mappers centralize DB -> JSON transformation. When adding new DB queries, add or extend a mapper instead of returning raw rows.
- AI usage: heavy model code and translator helpers are kept in `server/ai/`. Services call into AI modules (e.g., issue detection in `services/recommendations/issue_detector.py`). Avoid duplicating tokenization/model loading across files — prefer importing the shared loader in `ai/bert_model.py`.
- Scheduler side-effects: the scheduler triggers summary generation and is started at server start. Be cautious when changing scheduler timing or summary generation logic.

5) Integration points & external dependencies
- MySQL: configured via `server/database/connection.py` and used by mappers/models.
- AI stack: `torch`, `transformers` listed in `server/requirements.txt`; model weights may be loaded at runtime by `server/ai/bert_model.py`.
- Translator: `server/ai/translator.py` uses `googletrans`/`GoogleTranslator`.
- Background jobs: `apscheduler` is used for scheduled summary generation.

6) Safety notes for modifications
- When editing model loading code, ensure memory/CPU implications are considered (these models run in the Flask process).
- `app.py` triggers test runners on start — removing or altering this will change startup behavior; tests provide useful smoke-checks.

7) Search examples to follow
- Mapping example: `server/controllers/mapper/admin_overview_mapper.py` — shows how DB rows are converted to response shapes.
- Route pattern: `server/routes/admin_overview_routes.py` — demonstrates blueprint creation and controller binding.

8) What to update here
- If you add new blueprints, models, schedulers, or change startup behavior, update this file with the new file paths and any new run steps.

If anything in these notes is unclear or you want more examples (e.g., a sample PR modifying a route + mapper + service), tell me which area and I will expand with concrete code examples and a checklist.
