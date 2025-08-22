"use client";

import { useTranslation } from "react-i18next";

const LocationSection = () => {
  const { t } = useTranslation();
  const points = t("location.points", { returnObjects: true });

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: "#46331d" }}
            >
              {t("location.title")}
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              {t("location.description")}
            </p>
            <div className="space-y-3">
              {points.map((point, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5"
                    style={{ color: "#46331d" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                  </svg>
                  <span style={{ color: "#46331d" }}>{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://res.cloudinary.com/dbxysr1a6/image/upload/v1738341325/THALEA-PALERMO-APARTMENT/duomo-monreale-resize.jpg"
              alt={t("location.title")}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
