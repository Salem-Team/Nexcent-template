import DataTable from '../components/DataTable';
import usePaginatedFetch from '../utils/usePaginatedFetch';

export default function SuppliersPage() {
  const { rows, loading, error, page, totalPages, setPage } = usePaginatedFetch('/suppliers');
  const columns = rows[0] ? Object.keys(rows[0]).slice(0, 6).map((key) => ({ key, label: key })) : [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h2>Suppliers</h2>
      <DataTable columns={columns} rows={rows} />
      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span>{page} / {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
