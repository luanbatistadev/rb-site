export const backgroundImages = Array.from(
  { length: 25 },
  (_, i) => `/images/bg-${String(i + 1).padStart(2, "0")}.webp`
);

export function pickRandomBg(): string {
  return backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
}
