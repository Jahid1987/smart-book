import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Layers, FileText, ChevronDown, FolderTree, Edit, Trash2 } from 'lucide-react';

interface PageProps {
  params: Promise<{ bookId: string }>;
}

// ডামি ডেটা (পরে Supabase থেকে bookId দিয়ে কুয়েরি করে নেবেন)
async function fetchBookDetails(bookId: string) {
  return {
    id: bookId,
    title: 'পদার্থবিজ্ঞান প্রথম পত্র (Physics 1st Paper)',
    code: 'PH-101',
    chapters: [
      {
        id: 'chap-1',
        title: 'অধ্যায় ১: ভৌত রাশি ও পরিমাপ (Physical Quantities and Measurement)',
        chapter_no: 1,
        nodes_count: 5,
        nodes: [
          { id: 'node-1', title: '১.১ মাত্রা ও সমীকরণ', type: 'Topic' },
          { id: 'node-2', title: '১.২ ত্রুটি ও পরিমাপের নির্ভুলতা', type: 'Topic' },
          { id: 'node-3', title: '১.৩ স্ক্রু গেজ ও স্লাইড ক্যালিপার্স', type: 'Subtopic' },
        ],
      },
      {
        id: 'chap-2',
        title: 'অধ্যায় ২: ভেক্টর (Vectors)',
        chapter_no: 2,
        nodes_count: 4,
        nodes: [
          { id: 'node-4', title: '২.১ ভেক্টরের যোগ ও বিয়োগ', type: 'Topic' },
          { id: 'node-5', title: '২.২ ডট ও ক্রস গুণন', type: 'Topic' },
        ],
      },
    ],
  };
}

export default async function BookChaptersPage({ params }: PageProps) {
  const { bookId } = await params;
  const book = await fetchBookDetails(bookId);

  return (
    <div className="space-y-6">
      {/* Top Navigation & Header */}
      <div className="flex flex-col gap-3">
        <Link
          href="/admin/books"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Books List
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 mb-2">
              Book Code: {book.code}
            </span>
            <h2 className="text-2xl font-bold text-slate-900">{book.title}</h2>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/admin/books/${bookId}/chapters/new`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors text-sm shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Add Chapter
            </Link>
          </div>
        </div>
      </div>

      {/* Chapters Accordion / List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600" />
          Chapters & Content Tree ({book.chapters.length})
        </h3>

        {book.chapters.map((chap) => (
          <div 
            key={chap.id}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs"
          >
            {/* Chapter Header Bar */}
            <div className="p-4 sm:p-5 bg-slate-50/70 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm">
                  {chap.chapter_no}
                </div>
                <h4 className="font-semibold text-slate-900 text-base">{chap.title}</h4>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <Link
                  href={`/admin/books/${bookId}/chapters/${chap.id}/nodes/new`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-medium text-xs hover:bg-slate-50 transition-colors shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5 text-indigo-600" />
                  Add Topic / Node
                </Link>
                <Link
                  href={`/admin/books/${bookId}/chapters/${chap.id}/edit`}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-white transition-colors border border-transparent hover:border-slate-200"
                >
                  <Edit className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Content Nodes List (Subtopics) */}
            <div className="p-4 sm:p-6 divide-y divide-slate-100">
              {chap.nodes.length === 0 ? (
                <p className="text-sm text-slate-400 italic text-center py-2">কোনো সাব-টপিক বা কনটেন্ট নোড যুক্ত করা হয়নি।</p>
              ) : (
                chap.nodes.map((node) => (
                  <div key={node.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FolderTree className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-700">{node.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded font-mono uppercase bg-slate-100 text-slate-600">
                        {node.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/nodes/${node.id}/edit`}
                        className="text-xs text-indigo-600 hover:underline font-medium"
                      >
                        Edit Content / Markdown
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}