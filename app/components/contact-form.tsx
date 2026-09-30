"use client";

import { useState } from "react";
import { Icon } from "./icons";

interface ContactFormProps {
  locale?: string;
  labels?: {
    heading?: string;
    subheading?: string;
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    submit?: string;
    sending?: string;
    success?: string;
    error?: string;
  };
}

export function ContactForm({ locale = "en", labels }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const visitorId =
        typeof window !== "undefined"
          ? localStorage.getItem("portfolio_visitor_id")
          : null;

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          visitor_id: visitorId,
          locale,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  const isMn = locale === "mn";

  return (
    <div className="rounded-3xl border border-[var(--border-strong)] bg-[var(--surface-2)] p-6 sm:p-8 lg:p-10 shadow-sm backdrop-blur-md">
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-ink-strong">
          {labels?.heading || (isMn ? "Шууд зурвас илгээх" : "Send a Direct Message")}
        </h3>
        <p className="mt-1 text-sm text-muted">
          {labels?.subheading ||
            (isMn
              ? "Хамтран ажиллах, асуулт асуух эсвэл санал хүсэлтээ үлдээнэ үү."
              : "Have a project in mind, a question, or an opportunity? Drop a note below.")}
        </p>
      </div>

      {status === "success" ? (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center animate-in fade-in zoom-in-95 duration-300">
          <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-ink-strong">
            {isMn ? "Зурвас амжилттай илгээгдлээ!" : "Message Sent Successfully!"}
          </h4>
          <p className="mt-1 text-sm text-muted">
            {labels?.success ||
              (isMn
                ? "Баярлалаа! Би таны зурваст аль болох түргэн хариу өгөх болно."
                : "Thank you! Your message has been saved to the database and I'll get back to you soon.")}
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="btn btn-ghost mt-5 text-sm"
          >
            {isMn ? "Өөр зурвас илгээх" : "Send Another Message"}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate={false}>
          {status === "error" && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400">
              <p className="font-semibold">{isMn ? "Алдаа гарлаа:" : "Failed to send:"}</p>
              <p>{errorMessage}</p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="contact-name"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted"
              >
                {labels?.name || (isMn ? "Таны нэр" : "Your Name")} <span className="text-accent">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={isMn ? "Б. Бат" : "Jane Doe"}
                className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--surface-solid)] px-4 py-3 text-sm text-ink-strong placeholder:text-muted/60 transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted"
              >
                {labels?.email || (isMn ? "И-мэйл хаяг" : "Email Address")} <span className="text-accent">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@domain.com"
                className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--surface-solid)] px-4 py-3 text-sm text-ink-strong placeholder:text-muted/60 transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-subject"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted"
            >
              {labels?.subject || (isMn ? "Гарчиг / Сэдэв" : "Subject")} <span className="text-accent">*</span>
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              required
              value={formData.subject}
              onChange={handleChange}
              placeholder={isMn ? "Төслийн хамтын ажиллагаа" : "Hardware / Software Project Inquiry"}
              className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--surface-solid)] px-4 py-3 text-sm text-ink-strong placeholder:text-muted/60 transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted"
            >
              {labels?.message || (isMn ? "Зурвас" : "Message")} <span className="text-accent">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder={
                isMn
                  ? "Төслийн дэлгэрэнгүй эсвэл санал хүсэлтээ бичнэ үү..."
                  : "Tell me about your idea, timeline, or just say hello..."
              }
              className="w-full resize-y rounded-xl border border-[var(--border-strong)] bg-[var(--surface-solid)] px-4 py-3 text-sm text-ink-strong placeholder:text-muted/60 transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn btn-primary w-full sm:w-auto"
            >
              {status === "submitting" ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
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
                  <span>{isMn ? "Илгээж байна..." : "Sending..."}</span>
                </>
              ) : (
                <>
                  <Icon name="mail" className="h-4 w-4" />
                  <span>{labels?.submit || (isMn ? "Зурвас илгээх" : "Send Message")}</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
