"use client";

import { useState } from "react";
import type { Offer } from "./adminTypes";

interface AdminOffersProps {
  offers: Offer[];
  onCreate: (data: Omit<Offer, "_id">) => Promise<void>;
  onUpdate: (id: string, data: Partial<Offer>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const emptyOffer = {
  title: "",
  description: "",
  discountPercentage: 10,
  validFrom: "",
  validTo: "",
  active: true,
};

export function AdminOffers({ offers, onCreate, onUpdate, onDelete }: AdminOffersProps) {
  const [form, setForm] = useState(emptyOffer);
  const [saving, setSaving] = useState(false);

  const handleCreate = async () => {
    if (!form.title || !form.validFrom || !form.validTo) return;
    setSaving(true);
    try {
      await onCreate(form);
      setForm(emptyOffer);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Eliminare questa offerta?")) return;
    await onDelete(id);
  };

  const fmt = (d: string) => new Date(d).toLocaleDateString("it-IT");

  return (
    <div className="rounded-xl border border-[#e8e3d8] bg-white p-6">
      <h2 className="mb-6 text-lg text-[#2e3d2f]" style={{ fontFamily: "Outfit, sans-serif" }}>
        Offerte
      </h2>

      {/* Form nuova offerta */}
      <div className="mb-6 rounded-xl border border-[#e8e3d8] bg-[#f7f4ee] p-4">
        <p className="mb-4 text-xs font-medium uppercase tracking-wider text-[#5a6b5b]">Nuova offerta</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            placeholder="Titolo"
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            className="rounded-lg border border-[#e8e3d8] bg-white px-3 py-2 text-sm focus:border-[#4a6741] focus:outline-none"
          />
          <input
            type="number"
            placeholder="Sconto %"
            value={form.discountPercentage}
            onChange={(e) => setForm((p) => ({ ...p, discountPercentage: Number(e.target.value) }))}
            className="rounded-lg border border-[#e8e3d8] bg-white px-3 py-2 text-sm focus:border-[#4a6741] focus:outline-none"
          />
          <input
            placeholder="Descrizione"
            value={form.description}
            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            className="rounded-lg border border-[#e8e3d8] bg-white px-3 py-2 text-sm focus:border-[#4a6741] focus:outline-none sm:col-span-2"
          />
          <div>
            <label className="mb-1 block text-xs text-[#5a6b5b]">Valida dal</label>
            <input
              type="date"
              value={form.validFrom}
              onChange={(e) => setForm((p) => ({ ...p, validFrom: e.target.value }))}
              className="w-full rounded-lg border border-[#e8e3d8] bg-white px-3 py-2 text-sm focus:border-[#4a6741] focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-[#5a6b5b]">Valida fino al</label>
            <input
              type="date"
              value={form.validTo}
              onChange={(e) => setForm((p) => ({ ...p, validTo: e.target.value }))}
              className="w-full rounded-lg border border-[#e8e3d8] bg-white px-3 py-2 text-sm focus:border-[#4a6741] focus:outline-none"
            />
          </div>
        </div>
        <button
          onClick={handleCreate}
          disabled={saving}
          className="mt-3 rounded-full bg-[#4a6741] px-5 py-2 text-sm font-medium text-[#f7f4ee] hover:bg-[#3d5635] disabled:opacity-50"
        >
          {saving ? "Salvataggio…" : "Crea offerta"}
        </button>
      </div>

      {/* Lista offerte */}
      <div className="space-y-3">
        {offers.length === 0 && (
          <p className="text-center text-sm text-[#5a6b5b]">Nessuna offerta attiva</p>
        )}
        {offers.map((offer) => (
          <div key={offer._id} className="flex items-center justify-between rounded-xl border border-[#e8e3d8] p-4">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-[#2e3d2f]">{offer.title}</p>
                <span className="rounded-full bg-[#4a6741]/10 px-2 py-0.5 text-xs text-[#4a6741]">
                  -{offer.discountPercentage}%
                </span>
                {!offer.active && (
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-600">Inattiva</span>
                )}
              </div>
              <p className="mt-0.5 text-xs text-[#5a6b5b]">{fmt(offer.validFrom)} → {fmt(offer.validTo)}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onUpdate(offer._id, { active: !offer.active })}
                className="rounded-full border border-[#e8e3d8] px-3 py-1 text-xs text-[#5a6b5b] hover:bg-[#f7f4ee]"
              >
                {offer.active ? "Disattiva" : "Attiva"}
              </button>
              <button
                onClick={() => handleDelete(offer._id)}
                className="rounded-full border border-red-200 px-3 py-1 text-xs text-red-600 hover:bg-red-50"
              >
                Elimina
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}