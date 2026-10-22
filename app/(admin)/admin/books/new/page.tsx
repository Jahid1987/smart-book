import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

export default function NewBookPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Back Button */}
      <div>
        <Link
          href="/admin/books"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Books
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 mb-1">Add New Textbook</h2>
        <p className="text-sm text-slate-500 mb-6">
          Enter the core details of the textbook to initialize its database structure.
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Book Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g. রসায়ন প্রথম পত্র (Chemistry 1st Paper)"
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Class / Level
              </label>
              <input
                type="text"
                name="class_name"
                placeholder="e.g. Class XI-XII"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Subject Code
              </label>
              <input
                type="text"
                name="code"
                placeholder="e.g. CHEM-101"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description / Notes (Optional)
            </label>
            <textarea
              name="description"
              rows={3}
              placeholder="Short overview of the book..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <Link
              href="/admin/books"
              className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" />
              Save Textbook
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}