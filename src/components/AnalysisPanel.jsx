import React from 'react';

const names = {
  fspl: 'FSPL',
  hata: 'HATA',
  cost231: 'COST231',
};

export default function AnalysisPanel({ data = [], enabledModels = {} }) {
  const models = ['fspl', 'hata', 'cost231'].filter((model) => enabledModels[model]);
  const averages = {};

  const collect = (key) => {
    const vals = data.map((r) => r[key]).filter((v) => isFinite(v));
    if (!vals.length) return null;
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  };

  models.forEach((model) => {
    averages[model] = collect(model);
  });

  const ranked = models
    .map((model) => ({ model, value: averages[model] }))
    .filter((entry) => entry.value != null)
    .sort((a, b) => a.value - b.value);

  const lowest = ranked[0];
  const highest = ranked[ranked.length - 1];
  const difference = highest && lowest ? Number((highest.value - lowest.value).toFixed(2)) : null;

  const observations = [
    'Path loss increases with distance for every enabled model.',
    'Higher frequencies generally increase attenuation across models.',
  ];

  if (highest && lowest) {
    observations.push(`${names[highest.model]} predicts the highest average path loss.`);
    observations.push(`${names[lowest.model]} predicts the lowest average path loss.`);
    observations.push(`The difference between highest and lowest average path loss is ${difference} dB.`);
  }

  const interpretation = highest && lowest
    ? `The selected simulation conditions show ${names[highest.model]} as the most conservative propagation estimate, while ${names[lowest.model]} remains the most optimistic. This gap of ${difference} dB is useful for engineering margin and receiver sensitivity analysis.`
    : 'Enable at least one model to see a comparative analysis.';

  return (
    <div className="card analysis-card">
      <div className="analysis-header">
        <h3>Automatic Analysis</h3>
      </div>
      <div className="analysis-summary">
        <div className="analysis-item">
          <span>Highest Path Loss Model</span>
          <strong>{highest ? names[highest.model] : '-'}</strong>
        </div>
        <div className="analysis-item">
          <span>Lowest Path Loss Model</span>
          <strong>{lowest ? names[lowest.model] : '-'}</strong>
        </div>
        <div className="analysis-item">
          <span>Difference</span>
          <strong>{difference != null ? `${difference} dB` : '-'}</strong>
        </div>
      </div>
      <p className="analysis-interpretation">{interpretation}</p>
      <ul>
        {observations.map((o, i) => (
          <li key={i}>{o}</li>
        ))}
      </ul>
    </div>
  );
}
