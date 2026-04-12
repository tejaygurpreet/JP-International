/**
 * Bump `IMAGE_CACHE_BUST` whenever you replace files under `/public/images`
 * while keeping the same filename — forces browsers and the image optimizer
 * to fetch the new asset.
 */
export const IMAGE_CACHE_BUST = "8";

export function imageSrc(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  const sep = p.includes("?") ? "&" : "?";
  return `${p}${sep}v=${IMAGE_CACHE_BUST}`;
}
