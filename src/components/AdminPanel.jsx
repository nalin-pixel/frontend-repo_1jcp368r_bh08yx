import { useState } from "react";
import { Plus, Trash2, Pencil, Users, Building2, AppWindow } from "lucide-react";

export default function AdminPanel({ divisions, onAddDivision, onDeleteDivision, onAddApp }) {
  const [divisionName, setDivisionName] = useState("");
  const [appPayload, setAppPayload] = useState({ name: "", url: "", description: "", icon: "", division: divisions[0] || "" });

  return (
    <div className="mt-8 space-y-6">
      <div className="p-4 rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center gap-2 mb-3">
          <Building2 className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold">Manage Divisions</h3>
        </div>
        <div className="flex items-center gap-2">
          <input
            value={divisionName}
            onChange={(e) => setDivisionName(e.target.value)}
            placeholder="New division name"
            className="flex-1 px-3 py-2 rounded-lg border border-gray-200"
          />
          <button
            onClick={() => {
              if (!divisionName.trim()) return;
              onAddDivision(divisionName.trim());
              setDivisionName("");
            }}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {divisions.map((d) => (
            <div key={d} className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-gray-100 text-sm">
              {d}
              <button onClick={() => onDeleteDivision(d)} className="text-gray-500 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center gap-2 mb-3">
          <AppWindow className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold">Add Application</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <input
            placeholder="App name"
            className="px-3 py-2 rounded-lg border border-gray-200"
            value={appPayload.name}
            onChange={(e) => setAppPayload({ ...appPayload, name: e.target.value })}
          />
          <input
            placeholder="URL (https://...)"
            className="px-3 py-2 rounded-lg border border-gray-200"
            value={appPayload.url}
            onChange={(e) => setAppPayload({ ...appPayload, url: e.target.value })}
          />
          <input
            placeholder="Icon URL (optional)"
            className="px-3 py-2 rounded-lg border border-gray-200"
            value={appPayload.icon}
            onChange={(e) => setAppPayload({ ...appPayload, icon: e.target.value })}
          />
          <input
            placeholder="Short description"
            className="px-3 py-2 rounded-lg border border-gray-200 sm:col-span-2"
            value={appPayload.description}
            onChange={(e) => setAppPayload({ ...appPayload, description: e.target.value })}
          />
          <select
            className="px-3 py-2 rounded-lg border border-gray-200"
            value={appPayload.division}
            onChange={(e) => setAppPayload({ ...appPayload, division: e.target.value })}
          >
            {divisions.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div className="mt-3">
          <button
            onClick={() => {
              if (!appPayload.name || !appPayload.url || !appPayload.division) return;
              onAddApp({ ...appPayload, id: crypto.randomUUID() });
              setAppPayload({ name: "", url: "", description: "", icon: "", division: divisions[0] || "" });
            }}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            <Plus className="h-4 w-4" /> Save Application
          </button>
        </div>
      </div>

      <div className="p-4 rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center gap-2 mb-3">
          <Users className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold">User Management (demo)</h3>
        </div>
        <p className="text-sm text-gray-600">This demo focuses on the portal UI. Authentication, roles, and division access would be wired to the backend in a full build.</p>
      </div>
    </div>
  );
}
