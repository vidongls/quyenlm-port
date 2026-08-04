PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  draft_json TEXT NOT NULL,
  published_json TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  published_at TEXT
);

CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  draft_json TEXT NOT NULL,
  published_json TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  sort_order INTEGER NOT NULL DEFAULT 0,
  featured INTEGER NOT NULL DEFAULT 0 CHECK (featured IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  published_at TEXT
);

CREATE INDEX IF NOT EXISTS projects_status_sort_idx
ON projects(status, sort_order);

CREATE TABLE IF NOT EXISTS content_revisions (
  id TEXT PRIMARY KEY,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('site', 'project')),
  entity_id TEXT NOT NULL,
  content_json TEXT NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('draft_saved', 'published', 'restored')),
  actor_email TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS content_revisions_entity_idx
ON content_revisions(entity_type, entity_id, created_at DESC);

CREATE TABLE IF NOT EXISTS media_assets (
  id TEXT PRIMARY KEY,
  object_key TEXT NOT NULL UNIQUE,
  file_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  byte_size INTEGER NOT NULL,
  alt_text TEXT NOT NULL DEFAULT '',
  width INTEGER,
  height INTEGER,
  uploaded_by TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT PRIMARY KEY,
  actor_email TEXT NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  metadata_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO site_settings (key, draft_json, published_json, published_at)
VALUES (
  'global',
  '{"name":"Quyen Le Minh","role":"Product Designer · Research & Interfaces","headline":"Good Design''s","highlight":"Invisible","location":"Ha Noi, Viet Nam","email":"hello@quyenlee.design","linkedinUrl":"https://www.linkedin.com","resumeUrl":"/resume.pdf","seoTitle":"Quyen Le Minh — Product Designer","seoDescription":"Product designer focused on research, interfaces and invisible design."}',
  '{"name":"Quyen Le Minh","role":"Product Designer · Research & Interfaces","headline":"Good Design''s","highlight":"Invisible","location":"Ha Noi, Viet Nam","email":"hello@quyenlee.design","linkedinUrl":"https://www.linkedin.com","resumeUrl":"/resume.pdf","seoTitle":"Quyen Le Minh — Product Designer","seoDescription":"Product designer focused on research, interfaces and invisible design."}',
  CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO projects (
  id, slug, draft_json, published_json, status, sort_order, featured, published_at
)
VALUES
  (
    'fintech-hub',
    'fintech-hub',
    '{"title":"FinTech Hub: Smart Savings","category":"Product Design","summary":"An AI-powered micro-investment platform built specifically for the Gen-Z market in Southeast Asia, simplifying automated savings.","coverUrl":"/assets/home-project.png","detailPath":"/projects/fintech-hub","caseStudyLabel":"CASE STUDY"}',
    '{"title":"FinTech Hub: Smart Savings","category":"Product Design","summary":"An AI-powered micro-investment platform built specifically for the Gen-Z market in Southeast Asia, simplifying automated savings.","coverUrl":"/assets/home-project.png","detailPath":"/projects/fintech-hub","caseStudyLabel":"CASE STUDY"}',
    'published', 0, 1, CURRENT_TIMESTAMP
  ),
  (
    'hanoi-transit',
    'hanoi-transit',
    '{"title":"Hanoi Transit: Route Planner","category":"UX Research & UI","summary":"Restructuring the local city bus routing experience through rigorous field research and a contextual offline-first map interface.","coverUrl":"/assets/about-project.png","detailPath":"/work","caseStudyLabel":"CASE STUDY"}',
    '{"title":"Hanoi Transit: Route Planner","category":"UX Research & UI","summary":"Restructuring the local city bus routing experience through rigorous field research and a contextual offline-first map interface.","coverUrl":"/assets/about-project.png","detailPath":"/work","caseStudyLabel":"CASE STUDY"}',
    'published', 1, 0, CURRENT_TIMESTAMP
  ),
  (
    'medsync',
    'medsync',
    '{"title":"MedSync: Clinic Management","category":"Interface Design","summary":"Designing an invisible, lightweight tablet dashboard for local clinics to schedule and diagnose without screen friction.","coverUrl":"/assets/about-project.png","detailPath":"/work","caseStudyLabel":"CASE STUDY"}',
    '{"title":"MedSync: Clinic Management","category":"Interface Design","summary":"Designing an invisible, lightweight tablet dashboard for local clinics to schedule and diagnose without screen friction.","coverUrl":"/assets/about-project.png","detailPath":"/work","caseStudyLabel":"CASE STUDY"}',
    'published', 2, 0, CURRENT_TIMESTAMP
  );
