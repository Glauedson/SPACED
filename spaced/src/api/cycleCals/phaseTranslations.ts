export const PHASE_NAMES_PT: Record<string, string> = {
  new_moon: "Lua Nova",
  waxing_crescent: "Lua Crescente",
  first_quarter: "Quarto Crescente",
  waxing_gibbous: "Lua Gibosa Crescente",
  full_moon: "Lua Cheia",
  waning_gibbous: "Lua Gibosa Minguante",
  last_quarter: "Quarto Minguante",
  waning_crescent: "Lua Minguante",
};

export function translatePhase(code: string): string {
  return PHASE_NAMES_PT[code] ?? code;
}