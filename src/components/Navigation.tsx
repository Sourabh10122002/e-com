import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-xl border-b border-slate-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="group flex items-center">
              <div className="text-3xl font-bold text-slate-900 group-hover:text-slate-700 transition-all duration-300">
                Modern<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Shop</span>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-2">
            <Link
              href="/"
              className="text-slate-700 hover:text-slate-900 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-slate-100 relative group"
            >
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </Link>
            <Link
              href="/dashboard"
              className="text-slate-700 hover:text-slate-900 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-slate-100 relative group"
            >
              <span className="relative z-10">Dashboard</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </Link>
            <Link
              href="/recommendations"
              className="text-slate-700 hover:text-slate-900 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-slate-100 relative group"
            >
              <span className="relative z-10">Recommendations</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </Link>
            <Link
              href="/admin"
              className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:from-slate-800 hover:to-slate-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}