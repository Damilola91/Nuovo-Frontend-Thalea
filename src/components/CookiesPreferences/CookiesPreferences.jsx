"use client";

import { useState, useEffect } from "react";

const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const CookiesPreferences = () => {
  const [visible, setVisible] = useState(false);
  const [preferences, setPreferences] = useState({
    technical: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem("thalea_cookies_preferences");
    if (saved) {
      const parsed = JSON.parse(saved);
      setPreferences(parsed);

      // se già accettati, carica gli script
      if ((parsed.analytics || parsed.marketing) && MEASUREMENT_ID) {
        loadGoogleAnalytics();
      }
    } else {
      setVisible(true);
    }
  }, []);

  const loadGoogleAnalytics = () => {
    if (!MEASUREMENT_ID) return; // sicurezza in caso variabile mancante

    if (!document.getElementById("ga-script")) {
      // carica script esterno
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
      script.async = true;
      script.id = "ga-script";
      document.head.appendChild(script);

      // inizializza GA
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", MEASUREMENT_ID);
    }
  };

  const handleChange = (type) => {
    setPreferences((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const acceptAll = () => {
    const allAccepted = { technical: true, analytics: true, marketing: true };
    localStorage.setItem(
      "thalea_cookies_preferences",
      JSON.stringify(allAccepted)
    );
    setPreferences(allAccepted);
    setVisible(false);

    loadGoogleAnalytics();
  };

  const savePreferences = () => {
    localStorage.setItem(
      "thalea_cookies_preferences",
      JSON.stringify(preferences)
    );
    setVisible(false);

    if (preferences.analytics || preferences.marketing) {
      loadGoogleAnalytics();
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 md:w-2/3 lg:w-1/2 bg-[#f3f1e7] border border-gray-300 rounded-lg shadow-lg p-6 z-50">
      <h3 className="text-[#46331d] text-lg font-semibold mb-4 text-center md:text-left">
        Preferenze Cookie
      </h3>
      <p className="text-[#46331d] text-sm mb-4">
        Puoi scegliere quali cookie accettare. I cookie tecnici sono necessari
        per il funzionamento del sito.
      </p>

      <div className="flex flex-col gap-2 mb-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={preferences.technical}
            disabled
            className="w-4 h-4"
          />
          <span className="text-[#46331d] text-sm">
            Cookie tecnici (necessari)
          </span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={preferences.analytics}
            onChange={() => handleChange("analytics")}
            className="w-4 h-4"
          />
          <span className="text-[#46331d] text-sm">Cookie analitici</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={preferences.marketing}
            onChange={() => handleChange("marketing")}
            className="w-4 h-4"
          />
          <span className="text-[#46331d] text-sm">Cookie di marketing</span>
        </label>
      </div>

      <div className="flex flex-col md:flex-row justify-end gap-2">
        <button
          onClick={acceptAll}
          className="bg-[#46331d] hover:bg-[#5a4621] text-white font-semibold py-2 px-4 rounded shadow transition-colors"
        >
          Accetta tutti
        </button>
        <button
          onClick={savePreferences}
          className="bg-white border border-gray-400 text-[#46331d] font-semibold py-2 px-4 rounded shadow hover:bg-gray-100 transition-colors"
        >
          Salva preferenze
        </button>
      </div>
    </div>
  );
};

export default CookiesPreferences;
