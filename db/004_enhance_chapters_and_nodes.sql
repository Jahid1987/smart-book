
-- =========================================================
-- 1. ENHANCE CHAPTERS TABLE
-- =========================================================
ALTER TABLE public.chapters
  ADD COLUMN IF NOT EXISTS slug TEXT,
  ADD COLUMN IF NOT EXISTS overview_summary TEXT,
  ADD COLUMN IF NOT EXISTS board_weightage JSONB DEFAULT '{"avg_cq": 1, "avg_mcq": 3, "importance": "medium"}'::jsonb,
  ADD COLUMN IF NOT EXISTS is_published BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS is_free_preview BOOLEAN NOT NULL DEFAULT FALSE;

-- একই বইয়ের ভেতরে যেন দুটি অধ্যায়ের একই slug না হয়
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'chapters_book_id_slug_key'
  ) THEN
    ALTER TABLE public.chapters ADD CONSTRAINT chapters_book_id_slug_key UNIQUE (book_id, slug);
  END IF;
END $$;


-- =========================================================
-- 2. ENHANCE CONTENT_NODES (Topics & Subtopics) TABLE
-- =========================================================
ALTER TABLE public.content_nodes
  ADD COLUMN IF NOT EXISTS slug TEXT,
  ADD COLUMN IF NOT EXISTS importance TEXT NOT NULL DEFAULT 'medium'
    CHECK (importance IN ('high', 'medium', 'low')),
  ADD COLUMN IF NOT EXISTS summary_points JSONB NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS slides_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS recorded_video_url TEXT,
  ADD COLUMN IF NOT EXISTS video_duration_sec INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS estimated_read_min INTEGER DEFAULT 5,
  ADD COLUMN IF NOT EXISTS is_published BOOLEAN NOT NULL DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS is_free BOOLEAN NOT NULL DEFAULT TRUE;

-- একই অধ্যায়ের ভেতরে যেন দুটি টপিকের একই slug না হয়
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'content_nodes_chapter_id_slug_key'
  ) THEN
    ALTER TABLE public.content_nodes ADD CONSTRAINT content_nodes_chapter_id_slug_key UNIQUE (chapter_id, slug);
  END IF;
END $$;


-- =========================================================
-- 3. ADDITIONAL INDEXES FOR FAST ROUTING & FILTERING
-- =========================================================
CREATE INDEX IF NOT EXISTS idx_chapters_slug ON public.chapters(book_id, slug);
CREATE INDEX IF NOT EXISTS idx_nodes_slug ON public.content_nodes(chapter_id, slug);
CREATE INDEX IF NOT EXISTS idx_nodes_importance ON public.content_nodes(chapter_id, importance);