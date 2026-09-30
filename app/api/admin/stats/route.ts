import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/app/lib/auth";
import { db } from "@/app/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const today = new Date().toISOString().slice(0, 10);

    // 1. Metric Counts
    const totalVisitors = (
      db.prepare("SELECT COUNT(*) as count FROM visitors").get() as { count: number }
    )?.count || 0;

    const totalPageViews = (
      db.prepare("SELECT COUNT(*) as count FROM page_views").get() as { count: number }
    )?.count || 0;

    const totalClicks = (
      db.prepare("SELECT COUNT(*) as count FROM clicks").get() as { count: number }
    )?.count || 0;

    const totalContacts = (
      db.prepare("SELECT COUNT(*) as count FROM contacts").get() as { count: number }
    )?.count || 0;

    const unreadContacts = (
      db.prepare("SELECT COUNT(*) as count FROM contacts WHERE is_read = 0").get() as { count: number }
    )?.count || 0;

    const viewsToday = (
      db.prepare("SELECT COUNT(*) as count FROM page_views WHERE created_at >= ?").get(`${today}T00:00:00.000Z`) as { count: number }
    )?.count || 0;

    const visitorsToday = (
      db.prepare("SELECT COUNT(*) as count FROM visitors WHERE last_seen_at >= ?").get(`${today}T00:00:00.000Z`) as { count: number }
    )?.count || 0;

    // 2. Daily Views for last 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const dailyViews = db.prepare(`
      SELECT SUBSTR(created_at, 1, 10) as date, COUNT(*) as count
      FROM page_views
      WHERE created_at >= ?
      GROUP BY SUBSTR(created_at, 1, 10)
      ORDER BY date ASC
    `).all(`${thirtyDaysAgo}T00:00:00.000Z`) as { date: string; count: number }[];

    // 3. Top Pages
    const topPages = db.prepare(`
      SELECT page_path, COUNT(*) as views, COUNT(DISTINCT visitor_id) as unique_visitors
      FROM page_views
      GROUP BY page_path
      ORDER BY views DESC
      LIMIT 10
    `).all() as { page_path: string; views: number; unique_visitors: number }[];

    // 4. Device / Browser / OS breakdowns
    const browserBreakdown = db.prepare(`
      SELECT COALESCE(browser, 'Unknown') as name, COUNT(*) as count
      FROM visitors
      GROUP BY browser
      ORDER BY count DESC
      LIMIT 6
    `).all() as { name: string; count: number }[];

    const osBreakdown = db.prepare(`
      SELECT COALESCE(os, 'Unknown') as name, COUNT(*) as count
      FROM visitors
      GROUP BY os
      ORDER BY count DESC
      LIMIT 6
    `).all() as { name: string; count: number }[];

    const deviceBreakdown = db.prepare(`
      SELECT COALESCE(device_type, 'Desktop') as name, COUNT(*) as count
      FROM visitors
      GROUP BY device_type
      ORDER BY count DESC
    `).all() as { name: string; count: number }[];

    // 5. Recent Detailed Visitors (latest 50)
    const recentVisitors = db.prepare(`
      SELECT *
      FROM visitors
      ORDER BY last_seen_at DESC
      LIMIT 50
    `).all();

    // 6. Recent Contacts (latest 50)
    const contacts = db.prepare(`
      SELECT *
      FROM contacts
      ORDER BY created_at DESC
      LIMIT 50
    `).all();

    // 7. Security Audit Log (latest 50 auth attempts)
    const authAttempts = db.prepare(`
      SELECT *
      FROM auth_attempts
      ORDER BY attempted_at DESC
      LIMIT 50
    `).all();

    return NextResponse.json({
      metrics: {
        totalVisitors,
        totalPageViews,
        totalClicks,
        totalContacts,
        unreadContacts,
        viewsToday,
        visitorsToday,
      },
      dailyViews,
      topPages,
      breakdowns: {
        browser: browserBreakdown,
        os: osBreakdown,
        device: deviceBreakdown,
      },
      recentVisitors,
      contacts,
      authAttempts,
    });
  } catch (error) {
    console.error("Stats API error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}

/**
 * Handles updating contact status (e.g. mark as read).
 */
export async function PATCH(req: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, is_read } = body;

    if (!id) {
      return NextResponse.json({ error: "Contact ID required" }, { status: 400 });
    }

    db.prepare("UPDATE contacts SET is_read = ? WHERE id = ?").run(is_read ? 1 : 0, id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update contact error:", error);
    return NextResponse.json({ error: "Failed to update contact" }, { status: 500 });
  }
}
