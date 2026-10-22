import { BookOpen, HelpCircle, FileText, Users } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Welcome back, Admin! 👋</h2>
        <p className="text-slate-500 text-sm mt-1">Here is the quick overview of your Smart Book content engine.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Chapters</p>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">24</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Bank Questions</p>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">142</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Slide Views</p>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">18</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Active Tutors</p>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">8</h3>
          </div>
        </div>
      </div>

      {/* Quick Actions / Notice */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
        <h3 className="text-base font-semibold text-slate-900 mb-2">Next Task Recommendation</h3>
        <p className="text-sm text-slate-600">
          Now that the layout and database are ready, you can proceed to build the dynamic form for adding Slide View (`slides_json`) or Board Questions under <code>/admin/questions</code> or <code>/admin/slides</code>.
        </p>
      </div>
    </div>
  );
}