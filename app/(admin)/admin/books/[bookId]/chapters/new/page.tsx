import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

interface PageProps {
  params: Promise<{ bookId: string }>;
}

export default async function NewChapterPage({ params }: PageProps) {
  const { bookId } = await params;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <Link
          href={`/admin/books/${bookId}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Chapters
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 mb-1">Add New Chapter</h2>
        <p className="text-sm text-slate-500 mb-6">
          Create a new chapter inside this textbook.
        </p>

        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Chapter Number
              </label>
              <input
                type="number"
                name="chapter_no"
                placeholder="e.g. 1"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Chapter Title (Bangla/English)
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g. ভৌত রাশি ও পরিমাপ"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Chapter Summary / Description (Optional)
            </label>
            <textarea
              name="summary"
              rows={3}
              placeholder="Short description of what this chapter covers..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <Link
              href={`/admin/books/${bookId}`}
              className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" />
              Save Chapter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}