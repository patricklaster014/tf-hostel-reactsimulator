export const fspl = (dKm, fMHz) => {
  const d = Number(dKm);
  const f = Number(fMHz);
  if (!isFinite(d) || d <= 0 || !isFinite(f) || f <= 0) return NaN;
  return 20 * Math.log10(d) + 20 * Math.log10(f) + 32.44;
};

export const computeFSPL = (distancesKm = [], fMHz) =>
  distancesKm.map((d) => ({ distance: d, value: Number(fspl(d, fMHz).toFixed(3)) }));

export default fspl;
