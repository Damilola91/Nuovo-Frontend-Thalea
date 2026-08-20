"use client";

import { useState } from "react";
import {
  SUPPORTED_LOCALES,
  LOCALE_LABELS,
  LOCALE_FLAGS,
  type LocalizedText,
  type SupportedLocale,
} from "@/types/amenityTypes";

interface AmenityEditorProps {
  label: string;
  items: LocalizedText[];
  onChange: (items: LocalizedText[]) => void;
}

const emptyItem = (): LocalizedText => ({ it: "" });

function countTranslations(item: LocalizedText): number {
  return SUPPORTED_LOCALES.filter((l) => {
    const v = item[l];
    return v && v.trim().length > 0;
  }).length;
}

export function AmenityEditor({ label, items, onChange }: AmenityEditorProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [newItemIt, setNewItemIt] = useState("");

  const add = () => {
    const v = newItemIt.trim();
    if (!v) return;
    onChange([...items, { it: v }]);
    setNewItemIt("");
    setExpandedIndex(items.length); // apre subito la nuova voce per tradurla
  };

  const remove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
    if (expandedIndex === index) setExpandedIndex(null);
  };

  const updateField = (
    index: number,
    locale: SupportedLocale,
    value: string,
  ) => {
    onChange(
      items.map((item, i) =>
        i === index ? { ...item, [locale]: value } : item,
      ),
    );
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-[#5a6b5b]">
          {label}
        </p>
        <span className="text-xs text-[#5a6b5b]">{items.length} voci</span>
      </div>

      <div className="space-y-2">
        {items.map((item, index) => {
          const translated = countTranslations(item);
          const isComplete = translated === SUPPORTED_LOCALES.length;
          const isOpen = expandedIndex === index;

          return (
            <div
              key={index}
              className="overflow-hidden rounded-lg border border-[#e8e3d8] bg-white"
            >
              {/* Riga compatta */}
              <div className="flex items-center gap-2 px-3 py-2">
                <button
                  type="button"
                  onClick={() => setExpandedIndex(isOpen ? null : index)}
                  className="flex flex-1 items-center gap-2 text-left"
                >
                  <span className="text-xs text-[#5a6b5b]">
                    {isOpen ? "▾" : "▸"}
                  </span>
                  <span className="flex-1 text-sm text-[#2e3d2f]">
                    {item.it || <em className="text-[#5a6b5b]">(vuoto)</em>}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      isComplete
                        ? "bg-[#4a6741]/10 text-[#4a6741]"
                        : "bg-[#8a7a5b]/10 text-[#8a7a5b]"
                    }`}
                  >
                    {translated}/{SUPPORTED_LOCALES.length}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="rounded border border-red-200 px-2 py-0.5 text-xs text-red-500 hover:bg-red-50"
                >
                  ✕
                </button>
              </div>

              {/* Campi per lingua */}
              {isOpen && (
                <div className="space-y-2 border-t border-[#e8e3d8] bg-[#f7f4ee] p-3">
                  {SUPPORTED_LOCALES.map((locale) => (
                    <div key={locale} className="flex items-center gap-2">
                      <span
                        className="w-24 shrink-0 text-xs text-[#5a6b5b]"
                        title={LOCALE_LABELS[locale]}
                      >
                        {LOCALE_FLAGS[locale]} {LOCALE_LABELS[locale]}
                      </span>
                      <input
                        value={item[locale] ?? ""}
                        onChange={(e) =>
                          updateField(index, locale, e.target.value)
                        }
                        placeholder={
                          locale === "it"
                            ? "Obbligatorio"
                            : `Traduzione (fallback: ${item.it})`
                        }
                        className={`flex-1 rounded-lg border bg-white px-3 py-1.5 text-sm focus:outline-none ${
                          locale === "it" && !item.it.trim()
                            ? "border-red-300 focus:border-red-400"
                            : "border-[#e8e3d8] focus:border-[#4a6741]"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Nuova voce */}
      <div className="mt-2 flex gap-2">
        <input
          value={newItemIt}
          onChange={(e) => setNewItemIt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Nuova voce in italiano…"
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