import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";

// Ensure data directory exists in project root
const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, "portfolio.db");

// Singleton connection across Next.js module reloads
declare global {
  // eslint-disable-next-line no-var
  var __portfolio_db: DatabaseSync | undefined;
  // eslint-disable-next-line no-var
  var __portfolio_db_initialized: boolean | undefined;
}

export function getDatabase(): DatabaseSync {
  if (global.__portfolio_db) {
    return global.__portfolio_db;
  }

  const db = new DatabaseSync(dbPath);

  // Set 5-second busy timeout for concurrent threads/workers
  db.exec("PRAGMA busy_timeout = 5000;");
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec("PRAGMA synchronous = NORMAL;");

  if (!global.__portfolio_db_initialized) {
    // Initialize tables
    db.exec(`
      CREATE TABLE IF NOT EXISTS visitors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        visitor_id TEXT UNIQUE NOT NULL,
        session_id TEXT,
        ip TEXT,
        country TEXT,
        city TEXT,
        browser TEXT,
        browser_version TEXT,
        os TEXT,
        os_version TEXT,
        device_type TEXT,
        user_agent TEXT,
        screen_res TEXT,
        viewport_res TEXT,
        dpr REAL,
        color_depth INTEGER,
        cpu_cores INTEGER,
        ram_gb REAL,
        connection_type TEXT,
        downlink_mbps REAL,
        rtt_ms INTEGER,
        save_data INTEGER,
        battery_level REAL,
        is_charging INTEGER,
        timezone TEXT,
        language TEXT,
        languages TEXT,
        prefers_dark INTEGER,
        touch_support INTEGER,
        first_seen_at TEXT NOT NULL,
        last_seen_at TEXT NOT NULL,
        total_visits INTEGER DEFAULT 1
      );

      CREATE INDEX IF NOT EXISTS idx_visitors_visitor_id ON visitors(visitor_id);
      CREATE INDEX IF NOT EXISTS idx_visitors_last_seen ON visitors(last_seen_at);

      CREATE TABLE IF NOT EXISTS page_views (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        visitor_id TEXT NOT NULL,
        session_id TEXT,
        page_path TEXT NOT NULL,
        referrer TEXT,
        ip TEXT,
        dwell_time_seconds INTEGER DEFAULT 0,
        created_at TEXT NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_page_views_visitor ON page_views(visitor_id);
      CREATE INDEX IF NOT EXISTS idx_page_views_page ON page_views(page_path);
      CREATE INDEX IF NOT EXISTS idx_page_views_created ON page_views(created_at);

      CREATE TABLE IF NOT EXISTS clicks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        visitor_id TEXT NOT NULL,
        session_id TEXT,
        page_path TEXT NOT NULL,
        page_x INTEGER NOT NULL,
        page_y INTEGER NOT NULL,
        x_percent REAL NOT NULL,
        y_percent REAL NOT NULL,
        viewport_w INTEGER,
        viewport_h INTEGER,
        doc_w INTEGER,
        doc_h INTEGER,
        target_tag TEXT,
        target_id TEXT,
        target_class TEXT,
        target_text TEXT,
        is_interactive INTEGER DEFAULT 0,
        created_at TEXT NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_clicks_page ON clicks(page_path);
      CREATE INDEX IF NOT EXISTS idx_clicks_created ON clicks(created_at);

      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        visitor_id TEXT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        ip TEXT,
        locale TEXT,
        user_agent TEXT,
        is_read INTEGER DEFAULT 0,
        created_at TEXT NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_contacts_created ON contacts(created_at);

      CREATE TABLE IF NOT EXISTS auth_attempts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ip TEXT NOT NULL,
        success INTEGER NOT NULL,
        attempted_at TEXT NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_auth_ip_attempted ON auth_attempts(ip, attempted_at);
    `);
    global.__portfolio_db_initialized = true;
  }

  global.__portfolio_db = db;
  return db;
}

// Proxy wrapper for db object so accessing db.* calls getDatabase() lazily
export const db = new Proxy({} as DatabaseSync, {
  get(_target, prop) {
    const instance = getDatabase();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const val = (instance as any)[prop];
    if (typeof val === "function") {
      return val.bind(instance);
    }
    return val;
  },
});

export interface VisitorRecord {
  id?: number;
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
  first_seen_at?: string;
  last_seen_at?: string;
  total_visits?: number;
}

