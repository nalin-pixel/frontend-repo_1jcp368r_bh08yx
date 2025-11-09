import { useMemo, useState } from "react";
import PortalHeader from "./components/PortalHeader";
import SearchAndFilter from "./components/SearchAndFilter";
import AppGrid from "./components/AppGrid";
import AdminPanel from "./components/AdminPanel";

const DEFAULT_DIVISIONS = [
  "IT",
  "Finance",
  "HR",
  "Marketing",
  "Operations",
  "Sales",
];

const SEED_APPS = [
  { id: "1", name: "Payroll", url: "https://example.com/payroll", description: "Monthly payroll and salary slips.", icon: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4b0.svg", division: "HR" },
  { id: "2", name: "Attendance", url: "https://example.com/attendance", description: "Time tracking and leave.", icon: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/23f3.svg", division: "HR" },
  { id: "3", name: "Recruitment Portal", url: "https://example.com/recruitment", description: "Hiring pipeline and candidates.", icon: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4bc.svg", division: "HR" },
  { id: "4", name: "Server Monitor", url: "https://example.com/monitor", description: "Infra metrics and alerts.", icon: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4bb.svg", division: "IT" },
  { id: "5", name: "GitLab", url: "https://gitlab.com", description: "Source code management.", icon: "https://about.gitlab.com/images/press/logo/png/gitlab-logo-gray-stacked-rgb.png", division: "IT" },
  { id: "6", name: "Helpdesk", url: "https://example.com/helpdesk", description: "Ticketing system.", icon: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4e9.svg", division: "IT" },
  { id: "7", name: "Budget Planner", url: "https://example.com/budget", description: "Annual budgeting.", icon: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4c8.svg", division: "Finance" },
  { id: "8", name: "Invoice Center", url: "https://example.com/invoices", description: "Create and track invoices.", icon: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4b8.svg", division: "Finance" },
  { id: "9", name: "Campaign Hub", url: "https://example.com/campaigns", description: "Run marketing campaigns.", icon: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f680.svg", division: "Marketing" },
];

export default function App() {
  // In a full build, user data would come from auth backend
  const [user] = useState({ name: "Rani Pratama", email: "rani@company.com", role: "Super Admin", divisions: ["IT", "Finance", "HR", "Marketing"] });

  const [divisions, setDivisions] = useState(DEFAULT_DIVISIONS);
  const [apps, setApps] = useState(SEED_APPS);

  const [query, setQuery] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("all");

  const visibleApps = useMemo(() => {
    const allowedDivisions = user.role === "Super Admin" ? divisions : user.divisions;

    return apps
      .filter((a) => allowedDivisions.includes(a.division))
      .filter((a) => (selectedDivision === "all" ? true : a.division === selectedDivision))
      .filter((a) => a.name.toLowerCase().includes(query.toLowerCase()) || a.description.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [apps, divisions, user, query, selectedDivision]);

  const userDivisionsForFilter = useMemo(() => {
    const allowed = user.role === "Super Admin" ? divisions : user.divisions;
    return allowed;
  }, [divisions, user]);

  const handleAddDivision = (name) => {
    if (!divisions.includes(name)) setDivisions((d) => [...d, name]);
  };

  const handleDeleteDivision = (name) => {
    setDivisions((d) => d.filter((x) => x !== name));
    setApps((prev) => prev.filter((a) => a.division !== name));
  };

  const handleAddApp = (payload) => {
    setApps((prev) => [...prev, payload]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <PortalHeader user={user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-sm text-gray-600">Quick access to your internal applications</p>
          </div>
          <div className="text-sm text-gray-500">Welcome, {user.name}</div>
        </div>

        <SearchAndFilter
          query={query}
          onQueryChange={setQuery}
          divisions={userDivisionsForFilter}
          selectedDivision={selectedDivision}
          onDivisionChange={setSelectedDivision}
        />

        <div className="mt-6">
          <AppGrid apps={visibleApps} />
        </div>

        {user.role !== "User" && (
          <AdminPanel
            divisions={divisions}
            onAddDivision={handleAddDivision}
            onDeleteDivision={handleDeleteDivision}
            onAddApp={handleAddApp}
          />
        )}
      </main>

      <footer className="py-6 text-center text-sm text-gray-500">© {new Date().getFullYear()} Company Portal</footer>
    </div>
  );
}
