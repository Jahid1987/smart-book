import Link from "next/link";
import { ReactNode } from "react";
import {
  LayoutDashboard,
  BookOpen,
  HelpCircle,
  FileText,
  Settings,
  LogOut,
  Layers,
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex-col border-r border-slate-800 hidden md:flex">
        {/* Brand / Logo */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <Link
            href="/admin"
            className="flex items-center gap-2 font-bold text-white text-lg"
          >
            <Layers className="w-6 h-6 text-indigo-400" />
            <span>Smart Book Admin</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 text-sm font-medium">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <LayoutDashboard className="w-4 h-4 text-indigo-400" />
            Dashboard
          </Link>
          <Link
            href="/admin/books"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <BookOpen className="w-4 h-4 text-slate-400" />
            Books & Chapters
          </Link>
          <Link
            href="/admin/questions"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-slate-400" />
            Question Bank (CQ/MCQ)
          </Link>
          <Link
            href="/admin/slides"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <FileText className="w-4 h-4 text-slate-400" />
            Slide View Content
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <Settings className="w-4 h-4 text-slate-400" />
            Settings
          </Link>
        </nav>

        {/* Sidebar Footer / Back to Site */}
        <div className="p-4 border-t border-slate-800">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4 rotate-180" />
            Back to
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10 shadow-xs">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-slate-800">
              Control Center
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm">
              A
            </div>
            <span className="text-sm font-medium text-slate-700 hidden sm:inline">
              Admin User
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