export interface PageViewRecord {
  visitor_id: string;
  session_id?: string;
  page_path: string;
  referrer?: string;
  ip?: string;
  dwell_time_seconds?: number;
  created_at?: string;
}

export interface ClickRecord {
  visitor_id: string;
  session_id?: string;
  page_path: string;
  page_x: number;
  page_y: number;
  x_percent: number;
  y_percent: number;
  viewport_w?: number;
  viewport_h?: number;
  doc_w?: number;
  doc_h?: number;
  target_tag?: string;
  target_id?: string;
  target_class?: string;
  target_text?: string;
  is_interactive?: number;
  created_at?: string;
}

export interface ContactRecord {
  id?: number;
  visitor_id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  ip?: string;
  locale?: string;
  user_agent?: string;
  is_read?: number;
  created_at?: string;
}

export interface AuthAttemptRecord {
  ip: string;
  success: number;
  attempted_at: string;
}

// ── Database Operations ────────────────────────────────────────────────────────

export function recordVisitor(data: VisitorRecord): void {
  const database = getDatabase();
  const now = new Date().toISOString();
  const existing = database
    .prepare("SELECT visitor_id, total_visits FROM visitors WHERE visitor_id = ?")
    .get(data.visitor_id) as { visitor_id: string; total_visits: number } | undefined;

  if (existing) {
    const update = database.prepare(`
      UPDATE visitors SET
        session_id = COALESCE(?, session_id),
        ip = COALESCE(?, ip),
        country = COALESCE(?, country),
        city = COALESCE(?, city),
        browser = COALESCE(?, browser),
        browser_version = COALESCE(?, browser_version),
        os = COALESCE(?, os),
        os_version = COALESCE(?, os_version),
        device_type = COALESCE(?, device_type),
        user_agent = COALESCE(?, user_agent),
        screen_res = COALESCE(?, screen_res),
        viewport_res = COALESCE(?, viewport_res),
        dpr = COALESCE(?, dpr),
        color_depth = COALESCE(?, color_depth),
        cpu_cores = COALESCE(?, cpu_cores),
        ram_gb = COALESCE(?, ram_gb),
        connection_type = COALESCE(?, connection_type),
        downlink_mbps = COALESCE(?, downlink_mbps),
        rtt_ms = COALESCE(?, rtt_ms),
        save_data = COALESCE(?, save_data),
        battery_level = COALESCE(?, battery_level),
        is_charging = COALESCE(?, is_charging),
        timezone = COALESCE(?, timezone),
        language = COALESCE(?, language),
        languages = COALESCE(?, languages),
        prefers_dark = COALESCE(?, prefers_dark),
        touch_support = COALESCE(?, touch_support),
        last_seen_at = ?,
        total_visits = total_visits + 1
      WHERE visitor_id = ?
    `);

    update.run(
      data.session_id ?? null,
      data.ip ?? null,
      data.country ?? null,
      data.city ?? null,
      data.browser ?? null,
      data.browser_version ?? null,
      data.os ?? null,
      data.os_version ?? null,
      data.device_type ?? null,
      data.user_agent ?? null,
      data.screen_res ?? null,
      data.viewport_res ?? null,
      data.dpr ?? null,
      data.color_depth ?? null,
      data.cpu_cores ?? null,
      data.ram_gb ?? null,
      data.connection_type ?? null,
      data.downlink_mbps ?? null,
      data.rtt_ms ?? null,
      data.save_data ?? null,
      data.battery_level ?? null,
      data.is_charging ?? null,
      data.timezone ?? null,
      data.language ?? null,
      data.languages ?? null,
      data.prefers_dark ?? null,
      data.touch_support ?? null,
      now,
      data.visitor_id
    );
  } else {
    const insert = database.prepare(`
      INSERT INTO visitors (
        visitor_id, session_id, ip, country, city, browser, browser_version,
        os, os_version, device_type, user_agent, screen_res, viewport_res,
        dpr, color_depth, cpu_cores, ram_gb, connection_type, downlink_mbps,
        rtt_ms, save_data, battery_level, is_charging, timezone, language,
        languages, prefers_dark, touch_support, first_seen_at, last_seen_at, total_visits
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, 1
      )
    `);

    insert.run(
      data.visitor_id,
      data.session_id ?? null,
      data.ip ?? null,
      data.country ?? null,
      data.city ?? null,
      data.browser ?? null,
      data.browser_version ?? null,
      data.os ?? null,
      data.os_version ?? null,
      data.device_type ?? null,
      data.user_agent ?? null,
      data.screen_res ?? null,
      data.viewport_res ?? null,
      data.dpr ?? null,
      data.color_depth ?? null,
      data.cpu_cores ?? null,
      data.ram_gb ?? null,
      data.connection_type ?? null,
      data.downlink_mbps ?? null,
      data.rtt_ms ?? null,
      data.save_data ?? null,
      data.battery_level ?? null,
      data.is_charging ?? null,
      data.timezone ?? null,
      data.language ?? null,
      data.languages ?? null,
      data.prefers_dark ?? null,
      data.touch_support ?? null,
      now,
      now
    );
  }
}

