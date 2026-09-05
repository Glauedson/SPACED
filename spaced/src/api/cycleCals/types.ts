export interface MoonPhaseInfo {
  name: string;               // ex: "Lua Gibosa Minguante"
  code: string;                // ex: "waning_gibbous"
  description: string;         // generated text
  illuminationPercent: number; // 0 to 100
  ageDays: number;             // days since the last new moon
  distanceKm: number;
}

export interface MoonForecastDay {
  date: string;       // "2026-09-01"
  label: string;       // "Today", "Tomorrow", "Thu", etc
  name: string;
  code: string;
  illuminationPercent: number;
  image: string;
}

export interface MoonData {
  current: MoonPhaseInfo;
  forecast: MoonForecastDay[]; // today + next 7 days
}