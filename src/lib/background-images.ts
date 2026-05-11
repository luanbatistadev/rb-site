export const backgroundImages = Array.from(
  { length: 25 },
  (_, i) => `/images/bg-${String(i + 1).padStart(2, "0")}.webp`
);

export function pickRandomBg(): string {
  return backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
}

// Shown instantly while the real bg image is fetching. Matches the average mood of the bg images
// (dark navy/violet radial). Real image fades in on top via `animate-fade-in`.
export const BG_PLACEHOLDER_STYLE = {
  background:
    "radial-gradient(ellipse at 30% 40%, #1d2740 0%, #14132a 35%, #0a0a14 75%, #050509 100%)",
};
