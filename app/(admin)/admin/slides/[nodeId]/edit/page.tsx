"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Palette,
  User,
  Monitor,
  Sparkles,
  Type,
  Clock,
} from "lucide-react";

export default function EditSlideDeckPage() {
  // State for teacher branding, theme, and presentation settings
  const [teacherName, setTeacherName] = useState("Anwer Jahid");
  const [teacherTitle, setTeacherTitle] = useState(
    "Senior Lecturer & Developer",
  );
  const [themeColor, setThemeColor] = useState("bg-slate-950 text-slate-100");
  const [fontSize, setFontSize] = useState("text-lg");
  const [showTimer, setShowTimer] = useState(true);

  // State for slides content
  const [slides, setSlides] = useState([
    {
      id: 1,
      title: "ভৌত রাশি ও পরিমাপের ভূমিকা",
      content:
        "পদার্থবিজ্ঞানের ভিত্তি হলো পরিমাপ। যে সমস্ত রাশি পরিমাপ করা যায়, তাদের ভৌত রাশি বলে।",
      formula: "Quantity = Numerical Value × Unit",
    },
  ]);

  const addSlide = () => {
    setSlides([
      ...slides,
      { id: slides.length + 1, title: "", content: "", formula: "" },
    ]);
  };

  const removeSlide = (index: number) => {
    const updated = slides.filter((_, i) => i !== index);
    setSlides(updated);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Back Button */}
      <div>
        <Link
          href="/admin/slides"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Slides Management
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Advanced Slide Deck Editor
            </h2>
            <p className="text-sm text-slate-500">
              Configure instructor branding, display themes, and smart board
              options.
            </p>
          </div>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
            <Sparkles className="w-3.5 h-3.5" /> Pro Mode
          </span>
        </div>

        <form className="space-y-8">
          {/* SECTION 1: Teacher Branding & Customization */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-600" />
              Instructor Branding & Identity
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Instructor / Teacher Name
                </label>
                <input
                  type="text"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  placeholder="e.g. Anwer Jahid"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Designation / Subtitle
                </label>
                <input
                  type="text"
                  value={teacherTitle}
                  onChange={(e) => setTeacherTitle(e.target.value)}
                  placeholder="e.g. Physics Instructor"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Smart Board Theme & Display Settings */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Palette className="w-4 h-4 text-indigo-600" />
              Smart Board Appearance & Utilities
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Background Theme Selector */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Background Theme
                </label>
                <select
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="bg-slate-950 text-slate-100">
                    Midnight Dark (Deep Slate)
                  </option>
                  <option value="bg-zinc-900 text-zinc-100">
                    Modern Dark (Zinc)
                  </option>
                  <option value="bg-blue-950 text-blue-100">
                    Ocean Night (Deep Blue)
                  </option>
                  <option value="bg-slate-50 text-slate-900">
                    Clean Light Mode
                  </option>
                </select>
              </div>

              {/* Font Size Scaling */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Font Scale (Board View)
                </label>
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="text-base">Normal (16px)</option>
                  <option value="text-lg">Large (18px)</option>
                  <option value="text-xl">
                    Extra Large (20px - Smart Board)
                  </option>
                </select>
              </div>

              {/* Stopwatch Toggle */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Class Timer Tool
                </label>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    id="timerToggle"
                    checked={showTimer}
                    onChange={(e) => setShowTimer(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="timerToggle"
                    className="text-xs text-slate-700 font-medium"
                  >
                    Show Classroom Timer
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: Slide Deck Content Builder */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Monitor className="w-4 h-4 text-indigo-600" />
                Slide Cards ({slides.length})
              </h3>
              <button
                type="button"
                onClick={addSlide}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-medium text-xs hover:bg-indigo-100 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add New Slide
              </button>
            </div>

            <div className="space-y-4">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-indigo-600 uppercase">
                      Slide #{index + 1}
                    </span>
                    {slides.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSlide(index)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Slide Title
                    </label>
                    <input
                      type="text"
                      defaultValue={slide.title}
                      placeholder="স্লাইডের শিরোনাম..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Slide Content / Description
                    </label>
                    <textarea
                      rows={2}
                      defaultValue={slide.content}
                      placeholder="मुख्य বিবরণ..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Formula / Highlight Box (Optional)
                    </label>
                    <input
                      type="text"
                      defaultValue={slide.formula}
                      placeholder="e.g. F = ma"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-mono bg-slate-50 focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Link
              href="/admin/slides"
              className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" />
              Save Presentation Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
