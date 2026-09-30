/**
 * Lightweight, zero-dependency User-Agent parser.
 */
export interface ParsedUA {
  browser: string;
  browserVersion: string;
  os: string;
  osVersion: string;
  deviceType: "Desktop" | "Mobile" | "Tablet" | "Bot";
}

export function parseUserAgent(ua: string | null | undefined): ParsedUA {
  if (!ua) {
    return {
      browser: "Unknown",
      browserVersion: "",
      os: "Unknown",
      osVersion: "",
      deviceType: "Desktop",
    };
  }

  // Device type detection
  let deviceType: "Desktop" | "Mobile" | "Tablet" | "Bot" = "Desktop";
  const uaLower = ua.toLowerCase();

  if (
    uaLower.includes("bot") ||
    uaLower.includes("crawler") ||
    uaLower.includes("spider") ||
    uaLower.includes("googlebot")
  ) {
    deviceType = "Bot";
  } else if (
    uaLower.includes("ipad") ||
    uaLower.includes("tablet") ||
    (uaLower.includes("android") && !uaLower.includes("mobile"))
  ) {
    deviceType = "Tablet";
  } else if (
    uaLower.includes("mobile") ||
    uaLower.includes("iphone") ||
    uaLower.includes("ipod") ||
    uaLower.includes("android")
  ) {
    deviceType = "Mobile";
  }

  // OS detection
  let os = "Unknown";
  let osVersion = "";

  if (ua.includes("Windows NT 10.0")) {
    os = "Windows";
    osVersion = "10/11";
  } else if (ua.includes("Windows NT 6.3")) {
    os = "Windows";
    osVersion = "8.1";
  } else if (ua.includes("Windows NT 6.1")) {
    os = "Windows";
    osVersion = "7";
  } else if (ua.includes("Windows")) {
    os = "Windows";
  } else if (ua.includes("iPhone OS") || ua.includes("iPad; CPU OS")) {
    os = "iOS";
    const match = ua.match(/OS (\d+[._]\d+)/);
    if (match) osVersion = match[1].replace("_", ".");
  } else if (ua.includes("Mac OS X")) {
    os = "macOS";
    const match = ua.match(/Mac OS X (\d+[._]\d+)/);
    if (match) osVersion = match[1].replace("_", ".");
  } else if (ua.includes("Android")) {
    os = "Android";
    const match = ua.match(/Android (\d+(\.\d+)?)/);
    if (match) osVersion = match[1];
  } else if (ua.includes("Linux")) {
    os = "Linux";
  } else if (ua.includes("CrOS")) {
    os = "ChromeOS";
  }

  // Browser detection
  let browser = "Unknown";
  let browserVersion = "";

  if (ua.includes("Edg/")) {
    browser = "Edge";
    const match = ua.match(/Edg\/(\d+(\.\d+)?)/);
    if (match) browserVersion = match[1];
  } else if (ua.includes("OPR/") || ua.includes("Opera/")) {
    browser = "Opera";
    const match = ua.match(/(?:OPR|Opera)\/(\d+(\.\d+)?)/);
    if (match) browserVersion = match[1];
  } else if (ua.includes("Chrome/") && !ua.includes("Chromium/")) {
    browser = "Chrome";
    const match = ua.match(/Chrome\/(\d+(\.\d+)?)/);
    if (match) browserVersion = match[1];
  } else if (ua.includes("Safari/") && !ua.includes("Chrome/")) {
    browser = "Safari";
    const match = ua.match(/Version\/(\d+(\.\d+)?)/);
    if (match) browserVersion = match[1];
  } else if (ua.includes("Firefox/")) {
    browser = "Firefox";
    const match = ua.match(/Firefox\/(\d+(\.\d+)?)/);
    if (match) browserVersion = match[1];
  }

  return {
    browser,
    browserVersion,
    os,
    osVersion,
    deviceType,
  };
}
