// Lightweight animation utilities using Web Animations API
// Replaces GSAP with native browser APIs for fluid, 60fps animations

export function animateIn(
  el: HTMLElement | null,
  opts: {
    delay?: number;
    duration?: number;
    from?: Keyframe;
    to?: Keyframe;
  } = {}
) {
  if (!el) return;
  const { delay = 0, duration = 400, from = { opacity: 0, transform: "translateY(12px)" }, to = { opacity: 1, transform: "translateY(0)" } } = opts;
  el.animate([from, to], { duration, delay, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "forwards" });
}

export function staggerIn(
  parent: HTMLElement | null,
  opts: { stagger?: number; duration?: number; from?: Keyframe; selector?: string } = {}
) {
  if (!parent) return;
  const { stagger = 40, duration = 300, from = { opacity: 0, transform: "translateX(-6px)" }, selector } = opts;
  const children = selector ? parent.querySelectorAll(selector) : parent.children;
  Array.from(children).forEach((child, i) => {
    (child as HTMLElement).animate(
      [from, { opacity: 1, transform: "translateX(0) translateY(0) scale(1)" }],
      { duration, delay: i * stagger, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "forwards" }
    );
  });
}

export function pulseLoop(el: HTMLElement | null, color?: string): Animation | null {
  if (!el) return null;
  return el.animate(
    [{ opacity: 1 }, { opacity: 0.3 }, { opacity: 1 }],
    { duration: 1200, iterations: Infinity, easing: "ease-in-out" }
  );
}

export function scaleIn(el: HTMLElement | null, delay = 0) {
  if (!el) return;
  el.animate(
    [{ opacity: 0, transform: "scale(0.85)" }, { opacity: 1, transform: "scale(1)" }],
    { duration: 400, delay, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)", fill: "forwards" }
  );
}

export function scrollReveal(el: HTMLElement | null) {
  if (!el) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateIn(el, { duration: 500, from: { opacity: 0, transform: "translateY(24px)" } });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.1 }
  );
  observer.observe(el);
}

export function tickUp(el: HTMLElement | null) {
  if (!el) return null;
  return el.animate(
    [
      { transform: "translateY(0)", opacity: 1 },
      { transform: "translateY(-4px)", opacity: 0 },
      { transform: "translateY(4px)", opacity: 0 },
      { transform: "translateY(0)", opacity: 1 },
    ],
    { duration: 800, iterations: Infinity, easing: "ease-in-out" }
  );
}

export function cursorBlink(el: HTMLElement | null) {
  if (!el) return null;
  return el.animate(
    [{ opacity: 1 }, { opacity: 1 }, { opacity: 0 }, { opacity: 0 }],
    { duration: 1000, iterations: Infinity, easing: "steps(1)" }
  );
}
