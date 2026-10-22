import { Suspense } from "react";
import Link from "next/link";
import { BookOpen, Plus, Layers, FileText, ChevronRight } from "lucide-react";
// ধরে নিচ্ছি আপনার ডাটাবেস ক্লায়েন্ট বা কুয়েরি ফাংশন এখানে আছে
// import { getBooksWithChapters } from '@/lib/db-queries';

// ডামি ডেটা (ডাটাবেস কানেকশন সেটআপ করার পর কুয়েরি দিয়ে রিপ্লেস করে নেবেন)
async function fetchBooksData() {
  // Simulate DB fetch
  return [
    {
      id: "1",
      title: "পদার্থবিজ্ঞান প্রথম পত্র (Physics 1st Paper)",
      class_name: "Class XI-XII",
      code: "PH-101",
      chapters_count: 10,
      updated_at: "2026-10-20",
    },
    {
      id: "2",
      title: "উচ্চতর গণিত প্রথম পত্র (Higher Math 1st Paper)",
      class_name: "Class XI-XII",
      code: "HM-101",
      chapters_count: 8,
      updated_at: "2026-10-18",
    },
  ];
}

export default async function AdminBooksPage() {
  const books = await fetchBooksData();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Books & Chapters Management
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Manage your textbooks, chapters, and hierarchical content nodes.
          </p>
        </div>
        <Link
          href="/admin/books/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors text-sm shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add New Book
        </Link>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                  {book.class_name}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mt-4">
                {book.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Code: {book.code}
              </p>

              <div className="mt-6 flex items-center gap-6 text-sm text-slate-600 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-500" />
                  <span>{book.chapters_count} Chapters</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-500" />
                  <span>Active Engine</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Updated: {book.updated_at}
              </span>
              <Link
                href={`/admin/books/${book.id}`}
                className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Manage Chapters
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
