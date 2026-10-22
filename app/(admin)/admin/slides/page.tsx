import Link from 'next/link';
import { FileText, Plus, Search, MonitorPlay, Edit, BookOpen, Layers } from 'lucide-react';

// ডামি ডেটা (পরে ডাটাবেस থেকে স্লাইডযুক্ত নোডগুলো ফেচ করে নেবেন)
async function fetchSlidesList() {
  return [
    {
      id: 'node-1',
      title: '১.১ মাত্রা ও সমীকরণ (Dimensions & Equations)',
      chapter: 'অধ্যায় ১: ভৌত রাশি ও পরিমাপ',
      book: 'পদার্থবিজ্ঞান প্রথম পত্র',
      total_slides: 6,
      updated_at: '2026-10-21',
    },
    {
      id: 'node-2',
      title: '২.১ ভেক্টরের যোগ ও বিয়োগ (Vector Addition)',
      chapter: 'অধ্যায় ২: ভেক্টর',
      book: 'পদার্থবিজ্ঞান প্রথম পত্র',
      total_slides: 8,
      updated_at: '2026-10-20',
    },
  ];
}

export default async function AdminSlidesPage() {
  const slidesList = await fetchSlidesList();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Slide View Management (Smart Teaching Mode)</h2>
          <p className="text-slate-500 text-sm mt-1">
            Manage presentation slides for smart board teaching and student revision.
          </p>
        </div>
        <Link
          href="/admin/slides/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors text-sm shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Create New Slide Deck
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search slides by topic name..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Total Slide Decks: <span className="font-bold text-slate-800">{slidesList.length}</span>
        </div>
      </div>

      {/* Slides Table / Grid */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs font-semibold uppercase tracking-wider">
                <th className="p-4">Topic / Slide Deck Title</th>
                <th className="p-4">Book & Chapter</th>
                <th className="p-4">Total Slides</th>
                <th className="p-4">Last Updated</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {slidesList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 font-medium text-slate-900 flex items-center gap-2.5">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                      <FileText className="w-4 h-4" />
                    </div>
                    {item.title}
                  </td>
                  <td className="p-4">
                    <div className="text-xs font-semibold text-slate-800">{item.book}</div>
                    <div className="text-xs text-slate-500">{item.chapter}</div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                      {item.total_slides} Slides
                    </span>
                  </td>
                  <td className="p-4 text-xs text-slate-500 font-mono">
                    {item.updated_at}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {/* Public Slide View Link */}
                    <Link
                      href={`/book/slides/${item.id}`}
                      target="_blank"
                      title="Preview Slide View"
                      className="inline-flex p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                    >
                      <MonitorPlay className="w-4 h-4" />
                    </Link>
                    {/* Edit Slide JSON Link */}
                    <Link
                      href={`/admin/slides/${item.id}/edit`}
                      title="Edit Slides"
                      className="inline-flex p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}