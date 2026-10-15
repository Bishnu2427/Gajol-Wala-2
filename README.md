# DemoSite

Landing page for a clothing brand. React (Vite) frontend, Flask backend.

```
backend/    Flask API  — app.py (routes), data.py (catalogue content)
frontend/   React app  — src/components/*, src/index.css
```

## Run in development

Two terminals:

```bash
# 1) API  ->  http://127.0.0.1:5000
cd backend
python -m venv .venv
.venv\Scripts\activate          # macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

```bash
# 2) Frontend  ->  http://localhost:5173
cd frontend
npm install
npm run dev
```

Vite proxies `/api/*` to Flask, so open **http://localhost:5173**.

## Production build

```bash
cd frontend && npm run build     # outputs frontend/dist
cd ../backend && python app.py   # Flask now serves the built site + API on :5000
```

## API

| Method | Path                    | Description                                   |
|--------|-------------------------|-----------------------------------------------|
| GET    | `/api/health`           | Health check                                  |
| GET    | `/api/site`             | Hero, marquee, products, collections, lookbook |
| GET    | `/api/products`         | All products                                  |
| GET    | `/api/products/<slug>`  | One product                                   |
| GET    | `/api/collections`      | All collections                               |
| POST   | `/api/subscribe`        | `{ "email": "..." }` → saves to SQLite        |

## Customising

- **Brand name** — `BRAND` in `frontend/src/App.jsx`.
- **Products / images / copy** — `backend/data.py` (images are Unsplash placeholders).
- **Background colour** — `--bg` at the top of `frontend/src/index.css`.
