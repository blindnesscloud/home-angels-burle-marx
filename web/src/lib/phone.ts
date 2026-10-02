const PHONE_DIGITS_MIN = 10;
const PHONE_DIGITS_MAX = 13;

// Mesma regra de public/api/lead.php (10 a 13 dígitos). Se mudar aqui, mudar
// lá também: o PHP é a fonte da verdade, isto é só feedback imediato.
export function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length < PHONE_DIGITS_MIN || digits.length > PHONE_DIGITS_MAX) {
    return null;
  }
  return digits;
}
