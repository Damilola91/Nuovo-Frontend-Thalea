import { useState, useEffect, useRef, useCallback } from "react";

export function useIntersectionReveal(count: number) {
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
    refs.current.forEach((el) => {
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [count]);

  const setRef = useCallback((el: HTMLElement | null, index: number) => {
    refs.current[index] = el;
  }, []);

  return { visible, setRef };
}
