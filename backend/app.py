"""DemoSite API.

Dev:   python app.py            -> http://127.0.0.1:5000  (Vite proxies /api here)
Prod:  build the frontend first (npm run build) and Flask also serves frontend/dist.
"""

import os
import re
import sqlite3
from pathlib import Path

from flask import Flask, abort, g, jsonify, request, send_from_directory

from data import COLLECTIONS, HERO, LOOKBOOK, MARQUEE, PRODUCTS

BASE_DIR = Path(__file__).resolve().parent
DIST_DIR = BASE_DIR.parent / "frontend" / "dist"
DB_PATH = Path(os.environ.get("DEMOSITE_DB", BASE_DIR / "demosite.db"))
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

app = Flask(__name__, static_folder=None)


# ---------- Database ----------
def get_db():
    if "db" not in g:
        g.db = sqlite3.connect(DB_PATH)
        g.db.row_factory = sqlite3.Row
    return g.db


@app.teardown_appcontext
def close_db(_exc):
    db = g.pop("db", None)
    if db is not None:
        db.close()


def init_db():
    with sqlite3.connect(DB_PATH) as db:
        db.execute(
            """CREATE TABLE IF NOT EXISTS subscribers (
                   id INTEGER PRIMARY KEY AUTOINCREMENT,
                   email TEXT UNIQUE NOT NULL,
                   created_at TEXT DEFAULT CURRENT_TIMESTAMP
               )"""
        )


# ---------- API ----------
@app.get("/api/health")
def health():
    return jsonify(status="ok")


@app.get("/api/site")
def site():
    """Everything the landing page needs in one request."""
    return jsonify(
        hero=HERO,
        marquee=MARQUEE,
        products=PRODUCTS,
        collections=COLLECTIONS,
        lookbook=LOOKBOOK,
    )


@app.get("/api/products")
def products():
    return jsonify(PRODUCTS)


@app.get("/api/products/<slug>")
def product(slug):
    match = next((p for p in PRODUCTS if p["slug"] == slug), None)
    if match is None:
        abort(404)
    return jsonify(match)


@app.get("/api/collections")
def collections():
    return jsonify(COLLECTIONS)


@app.post("/api/subscribe")
def subscribe():
    payload = request.get_json(silent=True) or {}
    email = str(payload.get("email", "")).strip().lower()

    if not EMAIL_RE.match(email) or len(email) > 254:
        return jsonify(ok=False, message="Please enter a valid email address."), 400

    db = get_db()
    cur = db.execute("INSERT OR IGNORE INTO subscribers (email) VALUES (?)", (email,))
    db.commit()

    if cur.rowcount == 0:
        return jsonify(ok=True, message="You're already on the list.")
    return jsonify(ok=True, message="Thanks — check your inbox for 10% off."), 201


@app.errorhandler(404)
def not_found(_e):
    if request.path.startswith("/api/"):
        return jsonify(ok=False, message="Not found"), 404
    return spa("")


# ---------- Built frontend (production) ----------
@app.get("/", defaults={"path": ""})
@app.get("/<path:path>")
def spa(path):
    if not DIST_DIR.exists():
        return "Frontend not built. Run `npm run build` in /frontend, or use the Vite dev server.", 404
    target = DIST_DIR / path
    if path and target.is_file():
        return send_from_directory(DIST_DIR, path)
    return send_from_directory(DIST_DIR, "index.html")


init_db()

if __name__ == "__main__":
    app.run(debug=True, port=int(os.environ.get("PORT", 5000)))
