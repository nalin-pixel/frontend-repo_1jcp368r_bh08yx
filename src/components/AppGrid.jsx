import { ExternalLink } from "lucide-react";

function AppCard({ app }) {
  return (
    <div className="group p-4 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden">
          {app.icon ? (
            <img src={app.icon} alt={app.name} className="h-10 w-10 object-contain" />
          ) : (
            <div className="text-gray-400 text-sm">{app.name.charAt(0)}</div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-medium truncate">{app.name}</div>
          <div className="text-xs text-gray-500 truncate">{app.description}</div>
        </div>
        <a
          href={app.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
        >
          Open <ExternalLink className="h-4 w-4" />
        </a>
      </div>
      <div className="mt-3 text-xs text-gray-500">Division: {app.division}</div>
    </div>
  );
}

export default function AppGrid({ apps }) {
  if (!apps.length) {
    return (
      <div className="text-center text-gray-500 py-12 border border-dashed rounded-xl">
        No applications found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {apps.map((app) => (
        <AppCard key={app.id} app={app} />
      ))}
    </div>
  );
}
