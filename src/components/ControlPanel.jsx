import React from 'react';

const LabeledRange = ({ label, value, min, max, step, onChange }) => (
  <div className="control-row">
    <label className="control-label">{label}</label>
    <input className="range" type="range" min={min} max={max} step={step} value={value} onChange={onChange} />
    <input className="num" type="number" min={min} max={max} step={step} value={value} onChange={onChange} />
  </div>
);

export default function ControlPanel({
  frequency,
  setFrequency,
  hb,
  setHb,
  hm,
  setHm,
  dStart,
  setDStart,
  dEnd,
  setDEnd,
  dStep,
  setDStep,
  enabledModels,
  setEnabledModels,
}) {
  return (
    <aside className="control-panel card">
      <h2>Simulator Controls</h2>

      <LabeledRange label="Frequency (MHz)" value={frequency} min={100} max={5000} step={1} onChange={(e) => setFrequency(Number(e.target.value))} />

      <LabeledRange label="Base Station Height (m)" value={hb} min={1} max={200} step={0.5} onChange={(e) => setHb(Number(e.target.value))} />

      <LabeledRange label="Mobile Height (m)" value={hm} min={0.5} max={10} step={0.1} onChange={(e) => setHm(Number(e.target.value))} />

      <LabeledRange label="Distance Start (km)" value={dStart} min={0.01} max={10} step={0.01} onChange={(e) => setDStart(Number(e.target.value))} />

      <LabeledRange label="Distance End (km)" value={dEnd} min={0.01} max={50} step={0.01} onChange={(e) => setDEnd(Number(e.target.value))} />

      <LabeledRange label="Distance Step (km)" value={dStep} min={0.001} max={5} step={0.001} onChange={(e) => setDStep(Number(e.target.value))} />

      <div className="model-toggles">
        <h3>Models</h3>
        <label>
          <input type="checkbox" checked={enabledModels.fspl} onChange={(e) => setEnabledModels((s) => ({ ...s, fspl: e.target.checked }))} /> Free Space
        </label>
        <label>
          <input type="checkbox" checked={enabledModels.hata} onChange={(e) => setEnabledModels((s) => ({ ...s, hata: e.target.checked }))} /> Okumura-Hata
        </label>
        <label>
          <input type="checkbox" checked={enabledModels.cost231} onChange={(e) => setEnabledModels((s) => ({ ...s, cost231: e.target.checked }))} /> COST-231 Hata
        </label>
      </div>
    </aside>
  );
}
