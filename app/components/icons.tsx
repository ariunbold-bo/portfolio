import type { SVGProps } from "react";

type IconName =
  | "mail"
  | "phone"
  | "github"
  | "linkedin"
  | "instagram"
  | "facebook"
  | "home"
  | "user"
  | "layers"
  | "route"
  | "chip"
  | "grid"
  | "spark"
  | "terminal"
  | "wrench"
  | "gauge"
  | "battery"
  | "pingpong"
  | "chess"
  | "arrowUpRight"
  | "arrowRight"
  | "arrowLeft"
  | "arrowDown"
  | "sun"
  | "piano"
  | "moon"
  | "code"
  | "mapPin";

const paths: Record<IconName, React.ReactNode> = {
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  phone: (
    <path d="M6.5 3h3l1.5 5-2 1.5a13 13 0 0 0 5.5 5.5l1.5-2 5 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z" />
  ),
  home: (
    <>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" />
      <path d="m4 12 8 4.5 8-4.5" />
      <path d="m4 16.5 8 4.5 8-4.5" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <path d="M8.5 18H14a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h1.5" />
    </>
  ),
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M10 2.5v3M14 2.5v3M10 18.5v3M14 18.5v3M2.5 10h3M2.5 14h3M18.5 10h3M18.5 14h3" />
    </>
  ),
  grid: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </>
  ),
  spark: (
    <path d="M12 3c.4 4.2 1.8 5.6 6 6-4.2.4-5.6 1.8-6 6-.4-4.2-1.8-5.6-6-6 4.2-.4 5.6-1.8 6-6Z" />
  ),
  terminal: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="m7 9 3 3-3 3M13 15h4" />
    </>
  ),
  wrench: (
    <path d="M15.5 3.5a5 5 0 0 0-6 6.4L3.6 15.8a2 2 0 0 0 2.8 2.8l5.9-5.9a5 5 0 0 0 6.4-6l-2.9 2.9-2.6-.7-.7-2.6 2.9-2.9Z" />
  ),
  gauge: (
    <>
      <path d="M4 15a8 8 0 0 1 16 0" />
      <path d="m12 15 4-4" />
      <circle cx="12" cy="15" r="1" />
    </>
  ),
  battery: (
    <>
      <rect x="3" y="8" width="15" height="9" rx="2" />
      <path d="M21 11v3" />
      <path d="M7 11v3M10.5 11v3" />
    </>
  ),
  pingpong: (
    <>
      <path d="M6.04 7.16l2.53-2.53c1.43-1.43 3.38-2.23 5.4-2.23 4.22 0 7.64 3.42 7.64 7.64 0 1.74-.6 3.41-1.67 4.76-.88-.63-1.96-1-3.13-1-1.17 0-2.25.37-3.13 1L6.04 7.16z" />
      <path d="M11.4 19.2c0 .36.04.72.1 1.06-.74-.2-1.42-.58-1.97-1.13-.46-.46-1.2-.46-1.65 0l-1.85 1.85c-.4.4-.94.62-1.5.62-1.17 0-2.13-.95-2.13-2.13 0-.56.23-1.1.63-1.5l1.85-1.85c.46-.46.46-1.2 0-1.65-.82-.82-1.27-1.92-1.27-3.07 0-1.1.42-2.16 1.17-2.96l7.63 7.63c-.63.88-1 1.96-1 3.13z" />
      <circle cx="16.8" cy="19.2" r="3.6" />
    </>
  ),
  chess: (
    <>
      <path d="M10 3.5h4M12 3.5v3" />
      <path d="M9 6.5h6l-1 4H10l-1-4Z" />
      <path d="M9.5 10.5 8.5 15h7l-1-4.5" />
      <path d="M7.5 15h9l1 5h-11l1-5Z" />
    </>
  ),
  piano: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      <path d="M7 10v9" />
      <path d="M12 10v9" />
      <path d="M17 10v9" />
      <path d="M5 7v1" />
      <path d="M9 7v1" />
      <path d="M15 7v1" />
      <path d="M19 7v1" />
    </>
  ),
  arrowUpRight: <path d="M7 17 17 7M9 7h8v8" />,
  arrowRight: <path d="M4 12h15M13 6l6 6-6 6" />,
  arrowLeft: <path d="M20 12H5M11 6l-6 6 6 6" />,
  arrowDown: <path d="M12 4v15M6 13l6 6 6-6" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M19.4 4.6l-1.8 1.8M6.4 17.6l-1.8 1.8" />
    </>
  ),
  moon: <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />,
  code: <path d="m9 8-5 4 5 4M15 8l5 4-5 4M13 5l-2 14" />,
  mapPin: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  github: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
    />
  ),
  linkedin: (
    <path
      fill="currentColor"
      stroke="none"
      d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.3c0-1.26-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21H9V9Z"
    />
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <path
      fill="currentColor"
      stroke="none"
      d="M14 9h2.5V6H14c-2 0-3.5 1.4-3.5 3.6V11H8v3h2.5v7H14v-7h2.3l.4-3H14V9.9c0-.6.4-.9 1-.9Z"
    />
  ),
};

export function Icon({
  name,
  ...props
}: { name: string } & SVGProps<SVGSVGElement>) {
  const node = paths[name as IconName];
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {node ?? paths.spark}
    </svg>
  );
}
