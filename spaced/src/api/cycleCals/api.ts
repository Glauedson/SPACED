import { getPhaseImage } from "./images";
import { buildMoonDescription } from "./descriptions";
import { translatePhase } from "./phaseTranslations";
import { getTodayDate } from "@utils/date";
import type { MoonData, MoonForecastDay, MoonPhaseInfo } from "./types";

const API_URL = "https://www.cyclecalcs.com/v2";

const DEFAULT_LOCATION = {
  latitude: -15.7939,
  longitude: -47.8828,
};

interface CycleCalcsMoonResponse {
  data: {
    phase: {
      name: string;
      code: string;
      illumination_percent: number;
      day_of_cycle: number;
    };
    distance_km: number;
  };
}

export async function getMoonData(
  latitude = DEFAULT_LOCATION.latitude,
  longitude = DEFAULT_LOCATION.longitude
): Promise<MoonData> {
  const getMoon = async (date?: string): Promise<CycleCalcsMoonResponse> => {
    const params = new URLSearchParams({
      lat: latitude.toString(),
      lon: longitude.toString(),
    });

    if (!date) date = getTodayDate()
    if (date) params.append("date", date);

    const response = await fetch(`${API_URL}/moon?${params.toString()}`);

    if (!response.ok) 
      throw new Error(`CycleCalcs API error: ${response.status}`);

    return response.json();
  };

  const currentResponse = await getMoon();

  const currentPhase = currentResponse.data.phase;

  const current: MoonPhaseInfo = {
    name: translatePhase(currentPhase.code),
    code: currentPhase.code,
    description: buildMoonDescription(
      currentPhase.code,
      currentPhase.illumination_percent
    ),
    illuminationPercent: currentPhase.illumination_percent,
    ageDays: currentPhase.day_of_cycle,
    distanceKm: currentResponse.data.distance_km,
  };

  const forecast: MoonForecastDay[] = [];

  for (let i = 0; i <= 7; i++) {
    const date = new Date();

    date.setDate(date.getDate() + i);

    const dateString = date.toISOString().split("T")[0];

    const response = await getMoon(dateString);
    const phase = response.data.phase;

    forecast.push({
      date: dateString,
      label: getForecastLabel(i, date),
      name: translatePhase(phase.code),
      code: phase.code,
      illuminationPercent: phase.illumination_percent,
      image: getPhaseImage(phase.code),
    });
  }

  return {
    current,
    forecast,
  };
}

function getForecastLabel(index: number, date: Date): string {
  if (index === 0) return "Hoje"
  if (index === 1) return "Amanhã"

  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "short",
  })
    .format(date)
    .replace(".", "");
}