/**
 * Bump `IMAGE_CACHE_BUST` whenever you replace files under `/public/images`
 * while keeping the same filename — forces browsers and the image optimizer
 * to fetch the new asset.
 */
export const IMAGE_CACHE_BUST = "8";

/**
 * Bump `SOUND_CACHE_BUST` whenever you replace files under `/public/sounds`
 * with the same filename — otherwise browsers may keep playing the cached MP3.
 */
export const SOUND_CACHE_BUST = "2";

export function imageSrc(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  const sep = p.includes("?") ? "&" : "?";
  return `${p}${sep}v=${IMAGE_CACHE_BUST}`;
}

export function soundSrc(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  const sep = p.includes("?") ? "&" : "?";
  return `${p}${sep}v=${SOUND_CACHE_BUST}`;
}
