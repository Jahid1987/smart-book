-- =========================================================
-- 4. QUESTIONS MASTER TABLE (MCQ ও CQ উভয়ের মূল টেবিল)
-- =========================================================
CREATE TABLE public.questions (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  
  -- কোন বই, অধ্যায় এবং টপিকের অধীনে প্রশ্নটি রয়েছে
  book_id BIGINT NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
  chapter_id BIGINT NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
  topic_id BIGINT NOT NULL REFERENCES public.content_nodes(id) ON DELETE CASCADE,
  
  -- প্রশ্নের ধরন ও কঠিনতার স্তর
  q_type TEXT NOT NULL CHECK (q_type IN ('MCQ', 'CQ')),
  difficulty TEXT NOT NULL DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  
  -- মূল প্রশ্ন বা সৃজনশীলের উদ্দীপক (Stem Text)
  stem_text TEXT NOT NULL,
  stem_image_url TEXT, -- উদ্দীপকে কোনো ছবি বা চিত্র থাকলে তার লিংক
  
  -- ---------------------------------------------------------
  -- MCQ SPECIFIC FIELDS (যদি q_type = 'MCQ' হয়)
  -- ---------------------------------------------------------
  mcq_subtype TEXT CHECK (mcq_subtype IN ('simple', 'multiple_completion', 'situation_set')), 
  -- ('simple' = সাধারণ, 'multiple_completion' = বহুপদী সমাপ্তি সূচক i, ii, iii, 'situation_set' = অভিন্ন তথ্যভিত্তিক)
  
  -- বহুপদী প্রশ্নের জন্য রোমান হরফের তিনটি বিবৃতি (যদি থাকে)
  statement_i TEXT,
  statement_ii TEXT,
  statement_iii TEXT,
  
  -- MCQ অপশনসমূহ (ক, খ, গ, ঘ)
  option_a TEXT,
  option_b TEXT,
  option_c TEXT,
  option_d TEXT,
  
  -- সঠিক উত্তর ('a', 'b', 'c', অথবা 'd')
  correct_option CHAR(1) CHECK (correct_option IN ('a', 'b', 'c', 'd')),
  
  -- উত্তর কেন সঠিক তার বিস্তারিত ব্যাখ্যা (Explanation)
  explanation TEXT,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- =========================================================
-- 5. CQ (CREATIVE QUESTION) PARTS TABLE
-- =========================================================
-- যদি q_type = 'CQ' হয়, তবে সৃজনশীলের ক, খ, গ, ঘ এর জন্য এই টেবিল ব্যবহৃত হবে।
-- আলাদা টেবিলে রাখার ফলে MCQ কুয়েরি করার সময় অপ্রয়োজনীয় ডাটা লোড হয় না (Performance Optimised)।
CREATE TABLE public.cq_parts (
  question_id BIGINT PRIMARY KEY REFERENCES public.questions(id) ON DELETE CASCADE,
  
  q_ka TEXT NOT NULL,   -- জ্ঞানমূলক (১ নম্বর)
  ans_ka TEXT,          -- ক-এর উত্তর বা ব্যাখ্যা
  
  q_kha TEXT NOT NULL,  -- অনুধাবনমূলক (২ নম্বর)
  ans_kha TEXT,         -- খ-এর উত্তর বা ব্যাখ্যা
  
  q_ga TEXT NOT NULL,   -- প্রয়োগমূলক (৩ নম্বর)
  ans_ga TEXT,          -- গ-এর উত্তর বা ব্যাখ্যা
  
  q_gha TEXT NOT NULL,  -- উচ্চতর দক্ষতা (৪ নম্বর)
  ans_gha TEXT          -- ঘ-এর উত্তর বা ব্যাখ্যা
);


-- =========================================================
-- 6. QUESTION BOARD HISTORY (বোর্ড ও সালের ইতিহাস)
-- =========================================================
-- একটি প্রশ্ন কোন কোন বোর্ডে এবং কত সালে এসেছে তা ট্র্যাক করার জন্য (Feature 1 & 2 এর মূল ভিত্তি)
CREATE TABLE public.question_board_history (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  question_id BIGINT NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  
  board_name TEXT NOT NULL, -- যেমন: 'Dhaka', 'Rajshahi', 'Comilla', 'All Boards'
  exam_year SMALLINT NOT NULL, -- যেমন: 2025, 2024, 2023
  
  -- একই প্রশ্ন একই বোর্ডে একই সালে দুইবার এন্ট্রি হবে না
  UNIQUE (question_id, board_name, exam_year)
);


-- =========================================================
-- 7. PERFORMANCE INDEXES (সুপার-ফাস্ট কুয়েরি এবং অ্যানালিটিক্সের জন্য)
-- =========================================================

-- ১. নির্দিষ্ট টপিক বা অধ্যায়ের ওপর ভিত্তি করে দ্রুত MCQ বা CQ ফিল্টার করার জন্য
CREATE INDEX idx_questions_lookup 
  ON public.questions(topic_id, q_type, difficulty);

CREATE INDEX idx_questions_chapter 
  ON public.questions(chapter_id, q_type);

-- ২. বোর্ড ও সাল ধরে প্রশ্ন খোঁজার জন্য (যেমন: "ঢাকা বোর্ড ২০২৪ এর সব প্রশ্ন")
CREATE INDEX idx_board_history_lookup 
  ON public.question_board_history(board_name, exam_year);