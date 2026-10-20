const a_hm = (hm) => {
  const v = 11.75 * Number(hm);
  if (!isFinite(v) || v <= 0) return 0;
  return 3.2 * Math.pow(Math.log10(v), 2) - 4.97;
};

export const hata = (dKm, fMHz, hb, hm) => {
  const d = Number(dKm);
  const f = Number(fMHz);
  const hbN = Number(hb);
  const hmN = Number(hm);
  if (!isFinite(d) || d <= 0 || !isFinite(f) || f <= 0) return NaN;

  const ahm = a_hm(hmN);
  const pl =
    69.55 + 26.16 * Math.log10(f) - 13.82 * Math.log10(hbN) - ahm + (44.9 - 6.55 * Math.log10(hbN)) * Math.log10(d);
  return pl;
};

export const computeHata = (distancesKm = [], fMHz, hb, hm) =>
  distancesKm.map((d) => ({ distance: d, value: Number(hata(d, fMHz, hb, hm).toFixed(3)) }));

export default hata;
