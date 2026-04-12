/** Parse display prices like "$1,249" or "$695" to integer cents */
export function priceStringToCents(price: string): number {
  const n = Number.parseFloat(price.replace(/[^0-9.]/g, ""));
  if (Number.isNaN(n)) return 0;
  return Math.round(n * 100);
}

export function centsToDisplay(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
