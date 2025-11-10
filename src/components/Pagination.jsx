import './Pagination.css'

export default function Pagination({page, totalPages, onChange}) {
  return (
    <div className="pagination">
      <button
        type="button"
        className="pg-btn"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page <= 1}
      >
        Prev
      </button>
      <div className="pg-info">
        Page {page} / {Math.min(totalPages, 500)}
      </div>
      <button
        type="button"
        className="pg-btn"
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  )
}
