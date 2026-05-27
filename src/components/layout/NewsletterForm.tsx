"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

const API = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export function NewsletterForm() {
  const t = useTranslations("footer");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Inserisci un'email valida");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setSubscribed(true);
      setEmail("");
    } catch {
      toast.error("Errore durante l'iscrizione");
    } finally {
      setLoading(false);
    }
  };

  if (subscribed) {
    return <p className="text-sm text-[#f7f4ee]/70">{t("subscribedMessage")}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("emailPlaceholder")}
        className="rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-white/40"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-white/15 px-4 py-2 text-sm font-medium text-white hover:bg-white/25 transition-colors disabled:opacity-50"
      >
        {loading ? "..." : t("subscribeButton")}
      </button>
    </form>
  );
}