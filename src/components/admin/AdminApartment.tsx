"use client";

import { useState, useEffect } from "react";
import type { Apartment } from "./adminTypes";
import { AmenityEditor } from "./AmenityEditor"
import {
  AMENITY_CATEGORIES,
  EMPTY_AMENITIES,
  type Amenities,
  type AmenityCategory,
} from "@/types/amenityTypes";

interface AdminApartmentProps {
  apartment: Apartment | null;
  onUpdate: (id: string, data: Partial<Apartment>) => Promise<void>;
}

type AreaImages = Apartment["areaImages"];

const AMENITY_LABELS: Record<AmenityCategory, string> = {
  general: "Generale",
  kitchen: "Cucina",
  bathroom: "Bagno",
  outdoor: "Esterno",
  laundry: "Lavanderia",
};

const AREA_IMAGE_LABELS: Record<keyof AreaImages, string> = {
  bathroom: "Bagno",
  kitchen: "Cucina",
  bedroom: "Camera da letto",
  balconyOrTerrace: "Balcone / Terrazza",
};

/** Editor per array di stringhe semplici (immagini) */
function StringArrayEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  const [newItem, setNewItem] = useState("");

  const add = () => {
    const v = newItem.trim();
    if (!v) return;
    onChange([...items, v]);
    setNewItem("");
  };

  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));

  const edit = (i: number, val: string) =>
    onChange(items.map((item, idx) => (idx === i ? val : item)));

  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#5a6b5b]">
        {label}
      </p>
      <div className="space-y-1.5">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={item}
              onChange={(e) => edit(i, e.target.value)}
              className="flex-1 rounded-lg border border-[#e8e3d8] bg-[#f7f4ee] px-3 py-1.5 text-sm focus:border-[#4a6741] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="rounded-lg border border-red-200 px-2.5 text-xs text-red-500 hover:bg-red-50"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Aggiungi URL immagine…"
          className="flex-1 rounded-lg border border-[#e8e3d8] bg-white px-3 py-1.5 text-sm focus:border-[#4a6741] focus:outline-none"
        />
        <button
          type="button"
          onClick={add}
          className="rounded-lg bg-[#4a6741] px-3 py-1.5 text-xs text-white hover:bg-[#3d5635]"
        >
          + Aggiungi
        </button>
      </div>
    </div>
  );
}

const TABS = ["Generale", "Amenities", "Immagini"] as const;
type AptTab = (typeof TABS)[number];

