
-- =========================================================
-- 1. ENHANCE QUESTIONS MASTER TABLE
-- =========================================================
ALTER TABLE public.questions
  -- নির্দিষ্ট সাব-টপিক ট্র্যাক করার জন্য (Optional, কারণ অনেক প্রশ্ন সরাসরি মেইন টপিকেও হতে পারে)
  ADD COLUMN IF NOT EXISTS subtopic_id BIGINT REFERENCES public.content_nodes(id) ON DELETE SET NULL,
  
  -- NCTB Bloom's Taxonomy Level (জ্ঞান, অনুধাবন, প্রয়োগ, উচ্চতর দক্ষতা)
  ADD COLUMN IF NOT EXISTS bloom_level TEXT DEFAULT 'knowledge'
    CHECK (bloom_level IN ('knowledge', 'comprehension', 'application', 'higher_order')),
  
  -- Quiz & Tug-of-War Game Settings (Feature 3)
  ADD COLUMN IF NOT EXISTS time_limit_sec INTEGER NOT NULL DEFAULT 30,
  ADD COLUMN IF NOT EXISTS points INTEGER NOT NULL DEFAULT 10,
  
  -- Student Help & Multimedia Explanations
  ADD COLUMN IF NOT EXISTS hint_text TEXT,
  ADD COLUMN IF NOT EXISTS solution_video_url TEXT,
  ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
  
  -- Global Analytics (কতজন পেরেছে তার লাইভ হিসাব)
  ADD COLUMN IF NOT EXISTS attempt_count INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS correct_count INTEGER NOT NULL DEFAULT 0,
  
  -- Publishing Control
  ADD COLUMN IF NOT EXISTS is_published BOOLEAN NOT NULL DEFAULT TRUE;


-- =========================================================
-- 2. ENHANCE CQ_PARTS (সৃজনশীল প্রশ্ন) TABLE
-- =========================================================
ALTER TABLE public.cq_parts
  -- সৃজনশীলের গ এবং ঘ যদি ভিন্ন ভিন্ন টপিক থেকে আসে তা ট্র্যাক করার জন্য
  ADD COLUMN IF NOT EXISTS q_ga_topic_id BIGINT REFERENCES public.content_nodes(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS q_gha_topic_id BIGINT REFERENCES public.content_nodes(id) ON DELETE SET NULL,
  
  -- উত্তরের সাথে চিত্র বা গ্রাফ দেখানোর জন্য
  ADD COLUMN IF NOT EXISTS ans_ga_image_url TEXT,
  ADD COLUMN IF NOT EXISTS ans_gha_image_url TEXT,
  
  -- AI বা টিউটর যখন সৃজনশীল খাতা মূল্যায়ন করবে, কোন পয়েন্টগুলো লিখলে পূর্ণ নম্বর পাবে তার রুব্রিক (Rubric)
  ADD COLUMN IF NOT EXISTS marking_rubric_json JSONB DEFAULT '{}'::jsonb;


-- =========================================================
-- 3. ENHANCE QUESTION_BOARD_HISTORY TABLE
-- =========================================================
ALTER TABLE public.question_board_history
  -- বোর্ড প্রশ্ন ছাড়াও ভর্তি পরীক্ষা ও শীর্ষ কলেজের প্রশ্ন রাখার জন্য
  ADD COLUMN IF NOT EXISTS source_type TEXT NOT NULL DEFAULT 'board'
    CHECK (source_type IN ('board', 'admission', 'college_test', 'school_test', 'author_special')),
  
  -- মূল প্রশ্নপত্রে কত নম্বর প্রশ্ন ছিল (যেমন: 'CQ-2' বা 'Set-Ka')
  ADD COLUMN IF NOT EXISTS question_serial TEXT;


-- =========================================================
-- 4. NEW PERFORMANCE INDEXES
-- =========================================================
-- সাব-টপিক দিয়ে দ্রুত প্রশ্ন ফিল্টার করার জন্য
CREATE INDEX IF NOT EXISTS idx_questions_subtopic ON public.questions(subtopic_id);

-- ট্যাগ (যেমন: 'math', 'important') দিয়ে সার্চ করার জন্য GIN Index
CREATE INDEX IF NOT EXISTS idx_questions_tags_gin ON public.questions USING GIN (tags);

-- বোর্ড বনাম অ্যাডমিশন প্রশ্ন দ্রুত আলাদা করার জন্য
CREATE INDEX IF NOT EXISTS idx_history_source_board ON public.question_board_history(source_type, board_name, exam_year);