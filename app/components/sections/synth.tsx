"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
type WaveType = OscillatorType; // "sine" | "square" | "sawtooth" | "triangle"

interface SynthState {
  playing: boolean;
  frequency: number;
  gain: number;
  waveform: WaveType;
}

const WAVEFORMS: { id: WaveType; label: string; symbol: string }[] = [
  { id: "sine",     label: "SINE",     symbol: "∿" },
  { id: "square",   label: "SQR",      symbol: "⊓" },
  { id: "sawtooth", label: "SAW",      symbol: "⟋" },
  { id: "triangle", label: "TRI",      symbol: "∧" },
];

const FREQ_MIN = 20;
const FREQ_MAX = 2000;
const GAIN_MIN = 0;
const GAIN_MAX = 1;
const INITIAL_FREQ = 440;
const INITIAL_GAIN = 0.35;

/* ─────────────────────────────────────────────
   Oscilloscope Canvas
───────────────────────────────────────────── */
function Oscilloscope({
  analyser,
  playing,
  accentRgb,
}: {
  analyser: AnalyserNode | null;
  playing: boolean;
  accentRgb: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let bufferLength = 2048;
    let dataArray: Uint8Array<ArrayBuffer> = new Uint8Array(bufferLength);

    function resize() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width  = rect.width  * dpr;
      canvas.height = rect.height * dpr;
      if (ctx) ctx.scale(dpr, dpr);
    }
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function drawIdle() {
      if (!canvas || !ctx) return;
      const W = canvas.getBoundingClientRect().width;
      const H = canvas.getBoundingClientRect().height;
      const mid = H / 2;

      ctx.clearRect(0, 0, W, H);

      /* grid lines */
      ctx.strokeStyle = `rgba(${accentRgb}, 0.06)`;
      ctx.lineWidth = 1;
      for (let i = 1; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(0, (H / 4) * i);
        ctx.lineTo(W, (H / 4) * i);
        ctx.stroke();
      }
      for (let i = 1; i < 8; i++) {
        ctx.beginPath();
        ctx.moveTo((W / 8) * i, 0);
        ctx.lineTo((W / 8) * i, H);
        ctx.stroke();
      }

      /* flat idle line */
      ctx.beginPath();
      ctx.moveTo(0, mid);
      ctx.lineTo(W, mid);
      ctx.strokeStyle = `rgba(${accentRgb}, 0.25)`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      /* center marker */
      ctx.beginPath();
      ctx.arc(W / 2, mid, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${accentRgb}, 0.3)`;
      ctx.fill();
    }

    function drawWave() {
      if (!canvas || !ctx || !analyser) return;
      rafRef.current = requestAnimationFrame(drawWave);

      bufferLength = analyser.frequencyBinCount;
      if (dataArray.length !== bufferLength) dataArray = new Uint8Array(bufferLength) as Uint8Array<ArrayBuffer>;
      analyser.getByteTimeDomainData(dataArray);

      const W = canvas.getBoundingClientRect().width;
      const H = canvas.getBoundingClientRect().height;

      ctx.clearRect(0, 0, W, H);

      /* grid */
      ctx.strokeStyle = `rgba(${accentRgb}, 0.06)`;
      ctx.lineWidth = 1;
      for (let i = 1; i < 4; i++) {
        ctx.beginPath(); ctx.moveTo(0, (H / 4) * i); ctx.lineTo(W, (H / 4) * i); ctx.stroke();
      }
      for (let i = 1; i < 8; i++) {
        ctx.beginPath(); ctx.moveTo((W / 8) * i, 0); ctx.lineTo((W / 8) * i, H); ctx.stroke();
      }

      /* glow shadow pass */
      ctx.shadowColor  = `rgba(${accentRgb}, 0.45)`;
      ctx.shadowBlur   = 12;
      ctx.beginPath();
      const sliceW = W / bufferLength;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * H) / 2;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        x += sliceW;
      }
      ctx.strokeStyle = `rgba(${accentRgb}, 0.4)`;
      ctx.lineWidth   = 3;
      ctx.stroke();

      /* crisp main line */
      ctx.shadowBlur = 0;
      ctx.beginPath();
      x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * H) / 2;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        x += sliceW;
      }

      const grad = ctx.createLinearGradient(0, 0, W, 0);
      grad.addColorStop(0,   `rgba(${accentRgb}, 0.3)`);
      grad.addColorStop(0.5, `rgba(${accentRgb}, 1.0)`);
      grad.addColorStop(1,   `rgba(${accentRgb}, 0.3)`);
      ctx.strokeStyle = grad;
      ctx.lineWidth   = 1.8;
      ctx.stroke();
    }

    if (playing && analyser) {
      drawWave();
    } else {
      cancelAnimationFrame(rafRef.current);
      drawIdle();
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [playing, analyser, accentRgb]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
      aria-label="Live oscilloscope waveform display"
    />
  );
}

/* ─────────────────────────────────────────────
   Note frequency helper
───────────────────────────────────────────── */
const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
function freqToNote(freq: number): string {
  if (freq < 27.5) return "—";
  const semitones = Math.round(12 * Math.log2(freq / 440)) + 69;
  const octave = Math.floor(semitones / 12) - 1;
  const note   = NOTE_NAMES[semitones % 12];
  return `${note}${octave}`;
}

/* ─────────────────────────────────────────────
   Main Synthesizer Component
───────────────────────────────────────────── */
export function Synth() {
  const [state, setState] = useState<SynthState>({
    playing:   false,
    frequency: INITIAL_FREQ,
    gain:      INITIAL_GAIN,
    waveform:  "sine",
  });

  /* Web Audio nodes */
  const acRef       = useRef<AudioContext | null>(null);
  const oscRef      = useRef<OscillatorNode | null>(null);
  const gainRef     = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  /* live accent color for canvas */
  const [accentRgb, setAccentRgb] = useState("196, 165, 117");
  useEffect(() => {
    const update = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-rgb")
        .trim();
      if (raw) setAccentRgb(raw);
    };
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  /* Tear down audio graph */
  const teardown = useCallback(() => {
    if (oscRef.current) {
      try { oscRef.current.stop(); } catch {}
      oscRef.current.disconnect();
      oscRef.current = null;
    }
  }, []);

  /* Build / start audio graph */
  const startAudio = useCallback(() => {
    /* Lazy init AudioContext on first user interaction */
    if (!acRef.current) {
      acRef.current = new AudioContext();
    }
    const ac = acRef.current;
    if (ac.state === "suspended") ac.resume();

    /* Analyser */
    if (!analyserRef.current) {
      const analyser = ac.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.85;
      analyserRef.current = analyser;
    }

    /* GainNode */
    if (!gainRef.current) {
      const gainNode = ac.createGain();
      gainNode.gain.value = state.gain;
      gainNode.connect(analyserRef.current);
      analyserRef.current.connect(ac.destination);
      gainRef.current = gainNode;
    }

    /* Oscillator */
    teardown();
    const osc = ac.createOscillator();
    osc.type            = state.waveform;
    osc.frequency.value = state.frequency;
    osc.connect(gainRef.current);
    osc.start();
    oscRef.current = osc;
  }, [state.frequency, state.gain, state.waveform, teardown]);

  /* Toggle play/stop */
  const togglePlay = useCallback(() => {
    setState(prev => {
      if (prev.playing) {
        teardown();
        return { ...prev, playing: false };
      }
      return { ...prev, playing: true };
    });
  }, [teardown]);

  /* Start audio when state.playing flips to true */
  useEffect(() => {
    if (state.playing) startAudio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.playing]);

  /* Live-update frequency */
  useEffect(() => {
    if (oscRef.current) {
      oscRef.current.frequency.setTargetAtTime(
        state.frequency,
        acRef.current!.currentTime,
        0.02,
      );
    }
  }, [state.frequency]);

  /* Live-update gain */
  useEffect(() => {
    if (gainRef.current) {
      gainRef.current.gain.setTargetAtTime(
        state.gain,
        acRef.current!.currentTime,
        0.02,
      );
    }
  }, [state.gain]);

  /* Live-update waveform — requires new oscillator */
  useEffect(() => {
    if (state.playing && oscRef.current) {
      startAudio();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.waveform]);

  /* Cleanup on unmount */
  useEffect(() => () => {
    teardown();
    acRef.current?.close();
  }, [teardown]);

  const freqLog = Math.log2(state.frequency / FREQ_MIN) / Math.log2(FREQ_MAX / FREQ_MIN);

  return (
    <section id="synth" className="scroll-mt-32">
      <Reveal variant="up">
        <SectionHeading label="INTERACTIVE" title="Audio Synthesizer" />
      </Reveal>

      <Reveal variant="up" delay={100}>
        <p className="mt-3 text-sm text-muted max-w-lg leading-relaxed">
          A live audio synthesizer built on the native{" "}
          <span className="text-accent font-mono">Web Audio API</span>. Dial in a
          frequency, pick a waveform, and watch the oscilloscope react in real time.
        </p>
      </Reveal>

      <Reveal variant="up" delay={200}>
        <div className="mt-10 relative rounded-[var(--radius-card)] border border-[var(--border-strong)] bg-[var(--surface)] overflow-hidden">

          {/* ── Terminal chrome bar ── */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)] bg-[var(--surface-solid)]/40">
            <span className="text-[0.65rem] font-mono tracking-widest text-muted uppercase">
              synth_v1.0 — oscilloscope
            </span>
            <span className="ml-auto flex items-center gap-1.5">
              <span
                className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                  state.playing ? "bg-emerald-400 animate-pulse" : "bg-[var(--muted)]/40"
                }`}
              />
              <span className="text-[0.6rem] font-mono text-muted">
                {state.playing ? "LIVE" : "IDLE"}
              </span>
            </span>
          </div>

          {/* ── Oscilloscope display ── */}
          <div
            className="relative w-full bg-[var(--bg)] overflow-hidden"
            style={{ height: "clamp(140px, 22vw, 220px)" }}
          >
            {/* scan line effect */}
            <div
              className="pointer-events-none absolute inset-0 z-10 opacity-[0.04]"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.6) 1px, rgba(0,0,0,0.6) 2px)",
                backgroundSize: "100% 3px",
              }}
            />
            {/* vignette */}
            <div className="pointer-events-none absolute inset-0 z-10"
              style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%)" }}
            />
            <Oscilloscope
              analyser={analyserRef.current}
              playing={state.playing}
              accentRgb={accentRgb}
            />
            {/* freq/note readout overlay */}
            <div className="absolute top-3 left-4 flex items-baseline gap-3 z-20">
              <span className="font-mono text-xs text-[var(--accent)] opacity-80">
                {state.frequency.toFixed(1)}{" "}
                <span className="text-[0.6rem] opacity-60">Hz</span>
              </span>
              <span className="font-mono text-[0.6rem] text-muted opacity-70">
                {freqToNote(state.frequency)}
              </span>
            </div>
            <div className="absolute top-3 right-4 flex items-baseline gap-2 z-20">
              <span className="font-mono text-[0.6rem] text-muted opacity-60 uppercase tracking-widest">
                {state.waveform === "sawtooth" ? "SAW" : state.waveform.toUpperCase()}
              </span>
            </div>
          </div>

          {/* ── Controls panel ── */}
          <div className="p-5 sm:p-6 flex flex-col gap-5">

            {/* Sliders row — stacks on mobile, side-by-side on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* Frequency slider */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="synth-freq"
                    className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-muted"
                  >
                    Frequency
                  </label>
                  <span className="font-mono text-xs text-accent">
                    {state.frequency < 1000
                      ? `${state.frequency.toFixed(0)} Hz`
                      : `${(state.frequency / 1000).toFixed(2)} kHz`}
                  </span>
                </div>
                <input
                  id="synth-freq"
                  type="range"
                  min={0}
                  max={1}
                  step={0.001}
                  value={freqLog}
                  onChange={e => {
                    const logVal = parseFloat(e.target.value);
                    const freq   = FREQ_MIN * Math.pow(FREQ_MAX / FREQ_MIN, logVal);
                    setState(prev => ({ ...prev, frequency: Math.round(freq) }));
                  }}
                  className="synth-slider w-full cursor-pointer"
                  aria-label="Frequency"
                />
                <div className="flex justify-between text-[0.5rem] font-mono text-muted/50 select-none">
                  <span>20Hz</span>
                  <span>100</span>
                  <span>500</span>
                  <span>1k</span>
                  <span>2kHz</span>
                </div>
              </div>

              {/* Gain slider */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="synth-gain"
                    className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-muted"
                  >
                    Volume
                  </label>
                  <span className="font-mono text-xs text-accent">
                    {Math.round(state.gain * 100)}%
                  </span>
                </div>
                <input
                  id="synth-gain"
                  type="range"
                  min={GAIN_MIN}
                  max={GAIN_MAX}
                  step={0.01}
                  value={state.gain}
                  onChange={e =>
                    setState(prev => ({ ...prev, gain: parseFloat(e.target.value) }))
                  }
                  className="synth-slider w-full cursor-pointer"
                  aria-label="Volume"
                />
                <div className="flex justify-between text-[0.5rem] font-mono text-muted/50 select-none">
                  <span>MUTE</span>
                  <span>——</span>
                  <span>MAX</span>
                </div>
              </div>
            </div>

            {/* Play button — full-width pill on mobile, circle on sm+ */}
            <button
              id="synth-play-btn"
              onClick={togglePlay}
              aria-label={state.playing ? "Stop synthesizer" : "Start synthesizer"}
              className={`
                relative cursor-pointer flex items-center justify-center gap-3
                w-full sm:w-14 sm:h-14 sm:self-end sm:rounded-full
                h-11 rounded-xl border transition-all duration-300
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]
                ${state.playing
                  ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)] shadow-[0_0_24px_-4px_rgba(var(--accent-rgb),0.5)]"
                  : "border-[var(--border-strong)] bg-[var(--surface-2)] text-muted hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/5"
                }
              `}
            >
              {state.playing ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="5" y="5" width="14" height="14" rx="2" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="6,4 20,12 6,20" />
                </svg>
              )}
              <span className="text-[0.7rem] font-mono tracking-widest uppercase sm:hidden">
                {state.playing ? "Stop" : "Play"}
              </span>
              {state.playing && (
                <span className="absolute inset-0 rounded-[inherit] animate-ping opacity-20 bg-[var(--accent)]" />
              )}
            </button>
          </div>

          {/* ── Waveform selector ── */}
          <div className="px-5 sm:px-6 pb-5 sm:pb-6 flex flex-wrap items-center gap-2">
            <span className="text-[0.6rem] font-semibold tracking-[0.18em] uppercase text-muted mr-1 w-full sm:w-auto">
              Waveform
            </span>
            {WAVEFORMS.map(w => (
              <button
                key={w.id}
                id={`synth-wave-${w.id}`}
                onClick={() => setState(prev => ({ ...prev, waveform: w.id }))}
                aria-pressed={state.waveform === w.id}
                className={`
                  relative flex-1 sm:flex-none cursor-pointer
                  flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg
                  text-[0.7rem] font-semibold border transition-all duration-200
                  font-mono tracking-wider min-w-[60px]
                  ${state.waveform === w.id
                    ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/8 shadow-[inset_0_0_12px_rgba(var(--accent-rgb),0.1)]"
                    : "border-[var(--border)] text-muted bg-transparent hover:border-[var(--border-strong)] hover:text-[var(--ink)]"
                  }
                `}
              >
                <span className="text-[1rem] leading-none">{w.symbol}</span>
                {w.label}
                {state.waveform === w.id && (
                  <span className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />
                )}
              </button>
            ))}
          </div>

          {/* ── Status footer ── */}
          <div className="px-5 sm:px-6 py-3 border-t border-[var(--border)] bg-[var(--surface-solid)]/20 flex flex-wrap items-center gap-x-6 gap-y-1">
            {[
              { key: "FREQ",  val: `${state.frequency.toFixed(0)} Hz` },
              { key: "GAIN",  val: `${(state.gain * 100).toFixed(0)}%` },
              { key: "NOTE",  val: freqToNote(state.frequency) },
              { key: "MODE",  val: state.waveform === "sawtooth" ? "SAW" : state.waveform.toUpperCase() },
              { key: "STATE", val: state.playing ? "RUNNING" : "STOPPED" },
            ].map(item => (
              <div key={item.key} className="flex items-center gap-1.5">
                <span className="text-[0.55rem] font-mono tracking-widest text-muted/50 uppercase">
                  {item.key}
                </span>
                <span className="text-[0.65rem] font-mono text-accent/70">
                  {item.val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
