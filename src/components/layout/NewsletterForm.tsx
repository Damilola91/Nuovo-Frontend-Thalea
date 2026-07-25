"use client";

import { useState, useTransition, type SyntheticEvent } from "react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { subscribeNewsletterAction } from "@/actions/newsletterActions";

export function NewsletterForm() {
  const t = useTranslations("footer");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Inserisci un'email valida");
      return;
    }

    startTransition(async () => {
      const result = await subscribeNewsletterAction(email);
      if (result.success) {
        setSubscribed(true);
        setEmail("");
      } else {
        toast.error(result.message ?? "Errore durante l'iscrizione");
      }
    });
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
        disabled={isPending}
        className="rounded-md bg-white/15 px-4 py-2 text-sm font-medium text-white hover:bg-white/25 transition-colors disabled:opacity-50"
      >
        {isPending ? "..." : t("subscribeButton")}
      </button>
    </form>
  );
}