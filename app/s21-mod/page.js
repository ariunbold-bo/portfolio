import { Header } from "@/components/Header";
import { FadeIn, S21Hero } from "@/components/ClientIslands";

export default function S21ModPage() {

  return (
    <main className="overflow-x-hidden min-h-screen bg-[var(--primary-bg-color)] text-[var(--text-heading)] selection:bg-[var(--primary-accent-color)] selection:text-[var(--text-heading)] pb-20">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full opacity-20 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, var(--gradient-blob-1) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full opacity-10 blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, var(--gradient-blob-2) 0%, transparent 70%)",
          }}
        />
      </div>

      <Header />

      <S21Hero />

      {/* Content Sections */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-24 md:py-32 flex flex-col gap-16 sm:gap-24 md:gap-32">
        {/* Section 1: The Build */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <FadeIn direction="right">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--primary-accent-color)] to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-700 blur-2xl rounded-3xl"></div>
                {/* Hybrid Video/Schematic Diagram Card */}
                <div className="relative z-10 rounded-3xl shadow-2xl border border-[var(--glass-border)] bg-[var(--bg-glass)] backdrop-blur-md w-full flex flex-col overflow-hidden transform transition-transform duration-700 group-hover:scale-[1.02]">
                  <div className="p-4 border-b border-[var(--glass-border)] flex justify-between items-center bg-[var(--bg-glass-hover)]">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <span className="text-[var(--text-muted)] text-xs font-mono tracking-widest">THERMAL_MONITOR_UI</span>
                  </div>
                  <div className="relative w-full aspect-[4/5] bg-black/40 flex items-center justify-center p-6">
                    {/* Schematic grid background */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(var(--primary-accent-color) 1px, transparent 1px), linear-gradient(90deg, var(--primary-accent-color) 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                    
                    {/* Phone + Cooling Schematic */}
                    <div className="relative w-[75%] h-[85%] rounded-xl overflow-hidden shadow-2xl border border-[var(--primary-accent-color)]/30 z-10 bg-black/60 flex items-center justify-center">
                      <svg viewBox="0 0 220 340" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        {/* Phone body */}
                        <rect x="55" y="20" width="110" height="200" rx="14" ry="14" fill="none" stroke="#ff4d6d" strokeWidth="1.5" opacity="0.7"/>
                        {/* Screen */}
                        <rect x="63" y="36" width="94" height="148" rx="4" fill="rgba(255,77,109,0.04)" stroke="rgba(255,77,109,0.25)" strokeWidth="1"/>
                        {/* Camera notch */}
                        <rect x="98" y="24" width="24" height="6" rx="3" fill="rgba(255,77,109,0.3)"/>
                        {/* Home indicator */}
                        <rect x="95" y="206" width="30" height="3" rx="1.5" fill="rgba(255,77,109,0.4)"/>

                        {/* CPU / SoC chip inside phone */}
                        <rect x="88" y="90" width="44" height="44" rx="4" fill="rgba(255,77,109,0.12)" stroke="#ff4d6d" strokeWidth="1" strokeDasharray="3 2"/>
                        <text x="110" y="108" textAnchor="middle" fill="#ff4d6d" fontSize="7" fontFamily="monospace" opacity="0.9">Snapdragon</text>
                        <text x="110" y="118" textAnchor="middle" fill="#ff4d6d" fontSize="7" fontFamily="monospace" opacity="0.9">888  SoC</text>
                        <text x="110" y="127" textAnchor="middle" fill="rgba(255,77,109,0.6)" fontSize="6" fontFamily="monospace">3.0 GHz</text>

                        {/* Heat waves from CPU */}
                        <path d="M 100 86 Q 97 78 100 70 Q 103 62 100 54" fill="none" stroke="#ff4d6d" strokeWidth="1" opacity="0.5" strokeLinecap="round"/>
                        <path d="M 110 84 Q 107 74 110 64 Q 113 54 110 44" fill="none" stroke="#ff4d6d" strokeWidth="1" opacity="0.7" strokeLinecap="round"/>
                        <path d="M 120 86 Q 123 78 120 70 Q 117 62 120 54" fill="none" stroke="#ff4d6d" strokeWidth="1" opacity="0.5" strokeLinecap="round"/>

                        {/* Fan circle on back — sits on top of phone */}
                        <circle cx="110" cy="165" r="26" fill="rgba(255,77,109,0.06)" stroke="#ff4d6d" strokeWidth="1.2" opacity="0.8"/>
                        <circle cx="110" cy="165" r="5" fill="rgba(255,77,109,0.2)" stroke="#ff4d6d" strokeWidth="1"/>
                        {/* Fan blades */}
                        {[0,60,120,180,240,300].map((deg, i) => {
                          const rad = (deg * Math.PI) / 180;
                          const x2 = 110 + 20 * Math.cos(rad);
                          const y2 = 165 + 20 * Math.sin(rad);
                          const cx2 = 110 + 12 * Math.cos(rad - 0.6);
                          const cy2 = 165 + 12 * Math.sin(rad - 0.6);
                          return <path key={i} d={`M 110 165 Q ${cx2} ${cy2} ${x2} ${y2}`} fill="none" stroke="#ff4d6d" strokeWidth="1.2" opacity="0.7" strokeLinecap="round"/>;
                        })}
                        <text x="110" y="200" textAnchor="middle" fill="rgba(255,77,109,0.6)" fontSize="6" fontFamily="monospace">ACTIVE FAN</text>

                        {/* Airflow arrows — left side exhaust */}
                        <path d="M 42 150 L 54 150" fill="none" stroke="rgba(255,77,109,0.5)" strokeWidth="1" markerEnd="url(#arrow)"/>
                        <path d="M 38 160 L 54 160" fill="none" stroke="rgba(255,77,109,0.5)" strokeWidth="1" markerEnd="url(#arrow)"/>
                        <path d="M 42 170 L 54 170" fill="none" stroke="rgba(255,77,109,0.5)" strokeWidth="1" markerEnd="url(#arrow)"/>
                        <text x="28" y="148" fill="rgba(255,77,109,0.45)" fontSize="5.5" fontFamily="monospace">OUT</text>

                        {/* Airflow arrows — right side intake */}
                        <path d="M 178 150 L 166 150" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" markerEnd="url(#arrowWhite)"/>
                        <path d="M 182 160 L 166 160" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" markerEnd="url(#arrowWhite)"/>
                        <path d="M 178 170 L 166 170" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" markerEnd="url(#arrowWhite)"/>
                        <text x="179" y="148" fill="rgba(255,255,255,0.3)" fontSize="5.5" fontFamily="monospace">IN</text>

                        {/* Temp label */}
                        <rect x="70" y="230" width="80" height="20" rx="4" fill="rgba(255,77,109,0.1)" stroke="rgba(255,77,109,0.3)" strokeWidth="0.8"/>
                        <text x="110" y="243" textAnchor="middle" fill="#ff4d6d" fontSize="7.5" fontFamily="monospace">ΔT = −10°C  |  ηcool = 91%</text>

                        {/* Corner labels */}
                        <text x="58" y="17" fill="rgba(255,77,109,0.4)" fontSize="6" fontFamily="monospace">Samsung S21</text>
                        <text x="140" y="17" fill="rgba(255,77,109,0.4)" fontSize="6" fontFamily="monospace">rev 1.0</text>

                        {/* Arrow defs */}
                        <defs>
                          <marker id="arrow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                            <path d="M0,0 L5,2.5 L0,5 Z" fill="rgba(255,77,109,0.5)"/>
                          </marker>
                          <marker id="arrowWhite" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                            <path d="M0,0 L5,2.5 L0,5 Z" fill="rgba(255,255,255,0.3)"/>
                          </marker>
                        </defs>
                      </svg>

                      {/* HUD Overlays */}
                      <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded border border-[var(--primary-accent-color)]/50 text-[10px] font-mono text-[#ff4d6d] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d6d] animate-pulse"></span>
                        SYS_ACTIVE
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded border border-[var(--primary-accent-color)]/50 text-[10px] font-mono text-[#ff4d6d]">
                        RPM: 2400
                      </div>
                    </div>
                    
                    {/* Floating Schematic Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M 20 100 L 60 100 L 80 150" fill="none" stroke="var(--primary-accent-color)" strokeWidth="1" strokeDasharray="4 4" opacity="0.6"/>
                      <circle cx="80" cy="150" r="3" fill="var(--primary-accent-color)"/>
                      <text x="20" y="90" fill="var(--text-muted)" fontSize="10" fontFamily="monospace">Air Intake</text>
                      
                      <path d="M 380 300 L 340 300 L 320 250" fill="none" stroke="var(--primary-accent-color)" strokeWidth="1" strokeDasharray="4 4" opacity="0.6"/>
                      <circle cx="320" cy="250" r="3" fill="var(--primary-accent-color)"/>
                      <text x="330" y="315" fill="var(--text-muted)" fontSize="10" fontFamily="monospace">Active Exhaust</text>
                    </svg>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <FadeIn direction="left" delay={200}>
              <h2 className="text-sm font-bold tracking-widest text-[#ff4d6d] mb-4 uppercase">
                Thermal Dissipation
              </h2>
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight text-[var(--text-heading)]">
                Active Cooling Architecture
              </h3>
              <p className="text-[var(--text-muted)] text-sm sm:text-base md:text-lg leading-relaxed mt-1">
                It started with a simple idea: extreme cooling. Standard passive cooling wasn't enough to sustain peak performance during intensive tasks. I took a standard S21 case, mapped out the thermal hotspots on the chassis, and carefully carved a precise circular mount.
              </p>
              <p className="text-[var(--text-muted)] text-sm sm:text-base md:text-lg leading-relaxed mt-4">
                This allowed a custom cooling fan assembly to sit flush against the device. This active cooling setup pulls heat directly away from the chassis, lowering the temperature of the device by whole 10 degrees Celsius and maintaining hardware stability under maximum load.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Section 2: Power Delivery */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
          <div className="w-full md:w-1/2">
            <FadeIn direction="right">
              <h2 className="text-sm font-bold tracking-widest text-[#ff4d6d] mb-4 uppercase">
                Power Delivery
              </h2>
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight text-[var(--text-heading)]">
                Bypassing Limitations
              </h3>
              <p className="text-[var(--text-muted)] text-sm sm:text-base md:text-lg leading-relaxed mt-1">
                Cooling is nothing without the power to sustain it. I integrated a massive 10,000mAh external power bank directly into the S21's internal circuitry.
              </p>
              <p className="text-[var(--text-muted)] text-sm sm:text-base md:text-lg leading-relaxed mt-4">
                By soldering the custom fan assembly to a dedicated controller, I created dual operational modes: Power Save and Performance. This direct wiring bypasses standard hardware limitations, feeding raw power directly to the cells and the cooling system for unprecedented, uninterrupted battery life.
              </p>
            </FadeIn>
          </div>
          <div className="w-full md:w-1/2">
            <FadeIn direction="left" delay={200}>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-bl from-[var(--primary-accent-color)] to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-700 blur-2xl rounded-3xl"></div>
                {/* Pure Schematic Diagram Card */}
                <div className="relative z-10 rounded-3xl shadow-2xl border border-[var(--glass-border)] bg-[var(--bg-glass)] backdrop-blur-md w-full h-[400px] flex flex-col items-center justify-center transform transition-transform duration-700 group-hover:scale-[1.02] p-8 overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(var(--text-heading) 1px, transparent 1px)", backgroundSize: "16px 16px" }}></div>
                  
                  {/* Schematic Flow */}
                  <div className="flex flex-col items-center gap-6 relative z-10 w-full">
                    
                    {/* Top: Battery */}
                    <div className="flex items-center gap-4 p-4 border border-[#ff4d6d]/50 bg-[#ff4d6d]/10 rounded-xl w-[80%] max-w-[250px] shadow-[0_0_15px_rgba(255,77,109,0.2)]">
                      <svg className="w-8 h-8 text-[#ff4d6d]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5h6.75V15H4.5v-4.5zM3 7.5h15c.621 0 1.125.504 1.125 1.125v7.5c0 .621-.504 1.125-1.125 1.125H3a1.125 1.125 0 01-1.125-1.125v-7.5C1.875 8.004 2.379 7.5 3 7.5z" />
                      </svg>
                      <div className="flex flex-col">
                        <span className="text-[var(--text-heading)] font-bold tracking-wider text-sm">10,000mAh ARRAY</span>
                        <span className="text-[#ff4d6d] text-xs font-mono">EXTERNAL_CELLS</span>
                      </div>
                    </div>

                    {/* Flow Line down */}
                    <div className="h-8 w-px bg-gradient-to-b from-[#ff4d6d] to-[var(--text-muted)] flex items-center justify-center relative">
                       <svg className="w-3 h-3 text-[var(--text-muted)] absolute -bottom-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                       </svg>
                    </div>

                    {/* Middle: Controller */}
                    <div className="flex items-center justify-center p-3 border border-[var(--glass-border)] bg-[var(--bg-glass-hover)] rounded-xl w-[60%] max-w-[200px]">
                      <span className="text-[var(--text-heading)] text-xs font-mono tracking-widest text-center">CUSTOM CONTROLLER<br/><span className="text-[var(--text-muted)] text-[10px]">PWR_SAVE / PERF</span></span>
                    </div>

                    {/* Flow Lines Split */}
                    <div className="w-[60%] max-w-[200px] flex justify-between relative mt-2">
                       {/* Left line */}
                       <div className="w-[50%] h-8 border-l border-t border-[var(--text-muted)] rounded-tl-xl relative">
                         <svg className="w-3 h-3 text-[var(--text-muted)] absolute -bottom-1 -left-[6px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                         </svg>
                       </div>
                       {/* Right line */}
                       <div className="w-[50%] h-8 border-r border-t border-[#ff4d6d]/70 rounded-tr-xl relative">
                         <svg className="w-3 h-3 text-[#ff4d6d]/70 absolute -bottom-1 -right-[6px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                         </svg>
                       </div>
                    </div>

                    {/* Bottom: Outputs */}
                    <div className="w-full flex justify-center gap-4 mt-2">
                      <div className="flex flex-col items-center p-3 border border-[var(--glass-border)] bg-[var(--bg-glass)] rounded-xl w-[45%]">
                        <svg className="w-6 h-6 text-[var(--text-muted)] mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                        </svg>
                        <span className="text-[var(--text-muted)] text-[10px] font-mono text-center">S21 MAINBOARD</span>
                      </div>
                      
                      <div className="flex flex-col items-center p-3 border border-[#ff4d6d]/30 bg-[var(--bg-glass-hover)] rounded-xl w-[45%] relative overflow-hidden group/fan">
                        <svg className="w-6 h-6 text-[#ff4d6d] mb-2 transform transition-transform duration-[2000ms] group-hover/fan:rotate-[720deg]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 7a5 5 0 110 10 5 5 0 010-10zM10.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                        </svg>
                        <span className="text-[var(--text-heading)] text-[10px] font-mono text-center">ACTIVE COOLING</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
}
