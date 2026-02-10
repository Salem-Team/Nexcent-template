export default function DataTable({ columns, rows }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>{columns.map((col) => <th key={col.key}>{col.label}</th>)}</tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td colSpan={columns.length}>No records found</td></tr>
          ) : rows.map((row, idx) => (
            <tr key={idx}>{columns.map((col) => <td key={col.key}>{row[col.key]}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
