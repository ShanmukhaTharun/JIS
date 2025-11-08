import React, { useMemo, useState } from 'react';
import { useCases } from '../../context/CasesContext.jsx';

export default function ViewAllCases() {
  const { cases, refresh } = useCases();
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortDir, setSortDir] = useState('desc');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? cases.filter(c => {
          const hay = [
            c.id,
            c.title,
            c.status,
            c.judge,
            c.lawyer,
            (c.registeredBy || '')
          ].join(' ').toLowerCase();
          return hay.includes(q);
        })
      : cases;
    const sorted = [...base].sort((a, b) => {
      let av = a[sortBy];
      let bv = b[sortBy];
      // Normalize undefined and strings for consistent compare
      av = av === undefined || av === null ? '' : av;
      bv = bv === undefined || bv === null ? '' : bv;
      if (typeof av === 'string' && typeof bv === 'string') {
        const cmp = av.localeCompare(bv, undefined, { numeric: true, sensitivity: 'base' });
        return sortDir === 'asc' ? cmp : -cmp;
      }
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      return 0;
    });
    return sorted;
  }, [cases, query, sortBy, sortDir]);

  const requestSort = (key) => {
    if (key === sortBy) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(key);
      setSortDir('asc');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <h3 style={{ margin: 0 }}>All Registered Cases</h3>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search by ID, Title, Status, Judge, Lawyer..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="table-search-input"
            style={{ minWidth: 260 }}
          />
          <button onClick={refresh}>Refresh</button>
        </div>
      </div>
      <div style={{ overflowX: 'auto', marginTop: 8 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              {[
                { key: 'id', label: 'Case ID' },
                { key: 'title', label: 'Title' },
                { key: 'status', label: 'Status' },
                { key: 'judge', label: 'Judge' },
                { key: 'lawyer', label: 'Lawyer' },
                { key: 'registeredBy', label: 'Registered By' },
              ].map(col => (
                <th
                  key={col.key}
                  onClick={() => requestSort(col.key)}
                  style={{ cursor: 'pointer', userSelect: 'none', textAlign: 'left', padding: '8px', borderBottom: '1px solid #e5e5e5', whiteSpace: 'nowrap' }}
                  title={`Sort by ${col.label}`}
                >
                  {col.label}
                  {sortBy === col.key ? (
                    <span style={{ marginLeft: 6, fontSize: 12, color: '#777' }}>
                      {sortDir === 'asc' ? '▲' : '▼'}
                    </span>
                  ) : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id}>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{c.id}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{c.title}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{c.status}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{c.judge || '-'}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{c.lawyer || '-'}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{c.registeredBy || '-'}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: '12px', textAlign: 'center', color: '#666' }}>No cases found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
