import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { CasesAPI } from '../services/api';

const CasesContext = createContext();

export function CasesProvider({ children }) {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await CasesAPI.list();
        setCases(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const byId = useMemo(() => Object.fromEntries(cases.map(c => [c.id, c])), [cases]);

  const refresh = async () => {
    const data = await CasesAPI.list();
    setCases(data);
  };

  const value = { cases, byId, loading, error, refresh, setCases };
  return <CasesContext.Provider value={value}>{children}</CasesContext.Provider>;
}

export function useCases() {
  return useContext(CasesContext);
}
