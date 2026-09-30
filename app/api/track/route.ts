import { NextRequest, NextResponse } from "next/server";
import { recordVisitor, recordPageView, recordClick, ClickRecord } from "@/app/lib/db";
import { getClientIp, getGeoFromHeaders } from "@/app/lib/auth";
import { parseUserAgent } from "@/app/lib/ua-parser";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    if (!rawBody) {
      return NextResponse.json({ ok: true });
    }

    const payload = JSON.parse(rawBody);
    const ip = getClientIp(req);
    const { country, city } = getGeoFromHeaders(req);
    const userAgent = req.headers.get("user-agent") || undefined;
    const parsedUA = parseUserAgent(userAgent);

    const type = payload.type;

    if (type === "telemetry" || type === "session_start") {
      const visitorId = payload.visitor_id;
      if (visitorId && typeof visitorId === "string") {
        recordVisitor({
          visitor_id: visitorId,
          session_id: payload.session_id,
          ip,
          country: country || payload.country,
          city: city || payload.city,
          browser: parsedUA.browser,
          browser_version: parsedUA.browserVersion,
          os: parsedUA.os,
          os_version: parsedUA.osVersion,
          device_type: parsedUA.deviceType,
          user_agent: userAgent,
          screen_res: payload.screen_res,
          viewport_res: payload.viewport_res,
          dpr: payload.dpr ? Number(payload.dpr) : undefined,
          color_depth: payload.color_depth ? Number(payload.color_depth) : undefined,
          cpu_cores: payload.cpu_cores ? Number(payload.cpu_cores) : undefined,
          ram_gb: payload.ram_gb ? Number(payload.ram_gb) : undefined,
          connection_type: payload.connection_type,
          downlink_mbps: payload.downlink_mbps ? Number(payload.downlink_mbps) : undefined,
          rtt_ms: payload.rtt_ms ? Number(payload.rtt_ms) : undefined,
          save_data: payload.save_data ? 1 : 0,
          battery_level: payload.battery_level !== undefined ? Number(payload.battery_level) : undefined,
          is_charging: payload.is_charging !== undefined ? (payload.is_charging ? 1 : 0) : undefined,
          timezone: payload.timezone,
          language: payload.language,
          languages: payload.languages,
          prefers_dark: payload.prefers_dark !== undefined ? (payload.prefers_dark ? 1 : 0) : undefined,
          touch_support: payload.touch_support !== undefined ? (payload.touch_support ? 1 : 0) : undefined,
        });
      }
    }

    if (type === "page_view") {
      if (payload.visitor_id && payload.page_path) {
        recordPageView({
          visitor_id: payload.visitor_id,
          session_id: payload.session_id,
          page_path: payload.page_path,
          referrer: payload.referrer,
          ip,
          dwell_time_seconds: payload.dwell_time_seconds ? Number(payload.dwell_time_seconds) : 0,
        });
      }
    }

    if (type === "click") {
      if (payload.visitor_id && payload.page_path && payload.page_x !== undefined) {
        recordClick({
          visitor_id: payload.visitor_id,
          session_id: payload.session_id,
          page_path: payload.page_path,
          page_x: Number(payload.page_x),
          page_y: Number(payload.page_y),
          x_percent: Number(payload.x_percent || 0),
          y_percent: Number(payload.y_percent || 0),
          viewport_w: payload.viewport_w ? Number(payload.viewport_w) : undefined,
          viewport_h: payload.viewport_h ? Number(payload.viewport_h) : undefined,
          doc_w: payload.doc_w ? Number(payload.doc_w) : undefined,
          doc_h: payload.doc_h ? Number(payload.doc_h) : undefined,
          target_tag: payload.target_tag,
          target_id: payload.target_id,
          target_class: payload.target_class,
          target_text: payload.target_text,
          is_interactive: payload.is_interactive ? 1 : 0,
        });
      }
    }

    if (type === "batch_clicks" && Array.isArray(payload.clicks)) {
      for (const c of payload.clicks) {
        if (c.visitor_id && c.page_path && c.page_x !== undefined) {
          recordClick({
            visitor_id: c.visitor_id,
            session_id: c.session_id,
            page_path: c.page_path,
            page_x: Number(c.page_x),
            page_y: Number(c.page_y),
            x_percent: Number(c.x_percent || 0),
            y_percent: Number(c.y_percent || 0),
            viewport_w: c.viewport_w ? Number(c.viewport_w) : undefined,
            viewport_h: c.viewport_h ? Number(c.viewport_h) : undefined,
            doc_w: c.doc_w ? Number(c.doc_w) : undefined,
            doc_h: c.doc_h ? Number(c.doc_h) : undefined,
            target_tag: c.target_tag,
            target_id: c.target_id,
            target_class: c.target_class,
            target_text: c.target_text,
            is_interactive: c.is_interactive ? 1 : 0,
          });
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Telemetry error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
