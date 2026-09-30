"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { HeatmapViewer } from "./heatmap-viewer";

interface Metrics {
  totalVisitors: number;
  totalPageViews: number;
  totalClicks: number;
  totalContacts: number;
  unreadContacts: number;
  viewsToday: number;
  visitorsToday: number;
}

interface DailyView {
  date: string;
  count: number;
}

interface TopPage {
  page_path: string;
  views: number;
  unique_visitors: number;
}

interface Breakdown {
  name: string;
  count: number;
}

interface Visitor {
  id: number;
  visitor_id: string;
  session_id?: string;
  ip?: string;
  country?: string;
  city?: string;
  browser?: string;
  browser_version?: string;
  os?: string;
  os_version?: string;
  device_type?: string;
  user_agent?: string;
  screen_res?: string;
  viewport_res?: string;
  dpr?: number;
  color_depth?: number;
  cpu_cores?: number;
  ram_gb?: number;
  connection_type?: string;
  downlink_mbps?: number;
  rtt_ms?: number;
  save_data?: number;
  battery_level?: number;
  is_charging?: number;
  timezone?: string;
  language?: string;
  languages?: string;
  prefers_dark?: number;
  touch_support?: number;
  first_seen_at: string;
  last_seen_at: string;
  total_visits: number;
}

interface ContactItem {
  id: number;
  visitor_id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  ip?: string;
  locale?: string;
  user_agent?: string;
  is_read: number;
  created_at: string;
}

