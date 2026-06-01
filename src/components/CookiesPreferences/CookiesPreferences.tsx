"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

interface CookiePrefs {
  technical: boolean;
  analytics: boolean;
  marketing: boolean;
}

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const STORAGE_KEY = "thalea_cookies_preferences";

async function loadGA4(): Promise<void> {
  if (!MEASUREMENT_ID) return;
  if (typeof window === "undefined") return;
  if ("gtag" in window) return;

  await new Promise<void>((resolve) => {
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    script.async = true;
    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function (...args: any[]) {
        window.dataLayer.push(args);
      };
      window.gtag("js", new Date());
      window.gtag("config", MEASUREMENT_ID, { send_page_view: true });
      resolve();
    };
    document.head.appendChild(script);
  });
}

function trackEngagement() {
  document.querySelectorAll<HTMLElement>("a, button").forEach((el) => {
    el.addEventListener("click", () => {
      const label = el.innerText || el.getAttribute("aria-label") || "click";
      window.gtag?.("event", "click", { event_category: "engagement", event_label: label });
    });
  });

  let lastTracked = 0;
  window.addEventListener("scroll", () => {
    const pct = Math.round(((window.scrollY + window.innerHeight) / document.body.scrollHeight) * 100);
    [25, 50, 75, 100].forEach((p) => {
      if (pct >= p && p > lastTracked) {
        window.gtag?.("event", "scroll", { event_category: "engagement", event_label: `${p}%` });
        lastTracked = p;
      }
    });
  });
}

async function applyConsent(analytics: boolean, marketing: boolean) {
  if (!analytics) return;
  await loadGA4();
  window.gtag?.("consent", "update", {
    ad_storage: marketing ? "granted" : "denied",
    analytics_storage: "granted",
  });
  trackEngagement();
}

export function CookiesPreferences() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);
  const [prefs, setPrefs] = useState<CookiePrefs>({
    technical: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed: CookiePrefs = JSON.parse(saved);
      setPrefs(parsed);
      applyConsent(parsed.analytics, parsed.marketing);
    } else {
      setVisible(true);
    }
  }, []);

  const toggle = (key: keyof Omit<CookiePrefs, "technical">) =>
    setPrefs((p) => ({ ...p, [key]: !p[key] }));

  const save = (newPrefs: CookiePrefs) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPrefs));
    setPrefs(newPrefs);
    setVisible(false);
    applyConsent(newPrefs.analytics, newPrefs.marketing);
  };

  const acceptAll = () =>
    save({ technical: true, analytics: true, marketing: true });

  const savePreferences = () => save(prefs);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-11/12 -translate-x-1/2 rounded-2xl border border-[#e8e3d8] bg-[#f7f4ee] p-6 shadow-xl md:w-2/3 lg:w-1/2">
      <h3
        className="mb-3 text-lg text-[#2e3d2f]"
        style={{ fontFamily: "Outfit, sans-serif" }}
      >
        {t("title")}
      </h3>
      <p className="mb-5 text-sm text-[#5a6b5b]">{t("description")}</p>

      <div className="mb-5 space-y-3">
        {/* Tecnici — sempre abilitati */}
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked
            disabled
            className="h-4 w-4 accent-[#4a6741]"
          />
          <span className="text-sm text-[#2e3d2f]">{t("technical")}</span>
        </label>

        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={prefs.analytics}
            onChange={() => toggle("analytics")}
            className="h-4 w-4 accent-[#4a6741]"
          />
          <span className="text-sm text-[#2e3d2f]">{t("analytics")}</span>
        </label>

        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={prefs.marketing}
            onChange={() => toggle("marketing")}
            className="h-4 w-4 accent-[#4a6741]"
          />
          <span className="text-sm text-[#2e3d2f]">{t("marketing")}</span>
        </label>
      </div>

      <div className="flex flex-col gap-2 md:flex-row md:justify-end">
        <button
          onClick={acceptAll}
          className="rounded-full bg-[#4a6741] px-5 py-2.5 text-sm font-medium text-[#f7f4ee] transition-colors hover:bg-[#3d5635]"
        >
          {t("acceptAll")}
        </button>
        <button
          onClick={savePreferences}
          className="rounded-full border border-[#e8e3d8] px-5 py-2.5 text-sm font-medium text-[#2e3d2f] transition-colors hover:bg-[#eee9de]"
        >
          {t("save")}
        </button>
      </div>
    </div>
  );
}