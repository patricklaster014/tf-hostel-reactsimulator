import { hata } from './hata';

export const cost231 = (dKm, fMHz, hb, hm) => {
  const base = hata(dKm, fMHz, hb, hm);
  if (!isFinite(base)) return NaN;
  return base + 3 + (46.3 + 33.9 * Math.log10(fMHz) - 13.82 * Math.log10(hb));
};

// Correct COST-231: implement direct formula instead (clean version)
export const cost231Correct = (dKm, fMHz, hb, hm) => {
  const d = Number(dKm);
  const f = Number(fMHz);
  const hbN = Number(hb);
  const hmN = Number(hm);
  if (!isFinite(d) || d <= 0 || !isFinite(f) || f <= 0) return NaN;

  const a = 3.2 * Math.pow(Math.log10(11.75 * hmN), 2) - 4.97;
  const pl =
    46.3 + 33.9 * Math.log10(f) - 13.82 * Math.log10(hbN) - a + (44.9 - 6.55 * Math.log10(hbN)) * Math.log10(d) + 3;
  return pl;
};

export const computeCOST231 = (distancesKm = [], fMHz, hb, hm) =>
  distancesKm.map((d) => ({ distance: d, value: Number(cost231Correct(d, fMHz, hb, hm).toFixed(3)) }));

export default cost231Correct;
