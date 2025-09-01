"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const NewsletterForm = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(t("footer.subscribedMessage"));
        setEmail("");
      } else {
        toast.error(data.message || "Failed to subscribe. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubscribe}
        className="flex flex-col md:flex-row gap-3 w-full"
      >
        <input
          type="email"
          placeholder={t("footer.emailPlaceholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md border border-gray-300 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#46331d]"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto bg-[#46331d] hover:bg-[#5a4621] text-white font-semibold px-6 py-2 rounded-md transition-colors disabled:opacity-50"
        >
          {loading ? t("footer.loading") : t("footer.subscribeButton")}
        </button>
      </form>
    </div>
  );
};

export default NewsletterForm;
