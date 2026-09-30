"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Generate or retrieve persistent UUID
function getPersistentId(key: string, storage: Storage): string {
  try {
    let id = storage.getItem(key);
    if (!id) {
      id = "v_" + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
      storage.setItem(key, id);
    }
    return id;
  } catch {
    return "anon_" + Math.random().toString(36).substring(2, 10);
  }
}

interface QueuedClick {
  visitor_id: string;
  session_id: string;
  page_path: string;
  page_x: number;
  page_y: number;
  x_percent: number;
  y_percent: number;
  viewport_w: number;
  viewport_h: number;
  doc_w: number;
  doc_h: number;
  target_tag: string;
  target_id?: string;
  target_class?: string;
  target_text?: string;
  is_interactive: boolean;
}

export function TelemetryProvider() {
  const pathname = usePathname();
  const clickQueueRef = useRef<QueuedClick[]>([]);
  const lastPathRef = useRef<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Avoid running telemetry on admin pages
    if (window.location.pathname.startsWith("/admin")) return;

    const visitorId = getPersistentId("portfolio_visitor_id", localStorage);
    const sessionId = getPersistentId("portfolio_session_id", sessionStorage);

    // 1. Collect Deep Hardware & Browser Telemetry
    const collectTelemetry = async () => {
      try {
        const screenRes = `${window.screen.width}x${window.screen.height}`;
        const viewportRes = `${window.innerWidth}x${window.innerHeight}`;
        const dpr = window.devicePixelRatio || 1;
        const colorDepth = window.screen.colorDepth || 24;
        const cpuCores = navigator.hardwareConcurrency || undefined;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const nav = navigator as any;
        const ramGb = nav.deviceMemory || undefined;

        // Network
        const conn = nav.connection || nav.mozConnection || nav.webkitConnection;
        const connectionType = conn ? conn.effectiveType || conn.type : undefined;
        const downlinkMbps = conn ? conn.downlink : undefined;
        const rttMs = conn ? conn.rtt : undefined;
        const saveData = conn ? (conn.saveData ? 1 : 0) : 0;

        // Battery
        let batteryLevel: number | undefined;
        let isCharging: boolean | undefined;
        if (typeof nav.getBattery === "function") {
          try {
            const battery = await nav.getBattery();
            batteryLevel = Math.round(battery.level * 100);
            isCharging = battery.charging;
          } catch {
            // Ignore battery API errors
          }
        }

        // Environment & Preferences
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const language = navigator.language;
        const languages = navigator.languages ? navigator.languages.join(", ") : language;
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches ? 1 : 0;
        const touchSupport =
          "ontouchstart" in window || navigator.maxTouchPoints > 0 ? 1 : 0;

        const payload = {
          type: "telemetry",
          visitor_id: visitorId,
          session_id: sessionId,
          screen_res: screenRes,
          viewport_res: viewportRes,
          dpr,
          color_depth: colorDepth,
          cpu_cores: cpuCores,
          ram_gb: ramGb,
          connection_type: connectionType,
          downlink_mbps: downlinkMbps,
          rtt_ms: rttMs,
          save_data: saveData,
          battery_level: batteryLevel,
          is_charging: isCharging,
          timezone,
          language,
          languages,
          prefers_dark: prefersDark,
          touch_support: touchSupport,
        };

        fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          keepalive: true,
        }).catch(() => {});
      } catch (err) {
        console.debug("Telemetry error:", err);
      }
    };

    collectTelemetry();

    // 2. Click Heatmap Telemetry Handler
    const flushClicks = () => {
      if (clickQueueRef.current.length === 0) return;
      const batch = [...clickQueueRef.current];
      clickQueueRef.current = [];

      const payload = JSON.stringify({
        type: "batch_clicks",
        clicks: batch,
      });

      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/track", payload);
      } else {
        fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    };

    const handleClick = (e: MouseEvent) => {
      try {
        const target = e.target as HTMLElement | null;
        if (!target) return;

        // Skip tracking clicks inside inputs if password
        if (target.tagName === "INPUT" && (target as HTMLInputElement).type === "password") {
          return;
        }

        const docW = Math.max(
          document.body.scrollWidth,
          document.documentElement.scrollWidth,
          window.innerWidth
        );
        const docH = Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          window.innerHeight
        );

        const pageX = e.pageX;
        const pageY = e.pageY;
        const xPercent = (pageX / (docW || 1)) * 100;
        const yPercent = (pageY / (docH || 1)) * 100;

        const interactiveElement = target.closest("a, button, input, textarea, select, [role='button']");
        const isInteractive = Boolean(interactiveElement);

        const targetText = (target.innerText || target.textContent || "").trim().slice(0, 60);

        clickQueueRef.current.push({
          visitor_id: visitorId,
          session_id: sessionId,
          page_path: window.location.pathname,
          page_x: pageX,
          page_y: pageY,
          x_percent: xPercent,
          y_percent: yPercent,
          viewport_w: window.innerWidth,
          viewport_h: window.innerHeight,
          doc_w: docW,
          doc_h: docH,
          target_tag: target.tagName.toLowerCase(),
          target_id: target.id || undefined,
          target_class: typeof target.className === "string" ? target.className.slice(0, 100) : undefined,
          target_text: targetText || undefined,
          is_interactive: isInteractive,
        });

        // Flush if queue reaches 5 clicks
        if (clickQueueRef.current.length >= 5) {
          flushClicks();
        }
      } catch (err) {
        console.debug("Click telemetry error:", err);
      }
    };

    // Global click listener
    document.addEventListener("click", handleClick, { passive: true, capture: true });

    // Periodic flush every 3 seconds
    const intervalId = window.setInterval(flushClicks, 3000);

    // Flush before leaving
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        flushClicks();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", flushClicks);

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", flushClicks);
      flushClicks();
    };
  }, []);

  // 3. Track Page Views on navigation
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname.startsWith("/admin")) return;
    if (lastPathRef.current === pathname) return;
    lastPathRef.current = pathname;

    const visitorId = getPersistentId("portfolio_visitor_id", localStorage);
    const sessionId = getPersistentId("portfolio_session_id", sessionStorage);

    const recordView = () => {
      const payload = {
        type: "page_view",
        visitor_id: visitorId,
        session_id: sessionId,
        page_path: pathname,
        referrer: document.referrer || undefined,
      };

      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    };

    // Small delay to allow title / document state to resolve
    const timer = setTimeout(recordView, 250);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
