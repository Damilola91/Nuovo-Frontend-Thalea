"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

const NewsletterForm = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSubscribed(true);
        setEmail("");
        setError("");
      } else {
        setError(data.message || "Failed to subscribe. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to subscribe. Please try again.");
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
          className="w-full md:w-auto bg-[#46331d] hover:bg-[#5a4621] text-white font-semibold px-6 py-2 rounded-md transition-colors"
        >
          {t("footer.subscribeButton")}
        </button>
      </form>

      {subscribed && (
        <p className="text-green-400 mt-2 text-sm">
          {t("footer.subscribedMessage")}
        </p>
      )}

      {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
    </div>
  );
};

export default NewsletterForm;
