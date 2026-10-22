// src/app/book/page.tsx
import { sql } from "@/lib/db_connection";
import BookSidebar from "@/components/frontend/BookSidebar";
import { Suspense } from "react";

type ContentNode = {
  id: number;
  parent_id: number | null;
  serial: number | string;
  title: string;
  node_type: string;
  importance: string | null;
  content: string | null;
  sort_order: number;
};

type Chapter = {
  id: number;
  serial: number | string;
  title: string;
  sort_order: number;
  content_nodes: ContentNode[];
};

// ১. চাইল্ড কম্পোনেন্ট: এখানেই searchParams প্রপস হিসেবে প্রমিস আকারে আসবে এবং Suspense-এর ভেতরে await হবে
async function BookContentArea({
  searchParams,
}: {
  searchParams: Promise<{ node?: string }>;
}) {
  const resolvedParams = await searchParams;

  const chaptersData = (await sql`
    SELECT 
      c.id, c.serial, c.title, c.sort_order,
      COALESCE(
        json_agg(
          json_build_object(
            'id', n.id,
            'parent_id', n.parent_id,
            'serial', n.serial,
            'title', n.title,
            'node_type', n.node_type,
            'importance', n.importance,
            'content', n.content,
            'sort_order', n.sort_order
          ) ORDER BY n.sort_order ASC
        ) FILTER (WHERE n.id IS NOT NULL), '[]'::json
      ) AS content_nodes
    FROM public.chapters c
    LEFT JOIN public.content_nodes n ON c.id = n.chapter_id
    WHERE c.book_id = 2
    GROUP BY c.id
    ORDER BY c.sort_order ASC;
  `) as Chapter[];

  const allNodes = chaptersData.flatMap((ch) => ch.content_nodes || []);
  
  const activeNode = resolvedParams.node
    ? allNodes.find((n) => n.id === Number(resolvedParams.node))
    : allNodes[0];

  return (
    <div className="flex min-h-screen bg-white w-full">
      {/* বাম পাশের নেস্টেড সাইডবার */}
      <BookSidebar chapters={chaptersData} />

      {/* ডান পাশের মূল পড়ার এলাকা (Content Area) */}
      <main className="flex-1 p-10 max-w-4xl mx-auto overflow-y-auto">
        {activeNode ? (
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-sm">
              <span className="uppercase px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md font-mono text-xs font-semibold border border-blue-100">
                {activeNode.node_type} : {activeNode.serial}
              </span>
              {activeNode.importance === 'high' && (
                <span className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-700 rounded-md text-xs font-semibold border border-amber-100">
                  🔥 বোর্ড পরীক্ষার জন্য অত্যন্ত গুরুত্বপূর্ণ
                </span>
              )}
            </div>

            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight pb-4 border-b border-gray-100">
              {activeNode.title}
            </h1>

            <div className="prose max-w-none text-gray-700 whitespace-pre-line leading-relaxed text-base pt-2">
              {activeNode.content || "এই টপিকের বিস্তারিত পাঠ্য কনটেন্ট এখনো যুক্ত করা হয়নি।"}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[70vh] text-center text-gray-400 space-y-2">
            <p className="text-lg">বাম পাশের মেনু থেকে যেকোনো একটি টপিক সিলেক্ট করুন।</p>
          </div>
        )}
      </main>
    </div>
  );
}

// ২. মূল পেজ কম্পোনেন্ট: এখানে সরাসরি searchParams পাস করে দেওয়া হলো Suspense-এর ভেতরে
export default function SmartBookReaderPage({
  searchParams,
}: {
  searchParams: Promise<{ node?: string }>;
}) {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-gray-500">স্মার্ট বুক লোড হচ্ছে...</div>}>
      <BookContentArea searchParams={searchParams} />
    </Suspense>
  );
}