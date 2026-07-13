import type { PortfolioItem } from "@/types/db";

/**
 * I due percorsi del portfolio ("Tech & Digital" e "Hospitality & Vino")
 * sono derivati dai contenuti esistenti senza toccare il modello dati:
 * la classificazione avviene per parole chiave su titolo e sottotitolo.
 *
 * - "base": radici comuni che precedono i due percorsi (liceo, musica,
 *   lingue, percorso personale).
 * - Le voci non riconosciute finiscono in "hospitality", il percorso
 *   principale: se in futuro dall'admin si aggiunge una voce tech basta
 *   includere nel titolo/sottotitolo una parola chiave tech (es. "IT",
 *   "software", "digital", "informatica").
 */
export type PortfolioTrack = "tech" | "hospitality" | "base";

// \b non funziona bene con parole accentate, ma qui le keyword sono ASCII.
const TECH_PATTERN =
  /\b(informatica|computer|acsai|software|digital|it|artificial intelligence|intelligenza artificiale|mezchila|engineering|ingegneria)\b/i;

const BASE_PATTERN =
  /\b(liceo|maturit|scientifica|high school|bachillerato|abrsm|piano|music|musica|música|pet|cambridge|lingue|languages|idiomas)/i;

function haystack(item: PortfolioItem): string {
  return `${item.title_it} ${item.title_en} ${item.subtitle ?? ""}`;
}

export function classifyTrack(item: PortfolioItem): PortfolioTrack {
  if (item.section === "percorso_personale") return "base";

  const text = haystack(item);

  if (BASE_PATTERN.test(text)) return "base";
  if (TECH_PATTERN.test(text)) return "tech";
  return "hospitality";
}

export function splitByTrack(items: PortfolioItem[]) {
  const tech: PortfolioItem[] = [];
  const hospitality: PortfolioItem[] = [];
  const base: PortfolioItem[] = [];

  for (const item of items) {
    if (item.section === "progetto") continue;
    const track = classifyTrack(item);
    if (track === "tech") tech.push(item);
    else if (track === "hospitality") hospitality.push(item);
    else base.push(item);
  }

  return { tech, hospitality, base };
}