export function AdminApartment({ apartment, onUpdate }: AdminApartmentProps) {
  const [tab, setTab] = useState<AptTab>("Generale");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [amenities, setAmenities] = useState<Amenities>(EMPTY_AMENITIES);
  const [images, setImages] = useState<string[]>([]);
  const [areaImages, setAreaImages] = useState<AreaImages>({
    bathroom: [],
    kitchen: [],
    bedroom: [],
    balconyOrTerrace: [],
  });

  useEffect(() => {
    if (!apartment) return;
    setName(apartment.name ?? "");
    setDescription(apartment.description ?? "");
    setAddress(apartment.address ?? "");
    setPricePerNight(apartment.pricePerNight?.toString() ?? "");
    setMaxGuests(apartment.maxGuests?.toString() ?? "");
    setAmenities(apartment.amenities ?? EMPTY_AMENITIES);
    setImages(apartment.images ?? []);
    setAreaImages(
      apartment.areaImages ?? {
        bathroom: [],
        kitchen: [],
        bedroom: [],
        balconyOrTerrace: [],
      },
    );
  }, [apartment]);

  if (!apartment)
    return (
      <div className="flex h-40 items-center justify-center rounded-xl border border-[#e8e3d8]">
        <p className="text-sm text-[#5a6b5b]">Nessun appartamento trovato</p>
      </div>
    );

  /** Rimuove le voci con `it` vuoto: il backend le rifiuterebbe */
  const cleanAmenities = (input: Amenities): Amenities => {
    const out = { ...EMPTY_AMENITIES };
    for (const cat of AMENITY_CATEGORIES) {
      out[cat] = (input[cat] ?? []).filter((a) => a.it.trim().length > 0);
    }
    return out;
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await onUpdate(apartment._id, {
        name,
        description,
        address,
        pricePerNight: Number(pricePerNight),
        maxGuests: Number(maxGuests),
        amenities: cleanAmenities(amenities),
        images,
        areaImages,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Errore durante il salvataggio",
      );
    } finally {
      setSaving(false);
    }
  };

  const emptyItalianCount = AMENITY_CATEGORIES.reduce(
    (sum, cat) =>
      sum + (amenities[cat] ?? []).filter((a) => !a.it.trim()).length,
    0,
  );

  return (
    <div className="rounded-xl border border-[#e8e3d8] bg-white">
      {/* Header */}
      <div className="border-b border-[#e8e3d8] p-6">
        <h2
          className="text-lg text-[#2e3d2f]"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          Gestione Appartamento
        </h2>
        <p className="mt-1 text-xs text-[#5a6b5b]">{apartment.name}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[#e8e3d8] bg-[#f7f4ee] px-4 pt-3">
        {TABS.map((tabName) => (
          <button
            key={tabName}
            type="button"
            onClick={() => setTab(tabName)}
            className={`rounded-t-lg px-4 py-2 text-sm transition-colors ${
              tab === tabName
                ? "border border-[#e8e3d8] border-b-white bg-white font-medium text-[#2e3d2f]"
                : "text-[#5a6b5b] hover:text-[#2e3d2f]"
            }`}
          >
            {tabName}
          </button>
        ))}
      </div>

      <div className="p-6">
        {/* ── Tab: Generale ── */}
        {tab === "Generale" && (
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#2e3d2f]">
                Nome
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-[#e8e3d8] bg-[#f7f4ee] px-3 py-2.5 text-sm focus:border-[#4a6741] focus:outline-none focus:ring-1 focus:ring-[#4a6741]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#2e3d2f]">
                Descrizione
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-[#e8e3d8] bg-[#f7f4ee] px-3 py-2.5 text-sm focus:border-[#4a6741] focus:outline-none focus:ring-1 focus:ring-[#4a6741]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#2e3d2f]">
                Indirizzo
              </label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-lg border border-[#e8e3d8] bg-[#f7f4ee] px-3 py-2.5 text-sm focus:border-[#4a6741] focus:outline-none focus:ring-1 focus:ring-[#4a6741]"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#2e3d2f]">
                  Prezzo per notte (€)
                </label>
                <input
                  type="number"
                  value={pricePerNight}
                  onChange={(e) => setPricePerNight(e.target.value)}
                  className="w-full rounded-lg border border-[#e8e3d8] bg-[#f7f4ee] px-3 py-2.5 text-sm focus:border-[#4a6741] focus:outline-none focus:ring-1 focus:ring-[#4a6741]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#2e3d2f]">
                  Max ospiti
                </label>
                <input
                  type="number"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                  className="w-full rounded-lg border border-[#e8e3d8] bg-[#f7f4ee] px-3 py-2.5 text-sm focus:border-[#4a6741] focus:outline-none focus:ring-1 focus:ring-[#4a6741]"
                />
              </div>
            </div>
          </div>
        )}

        {/* ── Tab: Amenities ── */}
        {tab === "Amenities" && (
          <div className="space-y-8">
            <p className="rounded-lg bg-[#f7f4ee] px-4 py-3 text-xs leading-relaxed text-[#5a6b5b]">
              L&apos;italiano è obbligatorio e viene usato come fallback quando
              una traduzione manca. Clicca su una voce per aprire i campi delle
              sei lingue: il badge mostra quante sono compilate.
            </p>

            {emptyItalianCount > 0 && (
              <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-700">
                {emptyItalianCount}{" "}
                {emptyItalianCount === 1 ? "voce ha" : "voci hanno"} il campo
                italiano vuoto e{" "}
                {emptyItalianCount === 1 ? "verrà scartata" : "verranno scartate"}{" "}
                al salvataggio.
              </p>
            )}

            {AMENITY_CATEGORIES.map((cat) => (
              <AmenityEditor
                key={cat}
                label={AMENITY_LABELS[cat]}
                items={amenities[cat] ?? []}
                onChange={(items) =>
                  setAmenities((prev) => ({ ...prev, [cat]: items }))
                }
              />
            ))}
          </div>
        )}

        {/* ── Tab: Immagini ── */}
        {tab === "Immagini" && (
          <div className="space-y-8">
            <StringArrayEditor
              label="Immagini principali"
              items={images}
              onChange={setImages}
            />
            {(Object.keys(AREA_IMAGE_LABELS) as (keyof AreaImages)[]).map(
              (key) => (
                <StringArrayEditor
                  key={key}
                  label={`Area: ${AREA_IMAGE_LABELS[key]}`}
                  items={areaImages[key] ?? []}
                  onChange={(items) =>
                    setAreaImages((prev) => ({ ...prev, [key]: items }))
                  }
                />
              ),
            )}
          </div>
        )}

        {/* Salvataggio */}
        <div className="mt-8 border-t border-[#e8e3d8] pt-6">
          {error && (
            <p className="mb-3 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">
              {error}
            </p>
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-full bg-[#4a6741] px-8 py-2.5 text-sm font-medium text-[#f7f4ee] transition-colors hover:bg-[#3d5635] disabled:opacity-50"
          >
            {saving ? "Salvataggio…" : saved ? "✓ Salvato" : "Salva modifiche"}
          </button>
        </div>
      </div>
    </div>
  );
}