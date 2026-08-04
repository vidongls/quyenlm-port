ALTER TABLE projects ADD COLUMN detail_draft_json TEXT NOT NULL DEFAULT '{}';
ALTER TABLE projects ADD COLUMN detail_published_json TEXT NOT NULL DEFAULT '{}';

UPDATE projects
SET
  detail_draft_json = COALESCE(
    (SELECT draft_json FROM page_documents WHERE key = 'fintech-detail'),
    '{}'
  ),
  detail_published_json = COALESCE(
    (SELECT published_json FROM page_documents WHERE key = 'fintech-detail'),
    '{}'
  )
WHERE id = 'fintech-hub';

UPDATE projects
SET
  detail_draft_json = COALESCE(
    (SELECT draft_json FROM page_documents WHERE key = 'hanoi-transit-detail'),
    '{}'
  ),
  detail_published_json = COALESCE(
    (SELECT published_json FROM page_documents WHERE key = 'hanoi-transit-detail'),
    '{}'
  )
WHERE id = 'hanoi-transit';

UPDATE projects
SET
  detail_draft_json = COALESCE(
    (SELECT draft_json FROM page_documents WHERE key = 'medsync-detail'),
    '{}'
  ),
  detail_published_json = COALESCE(
    (SELECT published_json FROM page_documents WHERE key = 'medsync-detail'),
    '{}'
  )
WHERE id = 'medsync';
