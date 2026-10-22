
ALTER TABLE public.books
  ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS subject_code TEXT,
  ADD COLUMN IF NOT EXISTS paper TEXT, -- e.g., '1st', '2nd', or NULL
  ADD COLUMN IF NOT EXISTS group_stream TEXT NOT NULL DEFAULT 'common'
    CHECK (group_stream IN ('common', 'science', 'commerce', 'arts')),
  ADD COLUMN IF NOT EXISTS curriculum_version TEXT DEFAULT 'NCTB',
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS sort_order INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS exam_config JSONB DEFAULT '{"total_mcq": 25, "mcq_time_min": 25}'::jsonb;

-- দ্রুত slug এবং class_level দিয়ে বই খোঁজার জন্য Index
CREATE INDEX IF NOT EXISTS idx_books_slug ON public.books(slug);
CREATE INDEX IF NOT EXISTS idx_books_class_group ON public.books(class_level, group_stream, sort_order);