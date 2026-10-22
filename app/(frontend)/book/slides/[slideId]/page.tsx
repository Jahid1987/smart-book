'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, X, Monitor, BookOpen, Sparkles } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  content: string;
  formula?: string;
  bulletPoints: string[];
}

// ডামি স্লাইড ডেটা (পরে ডাটাবেসের `slides_json` থেকে ফেচ করে নেবেন)
const dummySlideDeck = {
  topicTitle: '১.১ মাত্রা ও সমীকরণ (Dimensions & Equations)',
  chapter: 'অধ্যায় ১: ভৌত রাশি ও পরিমাপ',
  slides: [
    {
      id: 1,
      title: 'ভৌত রাশি ও পরিমাপের ভূমিকা',
      content: 'পদার্থবিজ্ঞানের ভিত্তি হলো পরিমাপ। যে সমস্ত রাশি পরিমাপ করা যায়, তাদের ভৌত রাশি বলে।',
      formula: 'Quantity = Numerical Value × Unit',
      bulletPoints: [
        'মৌলিক রাশি (Fundamental Quantities)',
        'লব্ধ রাশি (Derived Quantities)',
        'এসআই একক পদ্ধতি (SI Units)'
      ]
    },
    {
      id: 2,
      title: 'মাত্রার সমীকরণ (Dimensional Analysis)',
      content: 'কোনো ভৌত রাশিতে উপস্থিত মৌলিক রাশিগুলোর সূচককে ওই রাশির মাত্রা (Dimension) বলা হয়।',
      formula: '[Velocity] = [L][T]^{-1}',
      bulletPoints: [
        'দূরত্বের মাত্রা = [L]',
        'সময়ের মাত্রা = [T]',
        'ভরের মাত্রা = [M]'
      ]
    },
    {
      id: 3,
      title: 'মাত্র সমীকরণের সমতা নীতি',
      content: 'একটি সঠিক সমীকরণের উভয় পাশের মাত্রা সর্বদা সমান হতে হবে। একে সমতার নীতি (Principle of Homogeneity) বলে।',
      formula: 's = ut + \\frac{1}{2}at^2',
      bulletPoints: [
        '[s] = [L]',
        '[ut] = [L][T]^{-1} \\cdot [T] = [L]',
        'সুতরাং সমীকরণটি মাত্রাগতভাবে সঠিক।'
      ]
    }
  ]
};

interface PageProps {
  params: Promise<{ slideId: string }>;
}

export default function SlidePresentationPage() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slides = dummySlideDeck.slides;
  const currentSlide = slides[currentSlideIndex];

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        if (currentSlideIndex < slides.length - 1) {
          setCurrentSlideIndex((prev) => prev + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentSlideIndex > 0) {
          setCurrentSlideIndex((prev) => prev - 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, slides.length]);

  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between select-none">
      {/* Top Header / Navbar */}
      <header className="w-full px-6 py-4 flex items-center justify-between border-b border-slate-800 bg-slate-900/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-lg">
            <Monitor className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-200">{dummySlideDeck.topicTitle}</h1>
            <p className="text-xs text-slate-400">{dummySlideDeck.chapter}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-mono bg-slate-800 px-3 py-1.5 rounded-full text-indigo-300 border border-slate-700">
            Slide {currentSlideIndex + 1} of {slides.length}
          </span>
          <Link
            href="/admin/slides"
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Exit Presentation"
          >
            <X className="w-5 h-5" />
          </Link>
        </div>
      </header>

      {/* Main Slide Presentation Stage */}
      <main className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-4xl bg-gradient-to-br from-slate-900 to-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl p-8 sm:p-14 flex flex-col justify-between min-h-[420px] transition-all duration-300">
          
          {/* Slide Header */}
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold tracking-wider uppercase mb-3">
              <Sparkles className="w-4 h-4" />
              Smart Teaching Mode
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              {currentSlide.title}
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {currentSlide.content}
            </p>
          </div>

          {/* Formula or Highlight Box (Optional) */}
          {currentSlide.formula && (
            <div className="my-6 p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/60 text-center font-mono text-indigo-300 text-lg sm:text-xl shadow-inner">
              {currentSlide.formula}
            </div>
          )}

          {/* Bullet Points */}
          <div className="space-y-2.5 my-4">
            {currentSlide.bulletPoints.map((point, index) => (
              <div key={index} className="flex items-center gap-3 text-slate-300 text-sm sm:text-base">
                <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>

          {/* Slide Footer Counter */}
          <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
            <span>Smart Book Platform</span>
            <span>Use Arrow Keys (← →) to Navigate</span>
          </div>
        </div>
      </main>

      {/* Bottom Control Bar */}
      <footer className="w-full px-6 py-4 bg-slate-900/50 backdrop-blur-md border-t border-slate-800 flex items-center justify-between">
        <button
          onClick={prevSlide}
          disabled={currentSlideIndex === 0}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            currentSlideIndex === 0
              ? 'bg-slate-900 text-slate-600 cursor-not-allowed'
              : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous Slide
        </button>

        {/* Progress Dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentSlideIndex ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-700 hover:bg-slate-600'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlideIndex === slides.length - 1}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            currentSlideIndex === slides.length - 1
              ? 'bg-slate-900 text-slate-600 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20'
          }`}
        >
          Next Slide
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
}