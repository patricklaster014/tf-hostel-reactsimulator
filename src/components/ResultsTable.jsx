import React from 'react';

export default function ResultsTable({ data = [], enabledModels = {} }) {
  return (
    <div className="card table-card">
      <h3>Results</h3>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Distance (km)</th>
              {enabledModels.fspl && <th>Free Space (dB)</th>}
              {enabledModels.hata && <th>Okumura-Hata (dB)</th>}
              {enabledModels.cost231 && <th>COST-231 (dB)</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.distance}>
                <td>{row.distance}</td>
                {enabledModels.fspl && <td>{row.fspl}</td>}
                {enabledModels.hata && <td>{row.hata}</td>}
                {enabledModels.cost231 && <td>{row.cost231}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
