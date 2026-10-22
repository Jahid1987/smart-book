import Link from 'next/link';
import { HelpCircle, Plus, Search, Filter, Edit, Trash2, BookOpen } from 'lucide-react';

// ডামি ডেটা (পরে Supabase থেকে সমস্ত প্রশ্ন ফেচ করে নেবেন)
async function fetchAllQuestions() {
  return [
    {
      id: 'q-1',
      type: 'MCQ',
      stem: 'নিচের কোনটি ভেক্টর রাশি?',
      chapter: 'অধ্যায় ২: ভেক্টর',
      board: 'ঢাকা বোর্ড - ২০২৫',
      answer: 'ক (বেগ)',
    },
    {
      id: 'q-2',
      type: 'CQ',
      stem: 'উদ্দীপক: ১০ কেজি ভরের একটি বস্তু ২০ মিটার উচ্চতা থেকে ফেলে দেওয়া হলো...',
      chapter: 'অধ্যায় ৪: কাজ, শক্তি ও ক্ষমতা',
      board: 'কুমিল্লা বোর্ড - ২০২৪',
      answer: 'ক, খ, গ, ঘ (সম্পূর্ণ সৃজনশীল)',
    },
  ];
}

export default async function AdminQuestionsPage() {
  const questions = await fetchAllQuestions();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Global Question Bank</h2>
          <p className="text-slate-500 text-sm mt-1">
            Manage all CQ and MCQ questions across all books and chapters.
          </p>
        </div>
        <Link
          href="/admin/questions/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors text-sm shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add New Question
        </Link>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search questions by text or keyword..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select className="px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white text-slate-700 focus:ring-2 focus:ring-indigo-500">
            <option value="">All Types (CQ / MCQ)</option>
            <option value="MCQ">MCQ Only</option>
            <option value="CQ">CQ Only</option>
          </select>
          <select className="px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white text-slate-700 focus:ring-2 focus:ring-indigo-500">
            <option value="">All Boards</option>
            <option value="Dhaka">Dhaka Board</option>
            <option value="Comilla">Comilla Board</option>
          </select>
        </div>
      </div>

      {/* Questions Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs font-semibold uppercase tracking-wider">
                <th className="p-4">Type</th>
                <th className="p-4">Question Stem / Title</th>
                <th className="p-4">Chapter / Context</th>
                <th className="p-4">Board & Year</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {questions.map((q) => (
                <tr key={q.id} className="hover:bg-slate-50/70 transition-colors">
                  <p className="hidden">{q.answer}</p>
                  <td className="p-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-md text-xs font-bold ${
                        q.type === 'MCQ'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-200/60'
                      }`}
                    >
                      {q.type}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-slate-900 max-w-md truncate">
                    {q.stem}
                  </td>
                  <td className="p-4 text-slate-600 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-slate-400" />
                    {q.chapter}
                  </td>
                  <td className="p-4">
                    <span className="text-xs px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-medium">
                      {q.board}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <Link
                      href={`/admin/questions/${q.id}/edit`}
                      className="inline-flex p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      type="button"
                      className="inline-flex p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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