// components/stage/stageMotion.ts
export const EASE_SOFT: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_SNAPPY: [number, number, number, number] = [
  0.22, 0.9, 0.22, 1,
];

// Durations
export const D_FAST = 0.22; // was 0.18
export const D_BASE = 0.52; // was 0.32

// Throttles
export const THROTTLE_WHEEL = 340;
export const THROTTLE_TOUCH = 360;
export const THROTTLE_KEYS = 280;

// Momentum absorb window
export const IGNORE_INPUT_MS = 800;
