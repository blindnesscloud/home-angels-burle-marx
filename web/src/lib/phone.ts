const PHONE_DIGITS_MIN = 10;
const PHONE_DIGITS_MAX = 13;

// Mesma regra usada em web/src/app/api/lead/route.ts — mantida separada e
// importada dos dois lados para não divergir entre validação client-side
// (feedback imediato) e server-side (fonte da verdade).
export function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length < PHONE_DIGITS_MIN || digits.length > PHONE_DIGITS_MAX) {
    return null;
  }
  return digits;
}
