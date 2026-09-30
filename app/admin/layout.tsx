import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard · Analytics & Telemetry",
  description: "Private telemetry, visitor intelligence, click heatmap, and contact dashboard.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0e0c0a] text-[#f4efe9] font-sans antialiased selection:bg-[#c48c56] selection:text-white">
      {children}
    </div>
  );
}
