import { Search, SlidersHorizontal } from "lucide-react";

export default function SearchAndFilter({ query, onQueryChange, divisions, selectedDivision, onDivisionChange }) {
  return (
    <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search applications..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
        />
      </div>

      <div className="flex items-center gap-2">
        <div className="text-sm text-gray-500 hidden sm:block">Filter</div>
        <SlidersHorizontal className="h-4 w-4 text-gray-400 hidden sm:block" />
        <select
          value={selectedDivision}
          onChange={(e) => onDivisionChange(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm"
        >
          <option value="all">All Divisions</option>
          {divisions.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
