import { useEffect, useState } from 'react';
import api from '../services/api';

export default function usePaginatedFetch(endpoint, pageSize = 10) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.get(endpoint)
      .then(({ data }) => { if (mounted) setRows(data); })
      .catch((e) => { if (mounted) setError(e.response?.data?.message || 'Failed to load'); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [endpoint]);

  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const pagedRows = rows.slice((page - 1) * pageSize, page * pageSize);

  return { rows: pagedRows, loading, error, page, totalPages, setPage };
}
