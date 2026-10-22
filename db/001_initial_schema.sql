-- =========================================
-- 1. BOOKS TABLE
-- =========================================
CREATE TABLE public.books (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  class_level TEXT NOT NULL,
  cover_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================================
-- 2. CHAPTERS TABLE
-- =========================================
CREATE TABLE public.chapters (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  book_id BIGINT NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
  serial TEXT NOT NULL,
  title TEXT NOT NULL,
  overview_summary TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (book_id, serial),
  UNIQUE (id, book_id)
);

-- =========================================
-- 3. CONTENT NODES (Topics & Subtopics)
-- =========================================
CREATE TABLE public.content_nodes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  chapter_id BIGINT NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
  parent_id BIGINT,
  serial TEXT NOT NULL,
  title TEXT NOT NULL,
  node_type TEXT NOT NULL DEFAULT 'topic'
    CHECK (node_type IN ('topic', 'subtopic')),
  importance TEXT NOT NULL DEFAULT 'medium'
    CHECK (importance IN ('high', 'medium', 'low')),
  content TEXT,
  content_format TEXT NOT NULL DEFAULT 'markdown'
    CHECK (content_format IN ('markdown', 'html', 'plain')),
  slides_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (chapter_id, serial),
  
  -- 💡 এই লাইনটি না থাকার কারণেই এররটি এসেছিল:
  UNIQUE (id, chapter_id),

  FOREIGN KEY (parent_id, chapter_id)
    REFERENCES public.content_nodes(id, chapter_id)
    ON DELETE CASCADE,

  CHECK (parent_id IS NULL OR parent_id <> id),
  CHECK (
    (parent_id IS NULL AND node_type = 'topic')
    OR
    (parent_id IS NOT NULL AND node_type = 'subtopic')
  )
);

-- =========================================
-- 4. PERFORMANCE INDEXES
-- =========================================
CREATE INDEX idx_chapters_book_order ON public.chapters(book_id, sort_order);
CREATE INDEX idx_nodes_chapter_order ON public.content_nodes(chapter_id, sort_order);
CREATE INDEX idx_nodes_parent ON public.content_nodes(parent_id);