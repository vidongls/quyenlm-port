INSERT OR IGNORE INTO page_documents (key, draft_json, published_json, published_at)
VALUES
  ('hanoi-transit-detail', '{}', '{}', CURRENT_TIMESTAMP),
  ('medsync-detail', '{}', '{}', CURRENT_TIMESTAMP);

UPDATE projects
SET
  draft_json = REPLACE(draft_json, '"detailPath":"/work"', '"detailPath":"/projects/hanoi-transit"'),
  published_json = REPLACE(published_json, '"detailPath":"/work"', '"detailPath":"/projects/hanoi-transit"'),
  updated_at = CURRENT_TIMESTAMP
WHERE id = 'hanoi-transit';

UPDATE projects
SET
  draft_json = REPLACE(draft_json, '"detailPath":"/work"', '"detailPath":"/projects/medsync"'),
  published_json = REPLACE(published_json, '"detailPath":"/work"', '"detailPath":"/projects/medsync"'),
  updated_at = CURRENT_TIMESTAMP
WHERE id = 'medsync';
