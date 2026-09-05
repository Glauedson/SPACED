import { FIRST_QUARTER, FULL, LAST_QUARTER, NEW, WANING_CRESCENT, WANING_GIBBOUS, WAXING_CRESCENT, WAXING_GIBBOUS } from "@assets/index";

export const PHASE_IMAGE: Record<string, string> = {
  new_moon: NEW,
  waxing_crescent: WAXING_CRESCENT,
  first_quarter: FIRST_QUARTER,
  waxing_gibbous: WAXING_GIBBOUS,
  full_moon: FULL,
  waning_gibbous: WANING_GIBBOUS,
  last_quarter: LAST_QUARTER,
  waning_crescent: WANING_CRESCENT,
};

export function getPhaseImage(code: string): string {
  return PHASE_IMAGE[code] ?? code;
}