CREATE TABLE IF NOT EXISTS page_documents (
  key TEXT PRIMARY KEY,
  draft_json TEXT NOT NULL,
  published_json TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  published_at TEXT
);

INSERT OR IGNORE INTO page_documents (key, draft_json, published_json, published_at)
VALUES
  ('about', '{}', '{}', CURRENT_TIMESTAMP),
  ('fintech-detail', '{}', '{}', CURRENT_TIMESTAMP);