export function recordPageView(data: PageViewRecord): void {
  const database = getDatabase();
  const insert = database.prepare(`
    INSERT INTO page_views (visitor_id, session_id, page_path, referrer, ip, dwell_time_seconds, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  insert.run(
    data.visitor_id,
    data.session_id ?? null,
    data.page_path,
    data.referrer ?? null,
    data.ip ?? null,
    data.dwell_time_seconds ?? 0,
    data.created_at ?? new Date().toISOString()
  );
}

export function recordClick(data: ClickRecord): void {
  const database = getDatabase();
  const insert = database.prepare(`
    INSERT INTO clicks (
      visitor_id, session_id, page_path, page_x, page_y, x_percent, y_percent,
      viewport_w, viewport_h, doc_w, doc_h, target_tag, target_id, target_class,
      target_text, is_interactive, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insert.run(
    data.visitor_id,
    data.session_id ?? null,
    data.page_path,
    Math.round(data.page_x),
    Math.round(data.page_y),
    parseFloat(data.x_percent.toFixed(2)),
    parseFloat(data.y_percent.toFixed(2)),
    data.viewport_w ?? null,
    data.viewport_h ?? null,
    data.doc_w ?? null,
    data.doc_h ?? null,
    data.target_tag ?? null,
    data.target_id ?? null,
    data.target_class ?? null,
    data.target_text ? data.target_text.slice(0, 100) : null,
    data.is_interactive ? 1 : 0,
    data.created_at ?? new Date().toISOString()
  );
}

export function recordContact(data: ContactRecord): number {
  const database = getDatabase();
  const insert = database.prepare(`
    INSERT INTO contacts (visitor_id, name, email, subject, message, ip, locale, user_agent, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = insert.run(
    data.visitor_id ?? null,
    data.name,
    data.email,
    data.subject,
    data.message,
    data.ip ?? null,
    data.locale ?? "en",
    data.user_agent ?? null,
    data.created_at ?? new Date().toISOString()
  );
  return Number(result.lastInsertRowid);
}

export function checkBruteForceLockout(ip: string): {
  locked: boolean;
  remainingSeconds: number;
  failedCount: number;
} {
  const database = getDatabase();
  const windowMs = 15 * 60 * 1000;
  const sinceIso = new Date(Date.now() - windowMs).toISOString();

  const lastSuccess = database
    .prepare("SELECT attempted_at FROM auth_attempts WHERE ip = ? AND success = 1 ORDER BY id DESC LIMIT 1")
    .get(ip) as { attempted_at: string } | undefined;

  const effectiveSince = lastSuccess && lastSuccess.attempted_at > sinceIso
    ? lastSuccess.attempted_at
    : sinceIso;

  const failedRows = database
    .prepare(
      "SELECT attempted_at FROM auth_attempts WHERE ip = ? AND success = 0 AND attempted_at > ? ORDER BY id ASC"
    )
    .all(ip, effectiveSince) as { attempted_at: string }[];

  const failedCount = failedRows.length;
  if (failedCount >= 3) {
    const thirdFailedTime = new Date(failedRows[2].attempted_at).getTime();
    const unlockTime = thirdFailedTime + windowMs;
    const remainingMs = unlockTime - Date.now();
    if (remainingMs > 0) {
      return {
        locked: true,
        remainingSeconds: Math.ceil(remainingMs / 1000),
        failedCount,
      };
    }
  }

  return {
    locked: false,
    remainingSeconds: 0,
    failedCount,
  };
}

export function recordAuthAttempt(ip: string, success: boolean): void {
  const database = getDatabase();
  const insert = database.prepare(`
    INSERT INTO auth_attempts (ip, success, attempted_at)
    VALUES (?, ?, ?)
  `);
  insert.run(ip, success ? 1 : 0, new Date().toISOString());
}
