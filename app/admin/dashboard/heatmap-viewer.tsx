"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface ClickItem {
  id: number;
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
  is_interactive: number;
  created_at: string;
}

interface TopElement {
  tag: string;
  text: string;
  element_id: string;
  is_interactive: number;
  count: number;
}

export function HeatmapViewer() {
  const [selectedPage, setSelectedPage] = useState("/en");
  const [availablePages, setAvailablePages] = useState<{ page_path: string; click_count: number }[]>([]);
  const [clicks, setClicks] = useState<ClickItem[]>([]);
  const [topElements, setTopElements] = useState<TopElement[]>([]);
  const [loading, setLoading] = useState(true);
  const [radius, setRadius] = useState(30);
  const [opacity, setOpacity] = useState(0.75);
  const [mode, setMode] = useState<"heat" | "dots">("heat");
  const [viewStyle, setViewStyle] = useState<"iframe" | "blueprint">("iframe");
  const [hoveredClick, setHoveredClick] = useState<ClickItem | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const fetchHeatmapData = useCallback(async (page: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/heatmap?page=${encodeURIComponent(page)}`);
      if (res.ok) {
        const data = await res.json();
        setClicks(data.clicks || []);
        setTopElements(data.topElements || []);
        if (data.availablePages && data.availablePages.length > 0) {
          setAvailablePages(data.availablePages);
        }
      }
    } catch (err) {
      console.error("Heatmap load error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHeatmapData(selectedPage);
  }, [selectedPage, fetchHeatmapData]);

  // Render heatmap onto Canvas
  const drawHeatmap = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    if (clicks.length === 0) return;

    if (mode === "dots") {
      // Draw individual click dots
      for (const click of clicks) {
        // Calculate coordinate based on percentage or direct coordinates
        const x = (click.x_percent / 100) * width;
        const y = (click.y_percent / 100) * height;

        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = click.is_interactive ? "rgba(16, 185, 129, 0.85)" : "rgba(245, 158, 11, 0.85)";
        ctx.fill();

        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();
      }
      return;
    }

    // ── Mode: Radial Heatmap (Density Gradients) ──
    // Step 1: Create an offscreen canvas for alpha blending
    const offscreen = document.createElement("canvas");
    offscreen.width = width;
    offscreen.height = height;
    const offCtx = offscreen.getContext("2d");
    if (!offCtx) return;

    offCtx.clearRect(0, 0, width, height);

    for (const click of clicks) {
      const x = (click.x_percent / 100) * width;
      const y = (click.y_percent / 100) * height;

      const radialGrad = offCtx.createRadialGradient(x, y, 0, x, y, radius);
      radialGrad.addColorStop(0, "rgba(0,0,0,1)");
      radialGrad.addColorStop(1, "rgba(0,0,0,0)");

      offCtx.fillStyle = radialGrad;
      offCtx.beginPath();
      offCtx.arc(x, y, radius, 0, Math.PI * 2);
      offCtx.fill();
    }

    // Step 2: Create Color Gradient Palette
    const paletteCanvas = document.createElement("canvas");
    paletteCanvas.width = 256;
    paletteCanvas.height = 1;
    const paletteCtx = paletteCanvas.getContext("2d");
    if (!paletteCtx) return;

    const grad = paletteCtx.createLinearGradient(0, 0, 256, 1);
    grad.addColorStop(0.0, "rgba(0, 0, 255, 0)");
    grad.addColorStop(0.2, "rgba(0, 220, 255, 0.7)");
    grad.addColorStop(0.45, "rgba(0, 255, 100, 0.85)");
    grad.addColorStop(0.7, "rgba(255, 230, 0, 0.95)");
    grad.addColorStop(0.9, "rgba(255, 70, 0, 1)");
    grad.addColorStop(1.0, "rgba(255, 0, 0, 1)");

    paletteCtx.fillStyle = grad;
    paletteCtx.fillRect(0, 0, 256, 1);
    const palette = paletteCtx.getImageData(0, 0, 256, 1).data;

    // Step 3: Colorize the alpha image
    const imgData = offCtx.getImageData(0, 0, width, height);
    const pixels = imgData.data;

    for (let i = 3; i < pixels.length; i += 4) {
      const alpha = pixels[i];
      if (alpha > 0) {
        const offset = alpha * 4;
        pixels[i - 3] = palette[offset];     // R
        pixels[i - 2] = palette[offset + 1]; // G
        pixels[i - 1] = palette[offset + 2]; // B
        pixels[i] = Math.round(alpha * opacity); // A
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }, [clicks, mode, radius, opacity]);

  // Adjust canvas size to match container
  const updateCanvasDimensions = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const rect = container.getBoundingClientRect();
    const w = Math.round(rect.width);
    const h = Math.round(rect.height);

    if (w > 0 && h > 0 && (canvas.width !== w || canvas.height !== h)) {
      canvas.width = w;
      canvas.height = h;
      drawHeatmap();
    }
  }, [drawHeatmap]);

  useEffect(() => {
    updateCanvasDimensions();
    const handleResize = () => updateCanvasDimensions();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateCanvasDimensions, clicks]);

  useEffect(() => {
    drawHeatmap();
  }, [drawHeatmap]);

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || clicks.length === 0) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Find closest click within 15px
    let closest: ClickItem | null = null;
    let minDist = 25;

    for (const c of clicks) {
      const cx = (c.x_percent / 100) * canvas.width;
      const cy = (c.y_percent / 100) * canvas.height;
      const dist = Math.hypot(mouseX - cx, mouseY - cy);
      if (dist < minDist) {
        minDist = dist;
        closest = c;
      }
    }

    setHoveredClick(closest);
  };

  const pagesList = availablePages.length > 0
    ? availablePages
    : [
        { page_path: "/en", click_count: 0 },
        { page_path: "/en/contact", click_count: 0 },
        { page_path: "/en/about", click_count: 0 },
        { page_path: "/en/projects", click_count: 0 },
        { page_path: "/mn", click_count: 0 },
      ];

  return (
    <div className="space-y-6">
      {/* Heatmap Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#2b221a] bg-[#16120e] p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#9a8677] mb-1">
              Select Page
            </label>
            <select
              value={selectedPage}
              onChange={(e) => setSelectedPage(e.target.value)}
              className="rounded-xl border border-[#382d24] bg-[#0f0c0a] px-3.5 py-2 text-sm text-[#f4efe9] focus:border-[#c48c56] focus:outline-none"
            >
              {pagesList.map((p) => (
                <option key={p.page_path} value={p.page_path}>
                  {p.page_path} ({p.click_count} clicks)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#9a8677] mb-1">
              Display Mode
            </label>
            <div className="inline-flex rounded-xl border border-[#382d24] bg-[#0f0c0a] p-1 text-xs">
              <button
                type="button"
                onClick={() => setMode("heat")}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  mode === "heat"
                    ? "bg-[#c48c56] text-[#16120e] font-semibold"
                    : "text-[#9a8677] hover:text-[#f4efe9]"
                }`}
              >
                Heat Density
              </button>
              <button
                type="button"
                onClick={() => setMode("dots")}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  mode === "dots"
                    ? "bg-[#c48c56] text-[#16120e] font-semibold"
                    : "text-[#9a8677] hover:text-[#f4efe9]"
                }`}
              >
                Click Dots
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#9a8677] mb-1">
              Backdrop
            </label>
            <div className="inline-flex rounded-xl border border-[#382d24] bg-[#0f0c0a] p-1 text-xs">
              <button
                type="button"
                onClick={() => setViewStyle("iframe")}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  viewStyle === "iframe"
                    ? "bg-[#382d24] text-[#f4efe9]"
                    : "text-[#9a8677] hover:text-[#f4efe9]"
                }`}
              >
                Live Page
              </button>
              <button
                type="button"
                onClick={() => setViewStyle("blueprint")}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  viewStyle === "blueprint"
                    ? "bg-[#382d24] text-[#f4efe9]"
                    : "text-[#9a8677] hover:text-[#f4efe9]"
                }`}
              >
                Dark Grid
              </button>
            </div>
          </div>
        </div>

        {/* Sliders */}
        <div className="flex flex-wrap items-center gap-5">
          {mode === "heat" && (
            <div>
              <div className="flex justify-between text-[11px] text-[#9a8677] mb-1">
                <span>Radius</span>
                <span>{radius}px</span>
              </div>
              <input
                type="range"
                min="15"
                max="60"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-24 accent-[#c48c56] cursor-pointer"
              />
            </div>
          )}

          <div>
            <div className="flex justify-between text-[11px] text-[#9a8677] mb-1">
              <span>Opacity</span>
              <span>{Math.round(opacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="1.0"
              step="0.05"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-24 accent-[#c48c56] cursor-pointer"
            />
          </div>

          <button
            type="button"
            onClick={() => fetchHeatmapData(selectedPage)}
            className="rounded-xl border border-[#382d24] bg-[#0f0c0a] px-3.5 py-2 text-xs font-semibold text-[#f4efe9] hover:border-[#c48c56] transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Heatmap Stage & Canvas View */}
      <div className="relative rounded-3xl border border-[#2b221a] bg-[#16120e] p-2 sm:p-4 overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-3 py-2 border-b border-[#2b221a] mb-2 text-xs text-[#9a8677]">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-[#f4efe9]">{selectedPage}</span>
            <span>&bull;</span>
            <span>{clicks.length} total clicks recorded</span>
          </div>
          {hoveredClick && (
            <div className="text-[11px] text-amber-300 font-mono bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 truncate max-w-md">
              Tag: &lt;{hoveredClick.target_tag}&gt;
              {hoveredClick.target_text && ` "${hoveredClick.target_text}"`}
              {hoveredClick.is_interactive ? " [Interactive]" : ""}
            </div>
          )}
        </div>

        {/* Scaled viewport container */}
        <div
          ref={containerRef}
          className="relative w-full h-[680px] rounded-2xl overflow-hidden border border-[#2b221a] bg-[#090706]"
        >
          {viewStyle === "iframe" ? (
            <iframe
              ref={iframeRef}
              src={selectedPage}
              title="Page Preview"
              className="w-full h-full border-0 pointer-events-none opacity-85 select-none"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-[radial-gradient(#2b221a_1px,transparent_1px)] [background-size:20px_20px]">
              <div className="max-w-md p-6 rounded-2xl border border-[#2b221a] bg-[#16120e]/80 backdrop-blur-md">
                <p className="text-sm font-semibold text-[#f4efe9]">Technical Coordinate Blueprint</p>
                <p className="mt-1 text-xs text-[#9a8677]">
                  Showing normalized click density plotted directly onto document coordinates without page distractions.
                </p>
              </div>
            </div>
          )}

          {/* Interactive Heatmap Overlay Canvas */}
          <canvas
            ref={canvasRef}
            onMouseMove={handleCanvasMouseMove}
            onMouseLeave={() => setHoveredClick(null)}
            className="absolute inset-0 z-10 w-full h-full cursor-crosshair"
          />

          {loading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#090706]/70 backdrop-blur-sm">
              <div className="flex items-center gap-3 rounded-xl bg-[#16120e] px-5 py-3 border border-[#382d24]">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#c48c56] border-t-transparent" />
                <span className="text-sm text-[#f4efe9]">Loading heatmap telemetry...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Top Clicked Elements Breakdown */}
      <div className="rounded-3xl border border-[#2b221a] bg-[#16120e] p-6">
        <h3 className="text-base font-bold text-[#f4efe9] mb-4 flex items-center gap-2">
          <span>Top Clicked Elements on {selectedPage}</span>
          <span className="text-xs font-normal text-[#9a8677]">(Highest user interaction density)</span>
        </h3>

        {topElements.length === 0 ? (
          <p className="text-sm text-[#9a8677]">No click interactions recorded on this page yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#2b221a] text-xs font-semibold uppercase tracking-wider text-[#9a8677]">
                  <th className="pb-3 pr-4">Element / Tag</th>
                  <th className="pb-3 pr-4">Inner Text / Label</th>
                  <th className="pb-3 pr-4">Type</th>
                  <th className="pb-3 pr-4 text-right">Clicks</th>
                  <th className="pb-3 text-right">Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#221b15]">
                {topElements.map((el, i) => {
                  const share = clicks.length > 0 ? Math.round((el.count / clicks.length) * 100) : 0;
                  return (
                    <tr key={i} className="hover:bg-[#1f1914] transition-colors">
                      <td className="py-3 pr-4 font-mono text-xs text-[#c48c56]">
                        &lt;{el.tag}&gt; {el.element_id && `#${el.element_id}`}
                      </td>
                      <td className="py-3 pr-4 text-xs text-[#f4efe9] max-w-xs truncate">
                        {el.text || <span className="text-[#6e5d50] italic">None (blank / icon)</span>}
                      </td>
                      <td className="py-3 pr-4 text-xs">
                        {el.is_interactive ? (
                          <span className="inline-block rounded-md bg-emerald-500/15 px-2 py-0.5 text-[11px] font-medium text-emerald-400 border border-emerald-500/20">
                            Interactive
                          </span>
                        ) : (
                          <span className="inline-block rounded-md bg-[#2b221a] px-2 py-0.5 text-[11px] text-[#9a8677]">
                            Container
                          </span>
                        )}
                      </td>
                      <td className="py-3 pr-4 text-right font-semibold text-[#f4efe9]">
                        {el.count}
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 h-1.5 rounded-full bg-[#2b221a] overflow-hidden">
                            <div
                              className="h-full bg-[#c48c56] rounded-full"
                              style={{ width: `${Math.min(100, share)}%` }}
                            />
                          </div>
                          <span className="text-xs text-[#9a8677] w-8">{share}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
