"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";

export function LoginForm() {
  const t = useTranslations("login");
  const router = useRouter();
  const { login, loading } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      toast.success(t("success"));
      const { role } = useAuthStore.getState();
      router.push(role === "admin" ? "/admin/dashboard" : "/");
    } catch {
      toast.error(t("error"));
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="mb-8 text-center">
        <p
          className="text-3xl text-[#2e3d2f]"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          Thălēa
        </p>
        <h1 className="mt-2 text-xl text-[#2e3d2f]">
          {t("title")}
        </h1>
        <p className="mt-1 text-sm text-[#5a6b5b]">{t("subtitle")}</p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-[#e8e3d8] bg-white p-8 shadow-sm"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#2e3d2f]">
              {t("email")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@thalea.it"
              className="w-full rounded-lg border border-[#e8e3d8] bg-[#f7f4ee] px-3 py-2.5 text-sm text-[#2e3d2f] placeholder:text-[#5a6b5b]/50 focus:border-[#4a6741] focus:outline-none focus:ring-1 focus:ring-[#4a6741]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#2e3d2f]">
              {t("password")}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full rounded-lg border border-[#e8e3d8] bg-[#f7f4ee] px-3 py-2.5 text-sm text-[#2e3d2f] placeholder:text-[#5a6b5b]/50 focus:border-[#4a6741] focus:outline-none focus:ring-1 focus:ring-[#4a6741]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-[#4a6741] py-3 text-sm font-medium text-[#f7f4ee] transition-transform hover:scale-[1.02] disabled:opacity-50"
        >
          {loading ? t("loading") : t("submit")}
        </button>
      </form>
    </div>
  );
}