const PHASE_INTRO_PT: Record<string, string> = {
  new_moon:
    "O ciclo lunar está no seu início, marcando a Lua Nova.",
  waxing_crescent:
    "O ciclo lunar está na fase inicial de crescimento, rumo ao Quarto Crescente.",
  first_quarter:
    "O ciclo lunar atingiu o Quarto Crescente, com metade do disco iluminada.",
  waxing_gibbous:
    "O ciclo lunar está em transição avançada para a Lua Cheia.",
  full_moon:
    "O ciclo lunar atingiu seu ápice com a Lua Cheia, totalmente iluminada.",
  waning_gibbous:
    "O ciclo lunar está em transição, minguando a partir da Lua Cheia.",
  last_quarter:
    "O ciclo lunar atingiu o Quarto Minguante, com metade do disco iluminada.",
  waning_crescent:
    "O ciclo lunar está na fase final, minguando rumo à próxima Lua Nova.",
};

function visibilityNote(illuminationPercent: number): string {
  if (illuminationPercent >= 85) {
    return "Com alta visibilidade de suas principais crateras como Tycho e Copérnico através de binóculos comuns, esta noite apresenta ótimas condições de observação.";
  }
  if (illuminationPercent >= 35) {
    return "O contraste ao longo do terminador realça o relevo de crateras como Copérnico e Tycho, ideal para observação com binóculos ou um telescópio pequeno.";
  }
  if (illuminationPercent >= 5) {
    return "A fina lâmina iluminada permite observar detalhes sutis perto do terminador, embora a maior parte do disco permaneça escura.";
  }
  return "Com o disco quase todo escuro, esta é uma excelente noite para observar objetos de céu profundo, longe do brilho da Lua.";
}

export function buildMoonDescription(
  phaseCode: string,
  illuminationPercent: number
): string {
  const intro =
    PHASE_INTRO_PT[phaseCode] ?? "O ciclo lunar segue seu curso normal.";
  return `${intro} ${visibilityNote(illuminationPercent)}`;
}