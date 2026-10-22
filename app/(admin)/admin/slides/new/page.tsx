"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Monitor, Plus, Trash2 } from "lucide-react";

export default function GlobalNewSlidePage() {
  const [slides, setSlides] = useState([
    { id: 1, title: "", content: "", formula: "" },
  ]);

  const addSlideItem = () => {
    setSlides([
      ...slides,
      { id: slides.length + 1, title: "", content: "", formula: "" },
    ]);
  };

  const removeSlideItem = (index: number) => {
    setSlides(slides.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <Link
          href="/admin/slides"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Slides Dashboard
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg">
            <Monitor className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Create New Slide Deck
            </h2>
            <p className="text-sm text-slate-500">
              Add presentation slides globally and link them to any chapter.
            </p>
          </div>
        </div>

        <form className="space-y-6">
          {/* Book & Chapter Mapping */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Select Book
              </label>
              <select className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-indigo-500">
                <option value="">-- Choose Book --</option>
                <option value="1">পদার্থবিজ্ঞান প্রথম পত্র</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Select Chapter / Topic
              </label>
              <select className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-indigo-500">
                <option value="">-- Choose Chapter --</option>
                <option value="1">অধ্যায় ১: ভৌত রাশি ও পরিমাপ</option>
              </select>
            </div>
          </div>

          {/* Dynamic Slides Repeater (Not too heavy, clean layout) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">Slide Cards</h3>
              <button
                type="button"
                onClick={addSlideItem}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-medium text-xs hover:bg-indigo-100"
              >
                <Plus className="w-3.5 h-3.5" /> Add Slide
              </button>
            </div>

            {slides.map((s, idx) => (
              <div
                key={s.id}
                className="p-4 rounded-xl border border-slate-200 bg-white space-y-3 relative shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600">
                    Slide #{idx + 1}
                  </span>
                  {slides.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSlideItem(idx)}
                      className="text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="স্লাইডের ছোট শিরোনাম (যেমন: মূল সংজ্ঞা)..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500"
                />
                <textarea
                  rows={2}
                  placeholder="স্লাইডের মূল টেক্সট বা সংক্ষিপ্ত পয়েন্ট..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 shadow-sm"
            >
              <Save className="w-4 h-4" />
              Save Slide Deck
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
