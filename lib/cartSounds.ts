/**
 * Imperative cart sound playback (safe to call from Zustand).
 * Audio is created lazily on first play so it runs in the same user-gesture stack as add/remove.
 */

let addSound: HTMLAudioElement | null = null;
let removeSound: HTMLAudioElement | null = null;

function ensureSounds() {
  if (typeof window === "undefined") return;
  if (!addSound) {
    addSound = new Audio("/sounds/add-to-cart.mp3");
    addSound.volume = 0.45;
    removeSound = new Audio("/sounds/remove-from-cart.mp3");
    removeSound.volume = 0.4;
  }
}

/** Preload in React (e.g. useSound) so the first click feels instant. */
export function initCartSounds() {
  ensureSounds();
}

export function playCartAddSound(enabled: boolean) {
  if (!enabled) return;
  ensureSounds();
  if (!addSound) return;
  addSound.currentTime = 0;
  void addSound.play().catch(() => {});
}

export function playCartRemoveSound(enabled: boolean) {
  if (!enabled) return;
  ensureSounds();
  if (!removeSound) return;
  removeSound.currentTime = 0;
  void removeSound.play().catch(() => {});
}
