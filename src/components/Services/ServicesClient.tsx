"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

interface ServiceItem {
  title: string;
  description: string;
  image: string;
  reverse: boolean;
}

function useIntersectionReveal(count: number) {
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [visible, setVisible] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number((entry.target as HTMLElement).dataset.index);
          setVisible((prev) => (prev[idx] ? prev : { ...prev, [idx]: true }));
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 },
    );
    refs.current.forEach((el) => { if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [count]);

  const setRef = useCallback((el: HTMLElement | null, index: number) => {
    refs.current[index] = el;
  }, []);

  return { visible, setRef };
}

export function ServicesClient({ services }: { services: ServiceItem[] }) {
  const { visible, setRef } = useIntersectionReveal(services.length);

  return (
    <>
      {services.map((service, index) => (
        <section
          key={index}
          ref={(el) => setRef(el, index)}
          data-index={index}
          className={`py-16 transition-all duration-700 ease-out ${
            visible[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <div
            className={`mx-auto grid max-w-5xl items-center gap-12 px-6 md:grid-cols-2 ${
              service.reverse ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div
              className="group overflow-hidden rounded-xl bg-[#eee9de]"
              style={{ aspectRatio: "4 / 3" }}
            >
              <Image
                src={service.image}
                alt={service.title}
                width={800}
                height={600}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div>
              <h2
                className="text-3xl text-[#2e3d2f] md:text-4xl"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {service.title}
              </h2>
              <p className="mt-4 leading-relaxed text-[#5a6b5b]">
                {service.description}
              </p>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}