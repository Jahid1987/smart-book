// src/app/admin/page.tsx
import { sql } from "@/lib/db_connection";
import { Suspense } from "react";
import { createBook, createChapter, createContentNode } from "@/features/books/actions";


async function AdminFormsContainer() {
  // ড্রপডাউনে দেখানোর জন্য বিদ্যমান বই, অধ্যায় এবং মেইন টপিকগুলো আনা হচ্ছে
  const books = await sql`SELECT id, title, class_level FROM public.books ORDER BY id DESC`;
  
  const chapters = await sql`
    SELECT c.id, c.serial, c.title, b.title as book_title 
    FROM public.chapters c
    JOIN public.books b ON c.book_id = b.id
    ORDER BY c.book_id, c.sort_order ASC
  `;

  // শুধুমাত্র Main Topics (যাদের parent_id IS NULL) আনা হচ্ছে সাব-টপিকের প্যারেন্ট হিসেবে সিলেক্ট করার জন্য
  const mainTopics = await sql`
    SELECT id, chapter_id, serial, title 
    FROM public.content_nodes 
    WHERE node_type = 'topic' 
    ORDER BY chapter_id, sort_order ASC
  `;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* ==========================================
          ফর্ম ১: নতুন বই (Book) যুক্ত করুন
      ========================================== */}
      <form action={createBook} className="bg-white p-6 rounded-xl border shadow-sm space-y-4 h-fit">
        <h2 className="text-lg font-bold text-blue-700 border-b pb-2">১. নতুন বই যোগ করুন</h2>
        
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">বইয়ের নাম (title) *</label>
          <input name="title" required placeholder="তথ্য ও যোগাযোগ প্রযুক্তি" className="w-full border rounded px-3 py-2 text-sm" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">URL Slug *</label>
            <input name="slug" required placeholder="hsc-ict" className="w-full border rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">বিষয় কোড (ঐচ্ছিক)</label>
            <input name="subject_code" placeholder="275" className="w-full border rounded px-3 py-2 text-sm" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">বিষয় (subject) *</label>
            <input name="subject" required placeholder="ICT" className="w-full border rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">শ্রেণি (class_level) *</label>
            <select name="class_level" className="w-full border rounded px-3 py-2 text-sm bg-white">
              <option value="HSC">HSC</option>
              <option value="SSC">SSC</option>
              <option value="Class 6-8">Class 6-8</option>
            </select>
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-medium text-sm hover:bg-blue-700">
          + বই সেভ করুন
        </button>
      </form>

      {/* ==========================================
          ফর্ম ২: নতুন অধ্যায় (Chapter) যুক্ত করুন
      ========================================== */}
      <form action={createChapter} className="bg-white p-6 rounded-xl border shadow-sm space-y-4 h-fit">
        <h2 className="text-lg font-bold text-teal-700 border-b pb-2">২. অধ্যায় যোগ করুন</h2>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">বই সিলেক্ট করুন (book_id) *</label>
          <select name="book_id" required className="w-full border rounded px-3 py-2 text-sm bg-white">
            {books.map((b) => (
              <option key={b.id} value={b.id}>{b.title} ({b.class_level})</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">অধ্যায় নং *</label>
            <input name="serial" required placeholder="১" className="w-full border rounded px-3 py-2 text-sm" />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-600 mb-1">URL Slug *</label>
            <input name="slug" required placeholder="chapter-1" className="w-full border rounded px-3 py-2 text-sm" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">অধ্যায়ের নাম (title) *</label>
          <input name="title" required placeholder="বিশ্ব ও বাংলাদেশ প্রেক্ষিত" className="w-full border rounded px-3 py-2 text-sm" />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">সাজানোর ক্রম (sort_order - ইংরেজি সংখ্যা)</label>
          <input name="sort_order" type="number" defaultValue={chapters.length + 1} className="w-full border rounded px-3 py-2 text-sm" />
        </div>

        <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded font-medium text-sm hover:bg-teal-700">
          + অধ্যায় সেভ করুন
        </button>
      </form>

      {/* ==========================================
          ফর্ম ৩: টপিক বা সাব-টপিক (Content Node) যুক্ত করুন
      ========================================== */}
      <form action={createContentNode} className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-amber-700 border-b pb-2">৩. টপিক / সাব-টপিক যোগ করুন</h2>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">অধ্যায় সিলেক্ট করুন (chapter_id) *</label>
          <select name="chapter_id" required className="w-full border rounded px-3 py-2 text-sm bg-white">
            {chapters.map((c) => (
              <option key={c.id} value={c.id}>অধ্যায় {c.serial}: {c.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            প্যারেন্ট টপিক (মেইন টপিক বানাতে এটি খালি রাখুন)
          </label>
          <select name="parent_id" className="w-full border rounded px-3 py-2 text-sm bg-amber-50/50">
            <option value="">-- এটি একটি মেইন টপিক (parent_id = NULL) --</option>
            {mainTopics.map((t) => (
              <option key={t.id} value={t.id}>
                [Subtopic এর জন্য সিলেক্ট করুন] ↳ {t.serial} {t.title}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">অনুচ্ছেদ নং *</label>
            <input name="serial" required placeholder="1.1 বা 1.1.1" className="w-full border rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">গুরুত্ব *</label>
            <select name="importance" className="w-full border rounded px-3 py-2 text-sm bg-white">
              <option value="high">High 🔥</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">ক্রম (Order)</label>
            <input name="sort_order" type="number" defaultValue={1} className="w-full border rounded px-3 py-2 text-sm" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">টপিকের শিরোনাম (title) *</label>
          <input name="title" required placeholder="ভার্চুয়াল রিয়েলিটি" className="w-full border rounded px-3 py-2 text-sm" />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">মূল পড়া (Markdown Content)</label>
          <textarea
            name="content"
            rows={5}
            placeholder="# শিরোনাম&#10;এখানে বইয়ের বিস্তারিত পড়া লিখুন..."
            className="w-full border rounded px-3 py-2 text-sm font-mono"
          />
        </div>

        <button type="submit" className="w-full bg-amber-600 text-white py-2 rounded font-medium text-sm hover:bg-amber-700">
          + টপিক / সাব-টপিক সেভ করুন
        </button>
      </form>

    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        ⚙️ Smart Book Content Studio (Admin Panel)
      </h1>
      <Suspense fallback={<div className="p-8 text-gray-500">অ্যাডমিন প্যানেল লোড হচ্ছে...</div>}>
        <AdminFormsContainer />
      </Suspense>
    </div>
  );
}