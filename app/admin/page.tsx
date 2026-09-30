"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);
  const [lockoutCountdown, setLockoutCountdown] = useState<number>(0);
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | null>(null);

  // Check if already authenticated
  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => {
        if (res.ok) {
          router.replace("/admin/dashboard");
        }
      })
      .catch(() => {});
  }, [router]);

  // Handle countdown if locked out
  useEffect(() => {
    if (lockoutCountdown <= 0) return;
    const timer = setInterval(() => {
      setLockoutCountdown((prev) => {
        if (prev <= 1) {
          setLocked(false);
          setError(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutCountdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || locked) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.status === 429) {
        setLocked(true);
        setLockoutCountdown(data.remainingSeconds || 900);
        setError(data.error || "Too many failed attempts. Locked out for 15 minutes.");
        setAttemptsRemaining(0);
      } else if (!res.ok) {
        setError(data.error || "Invalid password.");
        if (typeof data.attemptsRemaining === "number") {
          setAttemptsRemaining(data.attemptsRemaining);
        }
      } else {
        router.push("/admin/dashboard");
      }
    } catch {
      setError("Network or server connection failed. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl border border-[#2b221a] bg-[#16120e] p-7 sm:p-9 shadow-2xl backdrop-blur-xl">
        {/* Brand / Title */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-[#c48c56]/15 text-[#c48c56] border border-[#c48c56]/30">
            <svg
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#f4efe9]">
            Portfolio Intelligence
          </h1>
          <p className="mt-1 text-xs text-[#9a8677]">
            Sign in to access visitor analytics, heatmaps & messages
          </p>
        </div>

        {/* Brute Force Security Policy Badge */}
        <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/10 p-3 text-xs text-amber-300">
          <svg
            className="h-4 w-4 shrink-0 text-amber-400 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div>
            <span className="font-semibold text-amber-200">Brute-Force Protected:</span>{" "}
            Max 3 failed login attempts locks out your IP address for 15 minutes.
          </div>
        </div>

        {/* Lockout Banner */}
        {locked && (
          <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/15 p-4 text-center">
            <p className="text-sm font-bold text-red-300">Account Temporarily Locked</p>
            <p className="mt-1 text-xs text-red-200/90">
              3 consecutive failed attempts detected.
            </p>
            <div className="mt-3 inline-block rounded-lg bg-red-950/80 px-3 py-1 font-mono text-sm font-semibold text-red-400 border border-red-500/30">
              Unlock in {formatCountdown(lockoutCountdown)}
            </div>
          </div>
        )}

        {/* Error message */}
        {error && !locked && (
          <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300 flex items-center justify-between">
            <span>{error}</span>
            {attemptsRemaining !== null && (
              <span className="font-semibold px-2 py-0.5 rounded bg-red-500/20 text-red-200 text-[11px]">
                {attemptsRemaining} left
              </span>
            )}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="admin-password"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#9a8677]"
            >
              Admin Password
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                disabled={locked || loading}
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full rounded-xl border border-[#382d24] bg-[#0f0c0a] px-4 py-3 text-sm text-[#f4efe9] placeholder:text-[#6e5d50] transition-all focus:border-[#c48c56] focus:outline-none focus:ring-2 focus:ring-[#c48c56]/20 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#9a8677] hover:text-[#f4efe9] px-1 py-0.5"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={locked || loading || !password}
            className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#c48c56] px-4 py-3 text-sm font-semibold text-[#16120e] transition-all hover:bg-[#d59e69] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none shadow-lg shadow-[#c48c56]/15"
          >
            {loading ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin text-[#16120e]"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Verifying...</span>
              </>
            ) : locked ? (
              <span>Locked Out</span>
            ) : (
              <span>Access Dashboard &rarr;</span>
            )}
          </button>
        </form>

        <div className="mt-7 pt-5 border-t border-[#2b221a] text-center">
          <a
            href="/"
            className="text-xs text-[#9a8677] hover:text-[#c48c56] transition-colors"
          >
            &larr; Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
