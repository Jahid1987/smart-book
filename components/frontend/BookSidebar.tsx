"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  FileText,
  Flame,
} from "lucide-react";
import { ContentNode, Chapter } from "@/types/book";

export default function BookSidebar({ chapters }: { chapters: Chapter[] }) {
  const searchParams = useSearchParams();
  const activeNodeId = Number(searchParams.get("node"));

  // ডিফল্টভাবে প্রথম অধ্যায়টি খোলা থাকবে
  const [openChapters, setOpenChapters] = useState<Record<number, boolean>>({
    [chapters[0]?.id]: true,
  });

  const toggleChapter = (id: number) => {
    setOpenChapters((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className="w-80 h-screen sticky top-0 border-r border-gray-200 bg-gray-50/60 backdrop-blur overflow-y-auto p-4 select-none shrink-0 flex flex-col">
      {/* Brand / Book Header */}
      <div className="flex items-center gap-2.5 font-bold text-base text-gray-800 mb-6 px-2 pb-3 border-b border-gray-200">
        <div className="p-2 bg-blue-600 text-white rounded-lg shadow-sm">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h2 className="leading-tight">স্মার্ট বুক (Smart Book)</h2>
          <span className="text-xs font-normal text-gray-500">
            এইচএসসি ও আইসিটি
          </span>
        </div>
      </div>

      {/* Chapters & Navigation Tree */}
      <nav className="space-y-3 flex-1">
        {chapters.map((chapter) => {
          const isOpen = !!openChapters[chapter.id];

          // ১. এই অধ্যায়ের আন্ডারে থাকা মেইন টপিকগুলো (যেগুলোর parent_id IS NULL)
          const mainTopics = chapter.content_nodes
            ?.filter((n) => n.parent_id === null)
            .sort((a, b) => a.sort_order - b.sort_order);

          return (
            <div key={chapter.id} className="space-y-1">
              {/* Chapter Accordion Header */}
              <button
                onClick={() => toggleChapter(chapter.id)}
                className="w-full flex items-center justify-between px-2.5 py-2 text-xs font-bold text-gray-700 hover:bg-gray-200/60 rounded-md transition uppercase tracking-wider"
              >
                <span className="text-left truncate">
                  অধ্যায় {chapter.serial}: {chapter.title}
                </span>
                {isOpen ? (
                  <ChevronDown className="w-4 h-4 text-gray-500 shrink-0 ml-1" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500 shrink-0 ml-1" />
                )}
              </button>

              {/* Topics List */}
              {isOpen && (
                <div className="pl-2 border-l-2 border-blue-200 ml-3 space-y-1 mt-1">
                  {mainTopics?.map((topic: ContentNode) => {
                    // ২. এই মেইন টপিকের আন্ডারে থাকা সাব-টপিকগুলো (যেগুলোর parent_id === topic.id)
                    const subtopics = chapter.content_nodes
                      ?.filter((n) => n.parent_id === topic.id)
                      .sort((a, b) => a.sort_order - b.sort_order);

                    const isTopicActive = activeNodeId === topic.id;

                    return (
                      <div key={topic.id} className="space-y-1">
                        {/* Main Topic Link */}
                        <Link
                          href={`?node=${topic.id}`}
                          className={`flex items-center justify-between px-2.5 py-1.5 text-sm rounded-md transition ${
                            isTopicActive
                              ? "bg-blue-600 text-white font-medium shadow-sm"
                              : "text-gray-600 hover:bg-gray-200/50 hover:text-gray-900"
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span
                              className={`text-xs font-mono ${isTopicActive ? "text-blue-100" : "text-gray-400"}`}
                            >
                              {topic.serial}
                            </span>
                            <span className="truncate">{topic.title}</span>
                          </div>

                          {/* যদি গুরুত্ব High হয় তবে ফায়ার আইকন দেখাবে */}
                          {topic.importance === "high" && (
                            <Flame
                              className={`w-3.5 h-3.5 shrink-0 ${isTopicActive ? "text-amber-300" : "text-amber-500"}`}
                            />
                          )}
                        </Link>

                        {/* Subtopics Nested List */}
                        {subtopics && subtopics.length > 0 && (
                          <div className="pl-4 border-l border-gray-200 ml-2 space-y-1 my-1">
                            {subtopics.map((sub: ContentNode) => {
                              const isSubActive = activeNodeId === sub.id;
                              return (
                                <Link
                                  key={sub.id}
                                  href={`?node=${sub.id}`}
                                  className={`flex items-center gap-2 px-2 py-1.5 text-xs rounded-md transition ${
                                    isSubActive
                                      ? "bg-blue-50 text-blue-700 font-semibold border border-blue-200"
                                      : "text-gray-500 hover:bg-gray-200/50 hover:text-gray-800"
                                  }`}
                                >
                                  <FileText
                                    className={`w-3 h-3 shrink-0 ${isSubActive ? "text-blue-600" : "text-gray-400"}`}
                                  />
                                  <span className="truncate">
                                    <span className="font-mono text-gray-400 mr-1">
                                      {sub.serial}
                                    </span>
                                    {sub.title}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="pt-4 mt-auto border-t border-gray-200 text-xs text-gray-400 text-center">
        Smart Book Engine v1.0
      </div>
    </aside>
  );
}