interface AuthAttempt {
  id: number;
  ip: string;
  success: number;
  attempted_at: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"overview" | "visitors" | "heatmap" | "contacts" | "security">("overview");
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [dailyViews, setDailyViews] = useState<DailyView[]>([]);
  const [topPages, setTopPages] = useState<TopPage[]>([]);
  const [breakdowns, setBreakdowns] = useState<{
    browser: Breakdown[];
    os: Breakdown[];
    device: Breakdown[];
  }>({ browser: [], os: [], device: [] });
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [authAttempts, setAuthAttempts] = useState<AuthAttempt[]>([]);
  const [visitorFilter, setVisitorFilter] = useState("");
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.status === 401) {
        router.replace("/admin");
        return;
      }
      if (!res.ok) throw new Error("Failed to load stats");
      const data = await res.json();
      setMetrics(data.metrics);
      setDailyViews(data.dailyViews || []);
      setTopPages(data.topPages || []);
      setBreakdowns(data.breakdowns || { browser: [], os: [], device: [] });
      setVisitors(data.recentVisitors || []);
      setContacts(data.contacts || []);
      setAuthAttempts(data.authAttempts || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  };

  const toggleContactRead = async (contact: ContactItem) => {
    const nextReadState = contact.is_read ? 0 : 1;
    setContacts((prev) =>
      prev.map((c) => (c.id === contact.id ? { ...c, is_read: nextReadState } : c))
    );
    try {
      await fetch("/api/admin/stats", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: contact.id, is_read: nextReadState }),
      });
      fetchStats();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredVisitors = visitors.filter((v) => {
    if (!visitorFilter) return true;
    const term = visitorFilter.toLowerCase();
    return (
      v.ip?.toLowerCase().includes(term) ||
      v.visitor_id.toLowerCase().includes(term) ||
      v.browser?.toLowerCase().includes(term) ||
      v.os?.toLowerCase().includes(term) ||
      v.country?.toLowerCase().includes(term) ||
      v.city?.toLowerCase().includes(term) ||
      v.device_type?.toLowerCase().includes(term)
    );
  });

  const maxDailyViews = dailyViews.reduce((max, d) => Math.max(max, d.count), 1);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-3 rounded-2xl border border-[#2b221a] bg-[#16120e] px-6 py-4">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#c48c56] border-t-transparent" />
          <span className="text-sm font-medium text-[#f4efe9]">Loading Intelligence Dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 border-b border-[#2b221a] bg-[#16120e]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#c48c56]/15 text-[#c48c56] border border-[#c48c56]/30">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold text-[#f4efe9]">Portfolio Intelligence</h1>
              <p className="text-[11px] text-[#9a8677]">Live telemetry, telemetry database & heatmap</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-[#382d24] bg-[#0f0c0a] px-3 py-1.5 text-xs font-semibold text-[#f4efe9] hover:border-[#c48c56] transition-colors"
            >
              <span>View Site</span>
              <svg className="h-3.5 w-3.5 text-[#9a8677]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <button
              onClick={handleLogout}
              className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-500/20 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2">
            {[
              { id: "overview", label: "Overview", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
              { id: "visitors", label: `Visitors (${visitors.length})`, icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
              { id: "heatmap", label: `Click Heatmap (${metrics?.totalClicks || 0})`, icon: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" },
              { id: "contacts", label: `Messages (${contacts.length})`, badge: metrics?.unreadContacts, icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
              { id: "security", label: "Security & Audit", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id as typeof tab)}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
                  tab === t.id
                    ? "bg-[#c48c56] text-[#16120e] shadow-md shadow-[#c48c56]/15"
                    : "text-[#9a8677] hover:bg-[#1f1914] hover:text-[#f4efe9]"
                }`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={t.icon} />
                </svg>
                <span>{t.label}</span>
                {t.badge && t.badge > 0 ? (
                  <span className="rounded-full bg-amber-500 px-1.5 py-0.2 text-[10px] font-bold text-[#16120e]">
                    {t.badge}
                  </span>
                ) : null}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        {/* ── TAB 1: OVERVIEW ── */}
        {tab === "overview" && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {[
                { label: "Total Visitors", val: metrics?.totalVisitors || 0, sub: `${metrics?.visitorsToday || 0} today` },
                { label: "Page Views", val: metrics?.totalPageViews || 0, sub: `${metrics?.viewsToday || 0} today` },
                { label: "Click Events", val: metrics?.totalClicks || 0, sub: "Heatmap points" },
                { label: "Messages", val: metrics?.totalContacts || 0, sub: `${metrics?.unreadContacts || 0} unread` },
                { label: "Unique IPs", val: visitors.length, sub: "Logged in SQLite" },
                { label: "Security Status", val: "Protected", sub: "3-attempt lockout", textVal: true },
              ].map((card, idx) => (
                <div key={idx} className="rounded-2xl border border-[#2b221a] bg-[#16120e] p-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9a8677]">
                    {card.label}
                  </span>
                  <div className="mt-1 text-2xl font-bold tracking-tight text-[#f4efe9]">
                    {card.textVal ? (
                      <span className="text-emerald-400 text-lg flex items-center gap-1.5">
                        <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        {card.val}
                      </span>
                    ) : (
                      card.val.toLocaleString()
                    )}
                  </div>
                  <span className="mt-1 block text-xs text-[#9a8677]">{card.sub}</span>
                </div>
              ))}
            </div>

            {/* Daily Views Bar Chart */}
            <div className="rounded-3xl border border-[#2b221a] bg-[#16120e] p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-[#f4efe9]">Page Views Trend (Last 30 Days)</h3>
                  <p className="text-xs text-[#9a8677]">Daily traffic volume</p>
                </div>
                <span className="text-xs text-[#c48c56] font-semibold">
                  Peak: {maxDailyViews} views/day
                </span>
              </div>

              {dailyViews.length === 0 ? (
                <div className="h-44 flex items-center justify-center text-sm text-[#9a8677] border border-dashed border-[#2b221a] rounded-2xl">
                  No page views recorded yet. Visit the portfolio to generate live telemetry!
                </div>
              ) : (
                <div className="h-48 flex items-end gap-1 sm:gap-2 pt-6 pb-2 border-b border-[#2b221a]">
                  {dailyViews.map((d, i) => {
                    const heightPercent = Math.max(8, Math.round((d.count / maxDailyViews) * 100));
                    return (
                      <div key={i} className="group relative flex-1 flex flex-col items-center h-full justify-end">
                        {/* Tooltip */}
                        <div className="absolute -top-9 z-10 hidden group-hover:flex flex-col items-center pointer-events-none whitespace-nowrap">
                          <span className="rounded-md bg-[#2b221a] px-2 py-0.5 text-[11px] font-mono text-[#f4efe9] border border-[#382d24]">
                            {d.date}: {d.count} views
                          </span>
                        </div>
                        {/* Bar */}
                        <div
                          className="w-full bg-[#c48c56]/70 group-hover:bg-[#c48c56] rounded-t-md transition-all"
                          style={{ height: `${heightPercent}%` }}
                        />
                        <span className="mt-2 text-[9px] text-[#6e5d50] truncate w-full text-center hidden sm:block">
                          {d.date.slice(5)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Grid of Top Pages and System Breakdowns */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Top Pages */}
              <div className="rounded-3xl border border-[#2b221a] bg-[#16120e] p-6 shadow-xl">
                <h3 className="text-base font-bold text-[#f4efe9] mb-4">Most Visited Pages</h3>
                <div className="space-y-3">
                  {topPages.map((p, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 max-w-[70%]">
                        <span className="font-mono text-[#9a8677] w-5">{i + 1}.</span>
                        <span className="font-semibold text-[#f4efe9] truncate">{p.page_path}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[#9a8677]">{p.unique_visitors} visitors</span>
                        <span className="font-bold text-[#c48c56]">{p.views} views</span>
                      </div>
                    </div>
                  ))}
                  {topPages.length === 0 && (
                    <p className="text-sm text-[#9a8677]">No page views logged yet.</p>
                  )}
                </div>
              </div>

              {/* Hardware & Systems Breakdown */}
              <div className="rounded-3xl border border-[#2b221a] bg-[#16120e] p-6 shadow-xl space-y-4">
                <h3 className="text-base font-bold text-[#f4efe9]">Systems & Devices</h3>

                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9a8677]">
                    Operating System
                  </span>
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    {breakdowns.os.map((item, i) => (
                      <span key={i} className="rounded-lg border border-[#2b221a] bg-[#0f0c0a] px-2.5 py-1 text-xs text-[#f4efe9]">
                        {item.name}: <strong className="text-[#c48c56]">{item.count}</strong>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9a8677]">
                    Browser
                  </span>
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    {breakdowns.browser.map((item, i) => (
                      <span key={i} className="rounded-lg border border-[#2b221a] bg-[#0f0c0a] px-2.5 py-1 text-xs text-[#f4efe9]">
                        {item.name}: <strong className="text-[#c48c56]">{item.count}</strong>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9a8677]">
                    Device Type
                  </span>
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    {breakdowns.device.map((item, i) => (
                      <span key={i} className="rounded-lg border border-[#2b221a] bg-[#0f0c0a] px-2.5 py-1 text-xs text-[#f4efe9]">
                        {item.name}: <strong className="text-[#c48c56]">{item.count}</strong>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: VISITORS & TELEMETRY ── */}
        {tab === "visitors" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-[#f4efe9]">Comprehensive Visitor Intelligence</h2>
                <p className="text-xs text-[#9a8677]">
                  IP addresses, hardware specs, CPU cores, RAM, battery, screen resolutions, and preferences.
                </p>
              </div>

              <input
                type="text"
                placeholder="Filter by IP, OS, Browser, Country..."
                value={visitorFilter}
                onChange={(e) => setVisitorFilter(e.target.value)}
                className="w-full sm:w-72 rounded-xl border border-[#382d24] bg-[#16120e] px-4 py-2 text-xs text-[#f4efe9] placeholder:text-[#6e5d50] focus:border-[#c48c56] focus:outline-none"
              />
            </div>

            {/* Visitors Table */}
            <div className="rounded-3xl border border-[#2b221a] bg-[#16120e] overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-[#2b221a] bg-[#0f0c0a] text-[11px] font-semibold uppercase tracking-wider text-[#9a8677]">
                    <tr>
                      <th className="py-3.5 pl-4 pr-3">IP & Location</th>
                      <th className="py-3.5 px-3">Device / OS</th>
                      <th className="py-3.5 px-3">Browser</th>
                      <th className="py-3.5 px-3">Screen & DPR</th>
                      <th className="py-3.5 px-3">Hardware (CPU / RAM)</th>
                      <th className="py-3.5 px-3">Battery & Network</th>
                      <th className="py-3.5 px-3">Visits</th>
                      <th className="py-3.5 pr-4 text-right">Last Seen</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#221b15]">
                    {filteredVisitors.map((v) => (
                      <tr
                        key={v.id}
                        onClick={() => setSelectedVisitor(v)}
                        className="hover:bg-[#1f1914] cursor-pointer transition-colors"
                      >
                        <td className="py-3 pl-4 pr-3">
                          <div className="font-mono font-semibold text-[#f4efe9] flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            {v.ip || "127.0.0.1"}
                          </div>
                          <div className="text-[10px] text-[#9a8677]">
                            {v.city ? `${v.city}, ` : ""}{v.country || "Local / Unknown"}
                          </div>
                        </td>

                        <td className="py-3 px-3">
                          <div className="text-[#f4efe9] font-medium">{v.os || "Unknown"} {v.os_version}</div>
                          <div className="text-[10px] text-[#9a8677]">{v.device_type}</div>
                        </td>

                        <td className="py-3 px-3">
                          <div className="text-[#f4efe9]">{v.browser}</div>
                          <div className="text-[10px] text-[#9a8677]">{v.browser_version}</div>
                        </td>

                        <td className="py-3 px-3">
                          <div className="font-mono text-[#f4efe9]">{v.screen_res || "Unknown"}</div>
                          <div className="text-[10px] text-[#9a8677]">
                            DPR: {v.dpr}x &bull; View: {v.viewport_res || "N/A"}
                          </div>
                        </td>

                        <td className="py-3 px-3">
                          <div className="text-[#f4efe9]">
                            {v.cpu_cores ? `${v.cpu_cores} Cores` : "Unknown CPU"}
                          </div>
                          <div className="text-[10px] text-[#9a8677]">
                            {v.ram_gb ? `~${v.ram_gb} GB RAM` : "RAM: N/A"}
                          </div>
                        </td>

                        <td className="py-3 px-3">
                          <div className="text-[#f4efe9]">
                            {v.battery_level !== null && v.battery_level !== undefined ? (
                              <span className="flex items-center gap-1">
                                {v.battery_level}% {v.is_charging ? "⚡" : "🔋"}
                              </span>
                            ) : (
                              "Battery: N/A"
                            )}
                          </div>
                          <div className="text-[10px] text-[#9a8677]">
                            {v.connection_type ? `${v.connection_type.toUpperCase()}` : "Net: N/A"}
                            {v.downlink_mbps ? ` (${v.downlink_mbps} Mbps)` : ""}
                          </div>
                        </td>

                        <td className="py-3 px-3 font-semibold text-[#c48c56]">
                          {v.total_visits}x
                        </td>

                        <td className="py-3 pr-4 text-right text-[11px] text-[#9a8677]">
                          {new Date(v.last_seen_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          <div className="text-[10px]">{new Date(v.last_seen_at).toLocaleDateString()}</div>
                        </td>
                      </tr>
                    ))}
                    {filteredVisitors.length === 0 && (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-sm text-[#9a8677]">
                          No visitors match your query.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Selected Visitor Inspector Modal */}
            {selectedVisitor && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
                <div className="w-full max-w-2xl rounded-3xl border border-[#2b221a] bg-[#16120e] p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-[#2b221a] pb-4 mb-4">
                    <div>
                      <h3 className="text-base font-bold text-[#f4efe9]">
                        Visitor Details: {selectedVisitor.ip}
                      </h3>
                      <p className="text-xs text-[#9a8677]">ID: {selectedVisitor.visitor_id}</p>
                    </div>
                    <button
                      onClick={() => setSelectedVisitor(null)}
                      className="rounded-xl border border-[#382d24] p-1.5 text-xs text-[#9a8677] hover:text-[#f4efe9]"
                    >
                      Close ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="rounded-xl bg-[#0f0c0a] p-3 border border-[#2b221a]">
                      <span className="text-[#9a8677] uppercase text-[10px]">Location</span>
                      <p className="text-[#f4efe9] font-medium mt-1">
                        {selectedVisitor.city || "Unknown City"}, {selectedVisitor.country || "Unknown Country"}
                      </p>
                    </div>
                    <div className="rounded-xl bg-[#0f0c0a] p-3 border border-[#2b221a]">
                      <span className="text-[#9a8677] uppercase text-[10px]">Timezone</span>
                      <p className="text-[#f4efe9] font-medium mt-1">{selectedVisitor.timezone || "N/A"}</p>
                    </div>
                    <div className="rounded-xl bg-[#0f0c0a] p-3 border border-[#2b221a]">
                      <span className="text-[#9a8677] uppercase text-[10px]">Hardware Specs</span>
                      <p className="text-[#f4efe9] font-medium mt-1">
                        {selectedVisitor.cpu_cores} Logical Cores &bull; {selectedVisitor.ram_gb} GB RAM
                      </p>
                    </div>
                    <div className="rounded-xl bg-[#0f0c0a] p-3 border border-[#2b221a]">
                      <span className="text-[#9a8677] uppercase text-[10px]">Display & DPR</span>
                      <p className="text-[#f4efe9] font-medium mt-1">
                        {selectedVisitor.screen_res} ({selectedVisitor.dpr}x DPR, {selectedVisitor.color_depth}-bit)
                      </p>
                    </div>
                    <div className="rounded-xl bg-[#0f0c0a] p-3 border border-[#2b221a]">
                      <span className="text-[#9a8677] uppercase text-[10px]">Network & Speed</span>
                      <p className="text-[#f4efe9] font-medium mt-1">
                        {selectedVisitor.connection_type || "Unknown"} &bull; {selectedVisitor.downlink_mbps || "?"} Mbps &bull; {selectedVisitor.rtt_ms || "?"}ms RTT
                      </p>
                    </div>
                    <div className="rounded-xl bg-[#0f0c0a] p-3 border border-[#2b221a]">
                      <span className="text-[#9a8677] uppercase text-[10px]">Battery & Power</span>
                      <p className="text-[#f4efe9] font-medium mt-1">
                        {selectedVisitor.battery_level !== null ? `${selectedVisitor.battery_level}% (${selectedVisitor.is_charging ? "Charging" : "Discharging"})` : "N/A"}
                      </p>
                    </div>
                    <div className="rounded-xl bg-[#0f0c0a] p-3 border border-[#2b221a] col-span-2">
                      <span className="text-[#9a8677] uppercase text-[10px]">Client Preferences & Languages</span>
                      <p className="text-[#f4efe9] font-medium mt-1">
                        Languages: {selectedVisitor.languages || selectedVisitor.language || "N/A"} &bull; Dark Mode: {selectedVisitor.prefers_dark ? "Yes" : "No"} &bull; Touch: {selectedVisitor.touch_support ? "Yes" : "No"}
                      </p>
                    </div>
                    <div className="rounded-xl bg-[#0f0c0a] p-3 border border-[#2b221a] col-span-2 font-mono text-[11px] break-all">
                      <span className="text-[#9a8677] uppercase text-[10px]">Full User-Agent</span>
                      <p className="text-[#9a8677] mt-1">{selectedVisitor.user_agent}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── TAB 3: CLICK HEATMAP ── */}
        {tab === "heatmap" && <HeatmapViewer />}

        {/* ── TAB 4: CONTACT INQUIRIES ── */}
        {tab === "contacts" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-[#f4efe9]">Contact Inquiries & Submissions</h2>
              <p className="text-xs text-[#9a8677]">Messages received via the contact form on your portfolio.</p>
            </div>

            <div className="rounded-3xl border border-[#2b221a] bg-[#16120e] overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-[#2b221a] bg-[#0f0c0a] text-[11px] font-semibold uppercase tracking-wider text-[#9a8677]">
                    <tr>
                      <th className="py-3.5 pl-4 pr-3">Status</th>
                      <th className="py-3.5 px-3">Sender</th>
                      <th className="py-3.5 px-3">Email</th>
                      <th className="py-3.5 px-3">Subject</th>
                      <th className="py-3.5 px-3">IP Address</th>
                      <th className="py-3.5 px-3">Date</th>
                      <th className="py-3.5 pr-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#221b15]">
                    {contacts.map((c) => (
                      <tr
                        key={c.id}
                        className={`hover:bg-[#1f1914] transition-colors ${
                          c.is_read ? "opacity-75" : "bg-[#c48c56]/5"
                        }`}
                      >
                        <td className="py-3.5 pl-4 pr-3">
                          {c.is_read ? (
                            <span className="inline-block rounded-md bg-[#2b221a] px-2 py-0.5 text-[10px] text-[#9a8677]">
                              Read
                            </span>
                          ) : (
                            <span className="inline-block rounded-md bg-[#c48c56] px-2 py-0.5 text-[10px] font-bold text-[#16120e]">
                              New
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-3 font-semibold text-[#f4efe9]">{c.name}</td>
                        <td className="py-3.5 px-3">
                          <a href={`mailto:${c.email}`} className="text-[#c48c56] hover:underline">
                            {c.email}
                          </a>
                        </td>
                        <td className="py-3.5 px-3 text-[#f4efe9] font-medium max-w-xs truncate">
                          {c.subject}
                        </td>
                        <td className="py-3.5 px-3 font-mono text-[11px] text-[#9a8677]">{c.ip || "127.0.0.1"}</td>
                        <td className="py-3.5 px-3 text-[11px] text-[#9a8677]">
                          {new Date(c.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 pr-4 text-right space-x-2">
                          <button
                            onClick={() => setSelectedContact(c)}
                            className="rounded-lg border border-[#382d24] bg-[#0f0c0a] px-2.5 py-1 text-xs font-semibold text-[#f4efe9] hover:border-[#c48c56]"
                          >
                            View
                          </button>
                          <button
                            onClick={() => toggleContactRead(c)}
                            className="rounded-lg border border-[#382d24] bg-[#0f0c0a] px-2.5 py-1 text-xs text-[#9a8677] hover:text-[#f4efe9]"
                          >
                            {c.is_read ? "Mark Unread" : "Mark Read"}
                          </button>
                        </td>
                      </tr>
                    ))}
                    {contacts.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-sm text-[#9a8677]">
                          No contact form submissions recorded yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* View Message Modal */}
            {selectedContact && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
                <div className="w-full max-w-xl rounded-3xl border border-[#2b221a] bg-[#16120e] p-6 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-[#2b221a] pb-3 mb-4">
                    <div>
                      <h3 className="text-base font-bold text-[#f4efe9]">{selectedContact.subject}</h3>
                      <p className="text-xs text-[#9a8677]">From: {selectedContact.name} ({selectedContact.email})</p>
                    </div>
                    <button
                      onClick={() => setSelectedContact(null)}
                      className="rounded-xl border border-[#382d24] p-1.5 text-xs text-[#9a8677] hover:text-[#f4efe9]"
                    >
                      Close ✕
                    </button>
                  </div>

                  <div className="rounded-2xl bg-[#0f0c0a] p-4 border border-[#2b221a] mb-5">
                    <p className="text-xs text-[#f4efe9] whitespace-pre-wrap leading-relaxed">
                      {selectedContact.message}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#9a8677]">
                    <span>Sent: {new Date(selectedContact.created_at).toLocaleString()}</span>
                    <a
                      href={`mailto:${selectedContact.email}?subject=Re: ${encodeURIComponent(selectedContact.subject)}`}
                      className="rounded-xl bg-[#c48c56] px-4 py-2 font-semibold text-[#16120e] hover:bg-[#d59e69] transition-colors"
                    >
                      Reply via Email &rarr;
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── TAB 5: SECURITY & AUDIT ── */}
        {tab === "security" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-[#f4efe9]">Security & Authentication Audit</h2>
              <p className="text-xs text-[#9a8677]">
                Live inspection of login attempts, brute-force protection status, and admin access logs.
              </p>
            </div>

            {/* Policy Status Banner */}
            <div className="flex items-center justify-between rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/20 text-emerald-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-300">Brute Force Protection Active</h4>
                  <p className="text-xs text-emerald-200/80">
                    Max 3 failed login attempts locks out the offending IP address for 15 minutes.
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                ACTIVE
              </span>
            </div>

            {/* Audit Log Table */}
            <div className="rounded-3xl border border-[#2b221a] bg-[#16120e] overflow-hidden shadow-xl">
              <div className="px-5 py-4 border-b border-[#2b221a]">
                <h3 className="text-sm font-bold text-[#f4efe9]">Authentication Attempts Log</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-[#2b221a] bg-[#0f0c0a] text-[11px] font-semibold uppercase tracking-wider text-[#9a8677]">
                    <tr>
                      <th className="py-3 pl-4 pr-3">Status</th>
                      <th className="py-3 px-3">IP Address</th>
                      <th className="py-3 px-3">Attempted At</th>
                      <th className="py-3 pr-4 text-right">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#221b15]">
                    {authAttempts.map((att) => (
                      <tr key={att.id} className="hover:bg-[#1f1914] transition-colors">
                        <td className="py-3 pl-4 pr-3">
                          {att.success ? (
                            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-400 border border-emerald-500/20">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                              Success
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-md bg-red-500/15 px-2 py-0.5 text-[10px] font-medium text-red-400 border border-red-500/20">
                              <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                              Failed
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 font-mono text-[#f4efe9]">{att.ip}</td>
                        <td className="py-3 px-3 text-[#9a8677]">{new Date(att.attempted_at).toLocaleString()}</td>
                        <td className="py-3 pr-4 text-right text-[#9a8677]">
                          {att.success ? "Authenticated & Session Created" : "Rejected (Wrong Password)"}
                        </td>
                      </tr>
                    ))}
                    {authAttempts.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-sm text-[#9a8677]">
                          No login attempts recorded yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
