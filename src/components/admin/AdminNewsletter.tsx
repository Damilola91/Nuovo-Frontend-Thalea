"use client";

import { useState } from "react";

interface AdminNewsletterProps {
  onSend: (subject: string, content: string) => Promise<void>;
}

export function AdminNewsletter({ onSend }: AdminNewsletterProps) {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    if (!subject.trim() || !content.trim()) return;
    if (!confirm("Inviare la newsletter a tutti gli iscritti?")) return;
    setSending(true);
    try {
      await onSend(subject, content);
      setSent(true);
      setSubject("");
      setContent("");
      setTimeout(() => setSent(false), 3000);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="rounded-xl border border-[#e8e3d8] bg-white p-6">
      <h2 className="mb-6 text-lg text-[#2e3d2f]" style={{ fontFamily: "Outfit, sans-serif" }}>
        Newsletter
      </h2>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#2e3d2f]">Oggetto</label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Oggetto della newsletter…"
            className="w-full rounded-lg border border-[#e8e3d8] bg-[#f7f4ee] px-3 py-2.5 text-sm focus:border-[#4a6741] focus:outline-none focus:ring-1 focus:ring-[#4a6741]"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#2e3d2f]">Contenuto</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Scrivi il contenuto della newsletter…"
            rows={6}
            className="w-full rounded-lg border border-[#e8e3d8] bg-[#f7f4ee] px-3 py-2.5 text-sm focus:border-[#4a6741] focus:outline-none focus:ring-1 focus:ring-[#4a6741]"
          />
        </div>
      </div>

      <button
        onClick={handleSend}
        disabled={sending || !subject.trim() || !content.trim()}
        className="mt-4 rounded-full bg-[#4a6741] px-6 py-2.5 text-sm font-medium text-[#f7f4ee] transition-colors hover:bg-[#3d5635] disabled:opacity-50"
      >
        {sending ? "Invio in corso…" : sent ? "✓ Newsletter inviata!" : "Invia newsletter"}
      </button>
    </div>
  );
}