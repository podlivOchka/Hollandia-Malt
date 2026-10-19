"use client";

import { useEffect, useRef, useState } from "react";

export function useSiteMotion() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let positionX = 0;
    let positionY = 0;
    let scrollFrame = 0;

    const reveal = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          reveal.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    root.querySelectorAll("[data-reveal]").forEach(el => reveal.observe(el));

    const sections = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: "-20% 0px -55% 0px" });
    root.querySelectorAll("section[id]").forEach(el => sections.observe(el));

    const updateScroll = () => {
      scrollFrame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll-progress", `${max > 0 ? window.scrollY / max : 0}`);
      const hero = heroRef.current;
      if (hero && !reduced.matches) {
        const top = hero.getBoundingClientRect().top;
        const offset = Math.max(-hero.offsetHeight, Math.min(0, top));
        hero.style.setProperty("--hero-scroll", `${-offset * 0.12}px`);
      }
    };
    const onScroll = () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll); };
    const animatePointer = () => {
      positionX += (pointerX - positionX) * 0.075;
      positionY += (pointerY - positionY) * 0.075;
      if (bottleRef.current) {
        bottleRef.current.style.setProperty("--pointer-x", `${positionX}px`);
        bottleRef.current.style.setProperty("--pointer-y", `${positionY}px`);
      }
      if (Math.abs(pointerX - positionX) + Math.abs(pointerY - positionY) > 0.05) {
        frame = requestAnimationFrame(animatePointer);
      } else { frame = 0; }
    };
    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || reduced.matches) return;
      const box = heroRef.current?.getBoundingClientRect();
      if (!box) return;
      pointerX = ((event.clientX - box.left) / box.width - 0.5) * 32;
      pointerY = ((event.clientY - box.top) / box.height - 0.5) * 22;
      if (!frame) frame = requestAnimationFrame(animatePointer);
    };
    const resetPointer = () => {
      pointerX = 0; pointerY = 0;
      if (!frame && !reduced.matches) frame = requestAnimationFrame(animatePointer);
    };
    const hero = heroRef.current;
    hero?.addEventListener("pointermove", onPointer);
    hero?.addEventListener("pointerleave", resetPointer);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateScroll();
    return () => {
      reveal.disconnect(); sections.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      hero?.removeEventListener("pointermove", onPointer);
      hero?.removeEventListener("pointerleave", resetPointer);
      cancelAnimationFrame(frame); cancelAnimationFrame(scrollFrame);
    };
  }, []);

  return { rootRef, heroRef, bottleRef, activeSection };
}
