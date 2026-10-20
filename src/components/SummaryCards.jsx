import React from 'react';

const Card = ({ title, value }) => (
  <div className="summary-card">
    <div className="summary-title">{title}</div>
    <div className="summary-value">{value}</div>
  </div>
);

export default function SummaryCards({ data = [], enabledModels = {} }) {
  const values = [];
  data.forEach((r) => {
    if (enabledModels.fspl && isFinite(r.fspl)) values.push(r.fspl);
    if (enabledModels.hata && isFinite(r.hata)) values.push(r.hata);
    if (enabledModels.cost231 && isFinite(r.cost231)) values.push(r.cost231);
  });

  const count = values.length;
  const max = count ? Math.max(...values).toFixed(2) : '-';
  const min = count ? Math.min(...values).toFixed(2) : '-';
  const avg = count ? (values.reduce((a, b) => a + b, 0) / count).toFixed(2) : '-';

  return (
    <div className="summary-cards">
      <Card title="Maximum Path Loss (dB)" value={max} />
      <Card title="Minimum Path Loss (dB)" value={min} />
      <Card title="Average Path Loss (dB)" value={avg} />
      <Card title="Number of Samples" value={count} />
    </div>
  );
}
