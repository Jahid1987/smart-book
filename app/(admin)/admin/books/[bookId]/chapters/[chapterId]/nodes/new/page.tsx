import Link from "next/link";
import { ArrowLeft, Save, FileText, FolderTree, Monitor } from "lucide-react";

interface PageProps {
  params: Promise<{ bookId: string; chapterId: string }>;
}

export default async function NewContentNodePage({ params }: PageProps) {
  const { bookId, chapterId } = await params;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Back Button */}
      <div>
        <Link
          href={`/admin/books/${bookId}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Chapter Details
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <FolderTree className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Add New Topic / Content Node
          </h2>
        </div>
        <p className="text-sm text-slate-500 mb-6">
          Create a main topic or subtopic inside this chapter. You can write its
          content in Markdown format.
        </p>

        <form className="space-y-5">
          {/* Node Title & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Topic / Node Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g. ১.১ মাত্রা ও সমীকরণ (Dimensions & Equations)"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Node Type
              </label>
              <select
                name="node_type"
                defaultValue="Topic"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              >
                <option value="Topic">Main Topic</option>
                <option value="Subtopic">Subtopic</option>
              </select>
            </div>
          </div>

          {/* Parent Node Selection (If it's a subtopic under another main topic) */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Parent Topic (Optional - Leave blank if this is a Main Topic)
            </label>
            <select
              name="parent_id"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            >
              <option value="">-- None (Standalone Main Topic) --</option>
              <option value="node-1">১. ভৌত রাশি ও পরিমাপ (Main Topic)</option>
              <option value="node-2">২. ত্রুটি ও পরিমাপ (Main Topic)</option>
            </select>
          </div>

          {/* Sequence / Order */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Display Order / Sequence No
              </label>
              <input
                type="number"
                name="sequence_no"
                placeholder="e.g. 1"
                defaultValue={1}
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Markdown Content Editor */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-slate-700">
                Markdown Content
              </label>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" /> Supports Markdown & KaTeX
              </span>
            </div>
            <textarea
              name="markdown_content"
              rows={10}
              placeholder="# টপিকের শিরোনাম এখানে লিখুন...&#10;&#10;কনটেন্ট এবং গণিতের সূত্র এখানে Markdown ফরম্যাটে যোগ করুন।"
              className="w-full font-mono text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Slide View Integration inside Topic Form */}
          <div className="bg-indigo-50/50 p-5 rounded-xl border border-indigo-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Monitor className="w-4 h-4 text-indigo-600" />
                Smart Board Slide Content (Optional)
              </h3>
              <span className="text-xs text-indigo-600 font-medium">
                Auto-synced with Topic
              </span>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Slide Key Bullet Points (Comma separated or lines)
              </label>
              <textarea
                rows={3}
                placeholder="পয়েন্ট ১: মূল সংজ্ঞা&#10;পয়েন্ট ২: প্রয়োজনীয় সূত্র&#10;পয়েন্ট ৩: উদাহরণ"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
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
              Save Topic Node
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
