import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/app/lib/auth";
import { db } from "@/app/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const searchParams = req.nextUrl.searchParams;
    let selectedPage = searchParams.get("page");

    // Get list of all pages with recorded clicks
    const availablePages = db.prepare(`
      SELECT page_path, COUNT(*) as click_count
      FROM clicks
      GROUP BY page_path
      ORDER BY click_count DESC
    `).all() as { page_path: string; click_count: number }[];

    if (!selectedPage) {
      selectedPage = availablePages.length > 0 ? availablePages[0].page_path : "/en";
    }

    // Get clicks for this page
    const clicks = db.prepare(`
      SELECT
        id, page_x, page_y, x_percent, y_percent,
        viewport_w, viewport_h, doc_w, doc_h,
        target_tag, target_id, target_class, target_text,
        is_interactive, created_at
      FROM clicks
      WHERE page_path = ?
      ORDER BY id DESC
      LIMIT 2000
    `).all(selectedPage);

    // Get top clicked elements for this page
    const topElements = db.prepare(`
      SELECT
        COALESCE(target_tag, 'other') as tag,
        COALESCE(target_text, '') as text,
        COALESCE(target_id, '') as element_id,
        is_interactive,
        COUNT(*) as count
      FROM clicks
      WHERE page_path = ?
      GROUP BY target_tag, target_text, target_id
      ORDER BY count DESC
      LIMIT 15
    `).all(selectedPage);

    return NextResponse.json({
      page: selectedPage,
      availablePages,
      totalClicks: clicks.length,
      clicks,
      topElements,
    });
  } catch (error) {
    console.error("Heatmap API error:", error);
    return NextResponse.json({ error: "Failed to fetch heatmap data" }, { status: 500 });
  }
}
