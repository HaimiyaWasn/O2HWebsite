"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

type RevealOnScrollProps = {
  children: ReactNode;
  classname?: string;

  y?: number;
  duration?: number;
  delay?: number;

  threshold?: number;
  rootMargin?: string;

  once?: boolean;
};

export default function RevealOnScroll({
  children,
  classname = "",
  y = 20,
  duration = 700,
  delay = 0,
  threshold = 0,
  rootMargin = "0px",
  once = true,
}: RevealOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          if (once) {
            observer.unobserve(element);
          }
        } else {
          if (!once) {
            setIsVisible(false);
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return (
    <div
      ref={sectionRef}
      className={`transform-gpu transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      } ${classname}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
