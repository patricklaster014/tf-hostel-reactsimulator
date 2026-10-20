import React, { useMemo, useState } from 'react';
import './App.css';
import './index.css';

import ControlPanel from './components/ControlPanel';
import PathLossGraph from './components/PathLossGraph';
import ResultsTable from './components/ResultsTable';
import SummaryCards from './components/SummaryCards';
import AnalysisPanel from './components/AnalysisPanel';

import fspl from './models/fspl';
import hata from './models/hata';
import cost231 from './models/cost231';

function generateDistances(start, end, step) {
  const out = [];
  if (step <= 0 || end < start) return out;
  let d = Number(start);
  const eps = step / 10;
  while (d <= end + eps) {
    out.push(Number(Number(d).toFixed(3)));
    d = Number((d + step).toFixed(12));
  }
  return out;
}

export default function App() {
  const [frequency, setFrequency] = useState(900);
  const [hb, setHb] = useState(40);
  const [hm, setHm] = useState(1.5);
  const [dStart, setDStart] = useState(0.1);
  const [dEnd, setDEnd] = useState(2.0);
  const [dStep, setDStep] = useState(0.1);

  const [enabledModels, setEnabledModels] = useState({ fspl: true, hata: true, cost231: true });

  const distances = useMemo(() => generateDistances(dStart, dEnd, dStep), [dStart, dEnd, dStep]);

  const data = useMemo(() => {
    return distances.map((d) => {
      const row = { distance: d };
      row.fspl = Number(fspl(d, frequency).toFixed(3));
      row.hata = Number(hata(d, frequency, hb, hm).toFixed(3));
      row.cost231 = Number(cost231(d, frequency, hb, hm).toFixed(3));
      return row;
    });
  }, [distances, frequency, hb, hm]);

  const exportCsv = () => {
    if (!data.length) return;
    const headers = ['Distance (km)', 'FSPL (dB)', 'Okumura-Hata (dB)', 'COST231 (dB)'];
    const rows = data.map((row) => [row.distance, row.fspl, row.hata, row.cost231].join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'path-loss-results.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="hero-copy">
          <span className="eyebrow">Engineering Dashboard</span>
          <h1>Radio Wave Path Loss Simulator</h1>
          <p className="subtitle">Simulation and Comparison of Cellular Propagation Models</p>
          <p className="hero-text">Case Relevant to Signal Reception at TF Hostel, University of Ghana</p>
          <button type="button" className="primary-button" onClick={exportCsv}>
            Export CSV
          </button>
        </div>
      </header>

      <main className="app-grid">
        <ControlPanel
          frequency={frequency}
          setFrequency={setFrequency}
          hb={hb}
          setHb={setHb}
          hm={hm}
          setHm={setHm}
          dStart={dStart}
          setDStart={setDStart}
          dEnd={dEnd}
          setDEnd={setDEnd}
          dStep={dStep}
          setDStep={setDStep}
          enabledModels={enabledModels}
          setEnabledModels={setEnabledModels}
        />

        <section className="main-panel">
          <SummaryCards data={data} enabledModels={enabledModels} />
          <PathLossGraph data={data} enabledModels={enabledModels} />
          <ResultsTable data={data} enabledModels={enabledModels} />
          <AnalysisPanel data={data} enabledModels={enabledModels} />
        </section>
      </main>

      <footer className="app-footer">
        <div>
          <strong>University of Ghana</strong>
          <span>Department of Physics</span>
        </div>
        <div>
          <strong>Final Year Project</strong>
          <span>Developed by Patrick Kush</span>
        </div>
      </footer>
    </div>
  );
}