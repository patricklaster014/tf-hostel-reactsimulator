import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const COLORS = {
  fspl: '#06b6d4',
  hata: '#f97316',
  cost231: '#ef4444',
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="tooltip-label">Distance: {label} km</div>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="tooltip-row" style={{ color: entry.color }}>
          <span>{entry.name}</span>
          <strong>{entry.value.toFixed(2)} dB</strong>
        </div>
      ))}
    </div>
  );
};

export default function PathLossGraph({ data = [], enabledModels = {} }) {
  return (
    <div className="card chart-card">
      <div className="chart-header">
        <h2>Path Loss vs Distance</h2>
        <p>Compare propagation models across the simulation range.</p>
      </div>
      <div className="chart-frame">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 18, right: 30, left: 0, bottom: 6 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#dbeafe" vertical={false} />
            <XAxis dataKey="distance" name="Distance (km)" tick={{ fill: '#334155', fontSize: 12 }} axisLine={true} tickLine={true} stroke="#94a3b8" />
            <YAxis tick={{ fill: '#334155', fontSize: 12 }} axisLine={true} tickLine={true} stroke="#94a3b8" />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#0ea5e9', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Legend verticalAlign="top" height={40} iconType="circle" wrapperStyle={{ paddingLeft: 10 }} />
            {enabledModels.fspl && (
              <Line
                type="monotone"
                dataKey="fspl"
                name="FSPL"
                stroke={COLORS.fspl}
                dot={false}
                strokeWidth={3}
                activeDot={{ r: 5 }}
                animationDuration={900}
                animationEasing="ease-out"
              />
            )}
            {enabledModels.hata && (
              <Line
                type="monotone"
                dataKey="hata"
                name="HATA"
                stroke={COLORS.hata}
                dot={false}
                strokeWidth={3}
                activeDot={{ r: 5 }}
                animationDuration={900}
                animationEasing="ease-out"
              />
            )}
            {enabledModels.cost231 && (
              <Line
                type="monotone"
                dataKey="cost231"
                name="COST231"
                stroke={COLORS.cost231}
                dot={false}
                strokeWidth={3}
                activeDot={{ r: 5 }}
                animationDuration={900}
                animationEasing="ease-out"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
