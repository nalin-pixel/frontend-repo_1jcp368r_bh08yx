import { ChevronDown, LogOut, Building2, Shield, User as UserIcon } from "lucide-react";

export default function PortalHeader({ user }) {
  return (
    <header className="w-full sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
            GP
          </div>
          <div>
            <div className="text-lg font-semibold leading-tight">Company Portal</div>
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <Building2 className="h-3.5 w-3.5" />
              Gateway to internal apps
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200">
            <Shield className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">{user.role}</span>
            <span className="text-gray-300">•</span>
            <UserIcon className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-900">{user.name}</span>
          </div>

          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-gray-300 bg-white text-gray-700 text-sm">
            Menu <ChevronDown className="h-4 w-4" />
          </button>

          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-900 text-white text-sm hover:bg-black/80">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </div>
    </header>
  );
}
