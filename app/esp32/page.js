import Image from "next/image";
import { Header } from "@/components/Header";
import { FadeIn, ESP32Hero } from "@/components/ClientIslands";

/* ─── Main Page ─── */
export default function ESP32Page() {

  return (
    <main className="overflow-x-hidden min-h-screen bg-[var(--primary-bg-color)] text-[var(--text-heading)] selection:bg-[var(--primary-accent-color)] selection:text-[var(--text-heading)] pb-20">
      {/* Dynamic Background Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full opacity-20 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(139,44,64,0.8) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full opacity-10 blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(114,54,62,0.8) 0%, transparent 70%)",
          }}
        />
      </div>

      <Header />

      <ESP32Hero />

      {/* ── Content Sections ── */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-24 md:py-32 flex flex-col gap-16 sm:gap-24 md:gap-32">
        {/* Section 1 — The Setup */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <FadeIn direction="right">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#8B2C40] to-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-700 blur-2xl rounded-3xl"></div>
                {/* Arch Linux Terminal Diagram Card */}
                <div className="relative z-10 rounded-3xl shadow-2xl border border-[var(--glass-border)] bg-[#0A0A0A] backdrop-blur-md h-[400px] w-full flex flex-col overflow-hidden transform transition-transform duration-700 group-hover:scale-[1.02]">
                  {/* Terminal Header */}
                  <div className="flex items-center px-4 py-3 bg-[#1A1A1A] border-b border-[#333]">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <span className="ml-4 text-[var(--text-muted)] text-xs font-mono">root@archlinux:~</span>
                  </div>
                  {/* Terminal Body */}
                  <div className="flex-1 p-6 font-mono text-sm leading-relaxed overflow-hidden relative">
                    <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(#00FF00 1px, transparent 1px)", backgroundSize: "100% 4px" }}></div>
                    <div className="text-[#4AF626] opacity-90 mb-4">
                      $ pacman -Syu platformio-core avr-gcc<br/>
                      :: Synchronizing package databases...<br/>
                      core is up to date<br/>
                      extra is up to date<br/>
                      :: Starting full system upgrade...
                    </div>
                    <div className="text-[var(--primary-accent-color)] opacity-90 mb-4">
                      $ pio run -e esp32dev -t upload<br/>
                      Processing esp32dev (platform: espressif32; board: esp32dev; framework: arduino)<br/>
                      ---------------------------------------------------------<br/>
                      Verbose mode can be enabled via `-v, --verbose` option<br/>
                    </div>
                    <div className="text-[var(--text-heading)] opacity-90">
                      Linking .pio/build/esp32dev/firmware.elf<br/>
                      Building .pio/build/esp32dev/firmware.bin<br/>
                      esptool.py v4.5.1<br/>
                      <span className="text-[#4AF626]">SUCCESS: Uploaded to /dev/ttyUSB0</span><br/>
                      <span className="animate-pulse">_</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <FadeIn direction="left" delay={200}>
              <h2 className="text-sm font-bold tracking-widest text-[#ff4d6d] mb-3 uppercase">
                The Environment
              </h2>
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                Built on Arch Linux
              </h3>
              <p className="text-[var(--text-muted)] text-sm sm:text-base md:text-lg leading-relaxed">
                Setting up the Arduino development environment on Arch Linux was
                a journey in itself. From wrestling with drivers that refused to
                cooperate to configuring the toolchain for ESP32 compilation —
                every step was a battle against Linux&apos;s &ldquo;do it
                yourself&rdquo; philosophy. The driver issues alone consumed
                hours of debugging, but the payoff was a lean, powerful dev
                setup that worked exactly how I wanted.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Section 2 — The Animation */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
          <div className="w-full md:w-1/2">
            <FadeIn direction="right">
              <h2 className="text-sm font-bold tracking-widest text-[#ff4d6d] mb-3 uppercase">
                The Engineering
              </h2>
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                Optimized for Constraints
              </h3>
              <p className="text-[var(--text-muted)] text-sm sm:text-base md:text-lg leading-relaxed">
                The real challenge was fitting animation onto a 128x64 pixel
                OLED display. Color had to go entirely — every frame was
                converted to monochrome binary data. Resolution was deliberately
                reduced to keep frame data small enough for the ESP32&apos;s
                limited memory. Using the U8g2 library in C++, I built a custom
                rendering pipeline that decodes binary-encoded GIF frames and
                pushes them to the display at smooth framerates. The result
                caught attention — a demo posted on Instagram pulled in solid
                views.
              </p>
            </FadeIn>
          </div>
          <div className="w-full md:w-1/2">
            <FadeIn direction="left" delay={200}>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-bl from-[#8B2C40] to-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-700 blur-2xl rounded-3xl"></div>

                {/* OLED Rendering Pipeline Diagram */}
                <div className="relative z-10 rounded-3xl shadow-2xl border border-[var(--glass-border)] bg-[#0A0A0A] w-full h-[400px] flex flex-col overflow-hidden transform transition-transform duration-700 group-hover:scale-[1.02]">
                  {/* Card header */}
                  <div className="flex items-center justify-between px-4 py-3 bg-[#141414] border-b border-[#2a2a2a]">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <span className="text-[var(--text-muted)] text-xs font-mono tracking-widest">RENDER_PIPELINE.cpp</span>
                  </div>

                  {/* Pipeline body */}
                  <div className="flex-1 flex flex-col items-center justify-center gap-0 px-6 py-4 relative overflow-hidden">
                    {/* Subtle scanline bg */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(transparent 50%, rgba(255,77,109,0.8) 50%)", backgroundSize: "100% 4px" }}></div>

                    {/* Stage 1 */}
                    <div className="w-full flex items-center gap-3 z-10">
                      <div className="flex-1 border border-[#ff4d6d]/40 bg-[#ff4d6d]/08 rounded-lg p-2.5 text-center">
                        <div className="text-[#ff4d6d] text-xs font-mono font-bold">RAW GIF</div>
                        <div className="text-[var(--text-muted)] text-[10px] font-mono mt-0.5">source frames</div>
                      </div>
                      <svg width="24" height="12" viewBox="0 0 24 12"><path d="M0 6 L18 6 M13 1 L19 6 L13 11" stroke="#ff4d6d" strokeWidth="1.5" fill="none" opacity="0.6"/></svg>
                      <div className="flex-1 border border-[var(--glass-border)] bg-[var(--bg-glass)] rounded-lg p-2.5 text-center">
                        <div className="text-[var(--text-heading)] text-xs font-mono font-bold">BINARY ENC</div>
                        <div className="text-[var(--text-muted)] text-[10px] font-mono mt-0.5">1-bit dither</div>
                      </div>
                    </div>

                    {/* Connector down */}
                    <div className="w-px h-5 bg-gradient-to-b from-[var(--glass-border)] to-[#ff4d6d]/50 z-10"></div>

                    {/* Stage 2 — frame buffer */}
                    <div className="w-[70%] border border-[#ff4d6d]/50 bg-[#ff4d6d]/05 rounded-lg p-2.5 text-center z-10 shadow-[0_0_12px_rgba(255,77,109,0.15)]">
                      <div className="text-[#ff4d6d] text-xs font-mono font-bold tracking-wider">FRAME BUFFER</div>
                      <div className="text-[var(--text-muted)] text-[10px] font-mono mt-1">ESP32 SRAM  ·  512 bytes / frame</div>
                      {/* Mini pixel grid */}
                      <div className="mt-2 mx-auto w-fit grid grid-cols-8 gap-[2px]">
                        {Array.from({length: 32}).map((_, i) => (
                          <div key={i} className={`w-[6px] h-[6px] rounded-[1px] ${ [1,4,6,9,12,15,17,20,22,25,28,31].includes(i) ? 'bg-[#ff4d6d]' : 'bg-[#ff4d6d]/15' }`}></div>
                        ))}
                      </div>
                    </div>

                    {/* Connector down */}
                    <div className="w-px h-5 bg-gradient-to-b from-[#ff4d6d]/50 to-[var(--glass-border)] z-10"></div>

                    {/* Stage 3 */}
                    <div className="w-full flex items-center gap-3 z-10">
                      <div className="flex-1 border border-[var(--glass-border)] bg-[var(--bg-glass)] rounded-lg p-2.5 text-center">
                        <div className="text-[var(--text-heading)] text-xs font-mono font-bold">U8g2 LIB</div>
                        <div className="text-[var(--text-muted)] text-[10px] font-mono mt-0.5">C++ renderer</div>
                      </div>
                      <svg width="24" height="12" viewBox="0 0 24 12"><path d="M0 6 L18 6 M13 1 L19 6 L13 11" stroke="#ff4d6d" strokeWidth="1.5" fill="none" opacity="0.6"/></svg>
                      {/* OLED display */}
                      <div className="flex-1 border-2 border-[#ff4d6d]/70 rounded-lg p-2 text-center bg-black relative overflow-hidden shadow-[0_0_16px_rgba(255,77,109,0.25)]">
                        <div className="text-[#ff4d6d] text-[9px] font-mono font-bold">SSD1306</div>
                        <div className="text-[#ff4d6d]/60 text-[9px] font-mono">128 × 64 px</div>
                        {/* Tiny OLED pixel art */}
                        <div className="mt-1 mx-auto w-fit grid grid-cols-10 gap-[1.5px]">
                          {Array.from({length: 30}).map((_, i) => (
                            <div key={i} className={`w-[4px] h-[4px] rounded-[0.5px] ${ [2,3,6,8,11,14,15,17,19,21,24,26,29].includes(i) ? 'bg-[#ff4d6d] shadow-[0_0_3px_#ff4d6d]' : 'bg-transparent' }`}></div>
                          ))}
                        </div>
                        <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#ff4d6d] animate-pulse"></div>
                      </div>
                    </div>

                    {/* Bottom stats */}
                    <div className="mt-3 flex gap-4 z-10">
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">I2C @ <span className="text-[#ff4d6d]">400kHz</span></span>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">RAM: <span className="text-[#ff4d6d]">~14KB</span></span>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">FPS: <span className="text-[#ff4d6d]">~24</span></span>
                    </div>
                  </div>
                </div>

              </div>
            </FadeIn>
          </div>
        </div>

        {/* Section 3 — The Hardware */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <FadeIn direction="right">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#8B2C40] to-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-700 blur-2xl rounded-3xl"></div>
                {/* Schematic / wiring illustration using a styled card */}
                <div className="relative z-10 rounded-3xl shadow-2xl border border-[var(--glass-border)] bg-[var(--bg-glass)] backdrop-blur-md h-[400px] w-full flex flex-col items-center justify-center gap-6 p-8 transform transition-transform duration-700 group-hover:scale-[1.02]">
                  <svg
                    className="w-20 h-20 text-[#ff4d6d] opacity-60"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 004.5 8.25v9a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                  <div className="text-center">
                    <p className="text-[var(--text-body)] text-lg font-semibold mb-2">
                      I2C Wiring
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 text-sm font-mono">
                      {["VCC", "GND", "SDA", "SCL"].map((pin) => (
                        <span
                          key={pin}
                          className="px-3 py-1 rounded-full border border-[var(--glass-border)] bg-[var(--bg-glass)] text-[#ff4d6d]"
                        >
                          {pin}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <FadeIn direction="left" delay={200}>
              <h2 className="text-sm font-bold tracking-widest text-[#ff4d6d] mb-3 uppercase">
                The Wiring
              </h2>
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                Simple but Effective
              </h3>
              <p className="text-[var(--text-muted)] text-sm sm:text-base md:text-lg leading-relaxed">
                Despite the software complexity, the hardware side was
                refreshingly straightforward. The ESP32 connects to the SSD1306
                OLED via I2C — just four wires: VCC, GND, SDA, and SCL. Clean
                wiring, solid connections, and the display comes alive with
                custom animations.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

    </main>
  );
}
