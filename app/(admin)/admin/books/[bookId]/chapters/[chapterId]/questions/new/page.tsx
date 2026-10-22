'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, HelpCircle, Plus, Trash2 } from 'lucide-react';

interface PageProps {
  params: Promise<{ bookId: string; chapterId: string }>;
}

export default function NewQuestionPage({ params }: PageProps) {
  const [questionType, setQuestionType] = useState<'MCQ' | 'CQ'>('MCQ');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <div>
        <Link
          href="/admin/books"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Chapter
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Add New Question (CQ / MCQ)</h2>
              <p className="text-sm text-slate-500">Insert board questions linked with this chapter.</p>
            </div>
          </div>

          {/* Type Toggle */}
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setQuestionType('MCQ')}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                questionType === 'MCQ' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              MCQ Question
            </button>
            <button
              type="button"
              onClick={() => setQuestionType('CQ')}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                questionType === 'CQ' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              CQ (Creative)
            </button>
          </div>
        </div>

        <form className="space-y-6">
          {/* Board & Year History Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Board Name
              </label>
              <select
                name="board_name"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-sm bg-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Dhaka">Dhaka Board</option>
                <option value="Comilla">Comilla Board</option>
                <option value="Rajshahi">Rajshahi Board</option>
                <option value="Jessore">Jessore Board</option>
                <option value="Sylhet">Sylhet Board</option>
                <option value="Barisal">Barisal Board</option>
                <option value="Chittagong">Chittagong Board</option>
                <option value="Dinajpur">Dinajpur Board</option>
                <option value="Mymensingh">Mymensingh Board</option>
                <option value="All">All Boards Combined</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Exam Year
              </label>
              <input
                type="number"
                name="year"
                placeholder="e.g. 2025"
                defaultValue={2025}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-sm bg-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Importance / Marks
              </label>
              <input
                type="text"
                name="tags"
                placeholder="e.g. Very Important, Top 5*"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-sm bg-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* MCQ Specific Form Section */}
          {questionType === 'MCQ' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  MCQ Stem / Question Body (Markdown / Math supported)
                </label>
                <textarea
                  name="mcq_stem"
                  rows={3}
                  placeholder="প্রশ্নটি এখানে লিখুন..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Option (ক)</label>
                  <input type="text" placeholder="অপশন ক" className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Option (খ)</label>
                  <input type="text" placeholder="অপশন খ" className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Option (গ)</label>
                  <input type="text" placeholder="অপশন গ" className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Option (ঘ)</label>
                  <input type="text" placeholder="অপশন ঘ" className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Correct Answer</label>
                  <select className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm bg-white">
                    <option value="A">ক (A)</option>
                    <option value="B">খ (B)</option>
                    <option value="C">গ (C)</option>
                    <option value="D">ঘ (D)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Explanation / Solution Note</label>
                  <input type="text" placeholder="সঠিক উত্তরের ব্যাখ্যা..." className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm" />
                </div>
              </div>
            </div>
          )}

          {/* CQ Specific Form Section */}
          {questionType === 'CQ' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Stimulus / উদ্দীপক (উদ্বীপকটি এখানে Markdown ফরম্যাটে লিখুন)
                </label>
                <textarea
                  name="cq_stimulus"
                  rows={5}
                  placeholder="উদ্দীপক: রহিম সাহেব ১০ কেজি ভরের একটি বস্তুকে..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm font-mono focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* CQ Parts (क, খ, গ, ঘ) */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold text-slate-800">Creative Questions Parts (ক, খ, গ, ঘ)</h3>
                
                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-indigo-600 text-sm">ক) জ্ঞানমূলক (১):</span>
                    <input type="text" placeholder="প্রশ্ন..." className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-sm bg-white" />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-indigo-600 text-sm">খ) অনুধাবন (২):</span>
                    <input type="text" placeholder="প্রশ্ন..." className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-sm bg-white" />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-indigo-600 text-sm">গ) প্রয়োগ (৩):</span>
                    <input type="text" placeholder="প্রশ্ন..." className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-sm bg-white" />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-indigo-600 text-sm">ঘ) উচ্চতর দক্ষতা (৪):</span>
                    <input type="text" placeholder="প্রশ্ন..." className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-sm bg-white" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Submit Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" />
              Save Question to Database
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
