"use client";

import { useState, useEffect } from "react";
import type { Apartment } from "./adminTypes";

interface ApartmentFull extends Apartment {
  description: string;
  address: string;
  images: string[];
  areaImages: {
    bathroom: string[];
    kitchen: string[];
    bedroom: string[];
    balconyOrTerrace: string[];
  };
  amenities: {
    general: string[];
    kitchen: string[];
    bathroom: string[];
    outdoor: string[];
    laundry: string[];
  };
}

interface AdminApartmentProps {
  apartment: Apartment | null;
  onUpdate: (id: string, data: Partial<ApartmentFull>) => Promise<void>;
}

const AMENITY_LABELS: Record<keyof ApartmentFull["amenities"], string> = {
  general: "Generale",
  kitchen: "Cucina",
  bathroom: "Bagno",
  outdoor: "Esterno",
  laundry: "Lavanderia",
};

const AREA_IMAGE_LABELS: Record<keyof ApartmentFull["areaImages"], string> = {
  bathroom: "Bagno",
  kitchen: "Cucina",
  bedroom: "Camera da letto",
  balconyOrTerrace: "Balcone / Terrazza",
};

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
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#5a6b5b]">{label}</p>
      <div className="space-y-1.5">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={item}
              onChange={(e) => edit(i, e.target.value)}
              className="flex-1 rounded-lg border border-[#e8e3d8] bg-[#f7f4ee] px-3 py-1.5 text-sm focus:border-[#4a6741] focus:outline-none"
            />
            <button
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
          placeholder={`Aggiungi voce…`}
          className="flex-1 rounded-lg border border-[#e8e3d8] bg-white px-3 py-1.5 text-sm focus:border-[#4a6741] focus:outline-none"
        />
        <button
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
type AptTab = typeof TABS[number];

export function AdminApartment({ apartment, onUpdate }: AdminApartmentProps) {
  const apt = apartment as ApartmentFull | null;

  const [tab, setTab] = useState<AptTab>("Generale");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [maxGuests, setMaxGuests] = useState("");

  const [amenities, setAmenities] = useState<ApartmentFull["amenities"]>({
    general: [], kitchen: [], bathroom: [], outdoor: [], laundry: [],
  });

  const [images, setImages] = useState<string[]>([]);
  const [areaImages, setAreaImages] = useState<ApartmentFull["areaImages"]>({
    bathroom: [], kitchen: [], bedroom: [], balconyOrTerrace: [],
  });

  useEffect(() => {
    if (!apt) return;
    setName(apt.name ?? "");
    setDescription(apt.description ?? "");
    setAddress(apt.address ?? "");
    setPricePerNight(apt.pricePerNight?.toString() ?? "");
    setMaxGuests(apt.maxGuests?.toString() ?? "");
    setAmenities(apt.amenities ?? { general: [], kitchen: [], bathroom: [], outdoor: [], laundry: [] });
    setImages(apt.images ?? []);
    setAreaImages(apt.areaImages ?? { bathroom: [], kitchen: [], bedroom: [], balconyOrTerrace: [] });
  }, [apt]);

  if (!apt) return (
    <div className="flex h-40 items-center justify-center rounded-xl border border-[#e8e3d8]">
      <p className="text-sm text-[#5a6b5b]">Nessun appartamento trovato</p>
    </div>
  );

  const handleSave = async () => {
    setSaving(true);
    try {
      await onUpdate(apt._id, {
        name,
        description,
        address,
        pricePerNight: Number(pricePerNight),
        maxGuests: Number(maxGuests),
        amenities,
        images,
        areaImages,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-xl border border-[#e8e3d8] bg-white">
      {/* Header */}
      <div className="border-b border-[#e8e3d8] p-6">
        <h2 className="text-lg text-[#2e3d2f]" style={{ fontFamily: "Outfit, sans-serif" }}>
          Gestione Appartamento
        </h2>
        <p className="mt-1 text-xs text-[#5a6b5b]">{apt.name}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[#e8e3d8] bg-[#f7f4ee] px-4 pt-3">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-t-lg px-4 py-2 text-sm transition-colors ${
              tab === t
                ? "border border-b-white border-[#e8e3d8] bg-white font-medium text-[#2e3d2f]"
                : "text-[#5a6b5b] hover:text-[#2e3d2f]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="p-6">
        {/* Tab: Generale */}
        {tab === "Generale" && (
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#2e3d2f]">Nome</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-[#e8e3d8] bg-[#f7f4ee] px-3 py-2.5 text-sm focus:border-[#4a6741] focus:outline-none focus:ring-1 focus:ring-[#4a6741]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#2e3d2f]">Descrizione</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-[#e8e3d8] bg-[#f7f4ee] px-3 py-2.5 text-sm focus:border-[#4a6741] focus:outline-none focus:ring-1 focus:ring-[#4a6741]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#2e3d2f]">Indirizzo</label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-lg border border-[#e8e3d8] bg-[#f7f4ee] px-3 py-2.5 text-sm focus:border-[#4a6741] focus:outline-none focus:ring-1 focus:ring-[#4a6741]"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#2e3d2f]">Prezzo per notte (€)</label>
                <input
                  type="number"
                  value={pricePerNight}
                  onChange={(e) => setPricePerNight(e.target.value)}
                  className="w-full rounded-lg border border-[#e8e3d8] bg-[#f7f4ee] px-3 py-2.5 text-sm focus:border-[#4a6741] focus:outline-none focus:ring-1 focus:ring-[#4a6741]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#2e3d2f]">Max ospiti</label>
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

        {/* Tab: Amenities */}
        {tab === "Amenities" && (
          <div className="space-y-8">
            {(Object.keys(AMENITY_LABELS) as (keyof ApartmentFull["amenities"])[]).map((key) => (
              <StringArrayEditor
                key={key}
                label={AMENITY_LABELS[key]}
                items={amenities[key]}
                onChange={(items) => setAmenities((prev) => ({ ...prev, [key]: items }))}
              />
            ))}
          </div>
        )}

        {/* Tab: Immagini */}
        {tab === "Immagini" && (
          <div className="space-y-8">
            <StringArrayEditor
              label="Immagini principali"
              items={images}
              onChange={setImages}
            />
            {(Object.keys(AREA_IMAGE_LABELS) as (keyof ApartmentFull["areaImages"])[]).map((key) => (
              <StringArrayEditor
                key={key}
                label={`Area: ${AREA_IMAGE_LABELS[key]}`}
                items={areaImages[key]}
                onChange={(items) => setAreaImages((prev) => ({ ...prev, [key]: items }))}
              />
            ))}
          </div>
        )}

        {/* Save button */}
        <div className="mt-8 border-t border-[#e8e3d8] pt-6">
          <button
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