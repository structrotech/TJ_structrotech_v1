import type { Transition } from "framer-motion";

/** Bottom-to-top fade — shared sitewide timing */
export const fadeUpHidden = { opacity: 0, y: 24 };
export const fadeUpVisible = { opacity: 1, y: 0 };

export const fadeUpDuration = 0.9;
export const fadeUpStagger = 0.12;

export const viewportOnce = { once: true };

export function fadeUpTransition(delay = 0): Transition {
  return {
    duration: fadeUpDuration,
    delay,
    ease: [0.22, 1, 0.36, 1],
  };
}

export function fadeUpInViewProps(delay = 0) {
  return {
    initial: fadeUpHidden,
    whileInView: fadeUpVisible,
    viewport: viewportOnce,
    transition: fadeUpTransition(delay),
  };
}

export function fadeUpMountProps(delay = 0) {
  return {
    initial: fadeUpHidden,
    animate: fadeUpVisible,
    transition: fadeUpTransition(delay),
  };
}

export function listStaggerDelay(index: number) {
  return index * fadeUpStagger;
}
