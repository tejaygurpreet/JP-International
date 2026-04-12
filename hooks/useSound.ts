import { useEffect } from "react";

import { initCartSounds, playCartAddSound, playCartRemoveSound } from "@/lib/cartSounds";
import { useCartStore } from "@/store/useCartStore";

export const useSound = () => {
  const enableSounds = useCartStore((s) => s.enableSounds);

  useEffect(() => {
    initCartSounds();
  }, []);

  const playAddSound = () => {
    playCartAddSound(enableSounds);
  };

  const playRemoveSound = () => {
    playCartRemoveSound(enableSounds);
  };

  return { playAddSound, playRemoveSound };
};
